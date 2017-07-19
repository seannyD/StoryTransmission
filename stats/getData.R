setwd("~/Documents/Bristol/Transmission/stats/")

# This assumes that there's a folder somewhere with the sub-fodlers:
# distractionTask, logs, qualifyingSurvey, recordings, survey

# should include final backslash
backupfolder = "../OnlineBackups/11July/"

fileList = list.files(paste(backupfolder,"logs/",sep=''),"Files*")


justFilename = function(X){
  sapply(X, function(x){
  x = strsplit(X,"/")[[1]]
  return(x[length(x)])
  })
}

findMissingFiles = function(participantId, folder, key){
  # find a csv file with the right participant id and key
  candidates = c()
  files = list.files(paste(backupfolder,folder,'/',sep=''),"*.csv")
  for(f in files){
    dx = read.csv(paste(backupfolder,folder,'/',f,sep=''), stringsAsFactors = F)
    origNames = names(dx)
    names(dx) = tolower(names(dx))
    if(dx$participantid[1]==participantId && key %in% origNames){
      candidates = c(candidates, f)
    }
  }
  return(candidates)
}

getDistractionTaskData = function(distractionTasks, participantId, fl){
  # need to include one row
  distractionTaskResults = data.frame(NoDTaskData=TRUE,participantID=participantId)
  if(length(distractionTasks)==0){
    distractionTasks = findMissingFiles(participantId, 'distractionTask','currentDisplaySymbols.alpha')
    if(length(distractionTasks)==0){
      return(distractionTaskResults)  
    }
  }
  
  for(df in distractionTasks){
    df_filename = justFilename(df)
    dx = read.csv(paste(backupfolder,
                        "distractionTask/",
                        df_filename,sep=''), stringsAsFactors = F)
    if(!"distractionTaskNumber" %in% names(dx)){
      x = strsplit(fl[grepl(df,fl$filename),]$filetype[1],"_")[[1]]
      dx$distractionTaskNum = as.numeric(x[length(x)])
    }
    
    distractionTask.currentDisplaySymbols.alpha = paste(dx$currentDisplaySymbols.alpha, collapse=';')
    distractionTask.currentDisplayLocations = paste(dx$currentDisplayLocations, collapse=';')
    distractionTask.playerDisplaySymbols.alpha = paste(dx$playerDisplaySymbols.alpha, collapse=';')
    distractionTask.playerDisplayLocations = paste(dx$playerDisplayLocations, collapse=';')
    
    VSLT.p_plus_pnd = mean(dx$playerTechnicalPoints, na.rm=T)
    VSLT.p = mean(dx$playerLocationsCorrect, na.rm=T)
    VSLT.d = mean(dx$playerSymbolsCorrect, na.rm=T)
    VSLT.pnd = mean(dx$playerSymbolsAndLocationsCorrect, na.rm=T)
    
    # Add to data frame
    dxx =   data.frame(
      distractionTaskFile = df_filename,
      distractionTaskNum = dx$distractionTaskNum[1],
      VSLT.p=VSLT.p,
      VSLT.d=VSLT.d,
      VSLT.pnd=VSLT.pnd,
      VSLT.p_plus_pnd=VSLT.p_plus_pnd,
      distractionTask.currentDisplaySymbols.alpha,
      distractionTask.currentDisplayLocations,
      distractionTask.playerDisplaySymbols.alpha,
      distractionTask.playerDisplayLocations
    )
    names(dxx) = paste("Dist_Round_",dx$distractionTaskNum[1],"_",names(dxx),sep='')
    distractionTaskResults = cbind(distractionTaskResults, dxx)
  }
  distractionTaskResults = distractionTaskResults[,2:ncol(distractionTaskResults)]
  return(distractionTaskResults)
}


processFileLog = function(filename){
  fl = read.csv(
    paste(backupfolder,
          "logs/",
          filename,
          sep=''), stringsAsFactors = F)
  
  if(nrow(fl)>0){
    highPFiles = paste(fl[grepl("highp",fl$filetype),]$filename, collapse = ",")
    lowPFiles = paste(fl[grepl("lowp",fl$filetype),]$filename, collapse = ",")
    
    storyOrder = "HighP,LowP"
    if(min(which(grepl("highp",fl$filetype))) > min(which(grepl("lowp",fl$filetype)))){
      storyOrder = "LowP,HighP"
    }
    
    highPStory = c("Muki","Taka")[1+grepl("taka",fl[grepl("highp",fl$filetype),]$filetype[1])]
    lowPStory = c("Muki","Taka")[1+grepl("taka",fl[grepl("lowp",fl$filetype),]$filetype[1])]
    
    location = "USA"
    if(sum(grepl("UK",fl$participantID))>0){
      location = "UK"
    }
  
    # Distraction task data
    distractionTaskResults= getDistractionTaskData(fl[grepl("distraction",fl$filetype),]$filename,
                                                   fl$participantID[1],
                                                   fl)
    
    # Survey
    surveyFilename = justFilename(fl[grepl("Survey",fl$filetype),]$filename[1])
    surveyResults = read.csv(paste(backupfolder,
                                   "survey/",
                                   surveyFilename,
                                   sep=''))
    
    # Speech evaluation
    speechEvaluationFiles = fl[grepl("SpEval", fl$filetype),]$filename
    if(length(speechEvaluationFiles)==0){
      speechEvaluationFiles = findMissingFiles(fl$participantID[1],'survey','prestigeScale_prestigious')
    } else{
      speechEvaluationFiles = justFilename(speechEvaluationFiles)
    }
    
    speechEvaluationResults = data.frame(X=NA, Y=NA)
    for(sef in speechEvaluationFiles){
      dx = read.csv(paste(backupfolder,'survey/',sef, sep=''), stringsAsFactors = F)
      names(dx) = paste("SpEval_",names(dx),"_",dx$evaluationPrestige[1],sep='')
      speechEvaluationResults = cbind(speechEvaluationResults, dx)
    }
    # remove initial column
    speechEvaluationResults = speechEvaluationResults[,2:ncol(speechEvaluationResults)]
    
    pData = data.frame(
      participantID = fl$participantID[1],
      location = location,
      highPStory = highPStory,
      highPRecordings = highPFiles,
      lowPStory = lowPStory,
      lowPRecordings = lowPFiles,
      storyOrder = storyOrder
    )
    pData = cbind(pData,
                  distractionTaskResults,
                  surveyResults,
                  speechEvaluationResults)
    return(pData)
  }
  return(NULL)
  
}

combineDatasets = function(a,b){
  if(nrow(a)==0){
    return(rbind(a,b))
  }
  # in a but not b
  sda = setdiff(names(a),names(b))
  # in b but not a
  sdb = setdiff(names(b),names(a))
  if(length(sda)==0 & length(sdb)==0){
    return(rbind(a,b))
  } else{
    a[,sdb]= NA
    b[,sda] = NA
    b = b[,names(a)]
    return(rbind(a,b))
  }
}

results.UK = data.frame()
results.USA = data.frame()

for(f in fileList){
  dx = processFileLog(f)
  if(!is.null(dx)){
    if(dx$location=="USA"){
      results.USA = combineDatasets(results.USA,dx)
    } else{
      results.UK = combineDatasets(results.UK,dx)
    }
  }
}

write.csv(results.UK, file = '../results/Results_UK.csv')
write.csv(results.USA, file = '../results/Results_USA.csv')
