library(entropy)

# There should be the following file structure:
# Transmission (top folder)
#     stats
#         (save this R file here)
#     results
#           (where results will be saved)
#           UK
#           USA
#     OnlineBackups
#           7Aug (or backup date)
#                 distractionTask
#                 logs
#                 qualifyingSurvey
#                 recordings
#                 survey

# Set this folder to the 'stats' folder
#
setwd("~/Documents/Bristol/Transmission/stats/")

# Set 'backupfolder' to the location of the folder you downloaded things to.
# should include final backslash
backupfolder = "../OnlineBackups/7Aug/"



########

fileList = list.files(paste(backupfolder,"logs/",sep=''),"Files*")




# Functions

timeDifference = function(t1,t2){
  sapply(1:length(t1), function(i){
    x = capture.output(strptime(t2[i], format="%Y-%m-%d %H:%M:%S")- strptime(t1[i], format="%Y-%m-%d %H:%M:%S"))
    x = gsub("Time difference of ","",x)
  })
}

recordingFileSize = function(fs){
  fs = strsplit(fs,",")[[1]]
  s = sum(file.size(paste0(backupfolder,"recordings/",justFilename(fs))))
  return(utils:::format.object_size(s, "auto"))
}

prioritiseOrder = function(dx,o){
  return(dx[,c(
    o,
    names(dx)[!names(dx) %in% o]
  )])
}

getSpEvalEntropy = function(dx){
  sp = names(dx)[grepl("SpEval_",names(dx))]
  ex = c("QuestionOrder","_MT_","evaluationPrestige","evaluationPresentationNumber","localisation","startTime","endTime","Recording1File","Recording2File","Story2","_Story1","ParticipantId","Location",'evaluationFile')
  for(x in ex){
    sp = sp[!grepl(x,sp)]
  }
  
  sapply(1:nrow(dx), function(i){
  freqs = table(as.vector(unlist(dx[i,sp])))
  ps = freqs/sum(freqs)
  # H = -sum(ifelse(ps > 0, ps * log(ps), 0))
  # table will never return zero count
  return(-sum( ps * log(ps)) / log(sum(freqs)))
  })
}

justFilename = function(X){
  sapply(X, function(x){
  x = strsplit(x,"/")[[1]]
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
    if(sum(!is.na(dx$participantid))>0){
    if(dx$participantid[1]==participantId && key %in% origNames){
      candidates = c(candidates, f)
    }
    } else{
      print(paste("WARNING: no participant id:",f))
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
    
    names(dx)[names(dx)=="distractionTaskNum"] = "distractionTaskNumber"
    
    # Add to data frame
    dxx =   data.frame(
      distractionTaskFile = df_filename,
      distractionTaskNum = dx$distractionTaskNumber[1],
      VSLT.p=VSLT.p,
      VSLT.d=VSLT.d,
      VSLT.pnd=VSLT.pnd,
      VSLT.p_plus_pnd=VSLT.p_plus_pnd,
      distractionTask.currentDisplaySymbols.alpha,
      distractionTask.currentDisplayLocations,
      distractionTask.playerDisplaySymbols.alpha,
      distractionTask.playerDisplayLocations
    )
    names(dxx) = paste("Dist_Round_",dx$distractionTaskNumber[1],"_",names(dxx),sep='')
    distractionTaskResults = cbind(distractionTaskResults, dxx)
  }
  distractionTaskResults = distractionTaskResults[,2:ncol(distractionTaskResults)]
  return(distractionTaskResults)
}


findTimeFile = function(pid){
  # Find the amount of time the participant did not have the window focussed
  print("FTF")
  print(pid)
  tfL = list.files(paste0(backupfolder,"logs/"),"Time*")
  for(f in tfL){
    dx = read.csv(paste0(backupfolder,"logs/",f), stringsAsFactors = F)
    if(dx$participantId[1]==pid){
      numberBlurTimes = sum(grepl("blur window",dx$Message))
      totalTD = 0
      if(numberBlurTimes>0){
        totalTD = sum(sapply(which(grepl("blur window", dx$Message)), function(i){
          t1 = dx[i,]$Time
          if(nrow(dx)>=(i+1)){
            t2 = dx[i+1,]$Time
            return(as.numeric(difftime(strptime(t2, format="%Y-%m-%d %H:%M:%S"), strptime(t1, format="%Y-%m-%d %H:%M:%S"), units = 'secs')))
          } else{
            return(NA)
          }
        }), na.rm=T)
      }
      return(c(f,numberBlurTimes,totalTD))
    }
  }
  return(c(NA,NA,NA))
}


#########

processFileLog = function(filename){
  print(filename)
  fl = read.csv(
    paste(backupfolder,
          "logs/",
          filename,
          sep=''), stringsAsFactors = F)
  
  if(nrow(fl)>2){
    highPFiles = paste(fl[grepl("highp",tolower(fl$filetype)),]$filename, collapse = ",")
    lowPFiles = paste(fl[grepl("lowp",tolower(fl$filetype)),]$filename, collapse = ",")
    
    highPFiles.size = recordingFileSize(highPFiles)
    lowPFiles.size = recordingFileSize(lowPFiles)
    
    storyOrder = "HighP,LowP"
    # TODO: check if uppercase is correct?
    highp.pos = min(which(grepl("highp",tolower(fl$filetype))))
    lowp.pos = min(which(grepl("lowp",tolower(fl$filetype))))
    if(highp.pos > lowp.pos){
      storyOrder = "LowP,HighP"
    }
    
    highPStory = c("Muki","Taka")[1+grepl("taka",tolower(fl[grepl("highp",tolower(fl$filetype)),]$filetype[1]))]
    lowPStory = c("Muki","Taka")[1+grepl("taka",tolower(fl[grepl("lowp",tolower(fl$filetype)),]$filetype[1]))]
    
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
    # remove initial columns
    speechEvaluationResults = speechEvaluationResults[,2:ncol(speechEvaluationResults)]
    
    # timeFiles
    timeFiles = findTimeFile(fl$participantID[1])
    
    
    
    # Combine data
    pData = data.frame(
      participantID = fl$participantID[1],
      location = location,
      highPRecording.size = highPFiles.size,
      lowPRecording.size = lowPFiles.size,
      numSwitchWindows = timeFiles[2],
      secondsUnfocussedWindow = timeFiles[3],
      highPStory = highPStory,
      highPRecordings = highPFiles,
      lowPStory = lowPStory,
      lowPRecordings = lowPFiles,
      storyOrder = storyOrder,
      surveyFilename = surveyFilename,
      speechEvaluationFiles = paste(speechEvaluationFiles, collapse=','),
      logFile = filename,
      timeFile = timeFiles[1]
      
    )
    pData = cbind(pData,
                  distractionTaskResults,
                  speechEvaluationResults,
                  surveyResults)
    return(pData)
  }
  return(NULL)
  
}

combineDatasets = function(a,b){
  if(nrow(a)==0){
    return(b)
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

createNiceResultsFolders = function(dataset, folder){
  
  # TODO: delete existing files
  
  for(i in 1:nrow(dataset)){
    
    dt = strftime(dataset[i,]$startTime)
    
    # make folder
    partFolder = paste(folder,
                       strsplit(dt," ")[[1]][1],
                       "_",
                       as.character(dataset$participantID[i]),
                       sep='')
    dir.create(partFolder)
    
    # Copy recordings
    hp = justFilename(strsplit(as.character(dataset$highPRecordings[i]),",")[[1]])
    highpFilesFrom = paste(backupfolder,"recordings/",hp,sep='')
    highpFilesTo = rep(paste(
        partFolder,
        "/",
        "HighP_",hp,
        sep=''),
      length(highpFilesFrom))
    file.copy(highpFilesFrom,highpFilesTo)
    
    lp = justFilename(strsplit(as.character(dataset$lowPRecordings[i]),",")[[1]])
    lowpFilesFrom = paste(backupfolder,"recordings/",lp,sep='')
    lowpFilesTo = rep(paste(
      partFolder,
      "/",
      "LowP_",lp,
      sep=''),
      length(lowpFilesFrom))
    file.copy(lowpFilesFrom,lowpFilesTo)
    
    # Copy distraction tasks
    distractionTask1 = as.character(dataset[i,]$Dist_Round_0_distractionTaskFile)
    dt1FileFrom = paste(backupfolder,"distractionTask/",distractionTask1,sep='')
    dt1FileTo = paste(partFolder, "/DistractionTask1_",distractionTask1, sep='')
    file.copy(dt1FileFrom,dt1FileTo)
    
    distractionTask2 = as.character(dataset[i,]$Dist_Round_1_distractionTaskFile)
    dt2FileFrom = paste(backupfolder,"distractionTask/",distractionTask2,sep='')
    dt2FileTo = paste(partFolder, "/DistractionTask1_",distractionTask2, sep='')
    file.copy(dt2FileFrom,dt2FileTo)
    
    # Copy survey
    surveyName = dataset[i,]$surveyFilename
    surveyFileFrom = paste(backupfolder,"survey/",surveyName,sep='')
    surveyFileTo= paste(partFolder,"/Survey_",surveyName,sep='')
    file.copy(surveyFileFrom, surveyFileTo)
    
    # Copy evaluation files
    evaluationFiles = strsplit(as.character(dataset[i,]$speechEvaluationFiles),",")[[1]]
    evaluationFilesFrom = paste0(backupfolder,'survey/',evaluationFiles)
    evaluationFilesTo = rep(paste0(partFolder,"/Eval_",evaluationFiles))
    file.copy(evaluationFilesFrom,evaluationFilesTo)
    
    
  }
  
}

####################

results.UK = data.frame()
results.USA = data.frame()

for(f in fileList){
  dx = processFileLog(f)
  dx = dx[,!duplicated(names(dx))]
  if(!is.null(dx)){
    
    if(dx$location=="USA"){
      results.USA = combineDatasets(results.USA,dx)
    } else{
      print("--")
      print(f)
      results.UK = combineDatasets(results.UK,dx)
    }
  }
}

results.UK = results.UK[order(results.UK$startTime),]
results.USA = results.USA[order(results.USA$startTime),]


results.UK$totalTime = timeDifference(results.UK$startTime, results.UK$endTime)
results.USA$totalTime = timeDifference(results.USA$startTime, results.USA$endTime)

results.USA$spEvalEnt = round(getSpEvalEntropy(results.USA),2)
results.UK$spEvalEnt = round(getSpEvalEntropy(results.UK),2)

colOrder = c("participantID",'location','highPRecording.size','lowPRecording.size','totalTime','spEvalEnt','Dist_Round_0_VSLT.p_plus_pnd','Dist_Round_1_VSLT.p_plus_pnd','numSwitchWindows','secondsUnfocussedWindow')

results.USA = prioritiseOrder(results.USA,colOrder)
results.UK = prioritiseOrder(results.UK,colOrder)



write.csv(results.UK, file = '../results/Results_UK.csv')
write.csv(results.USA, file = '../results/Results_USA.csv')

write.csv(results.UK[,colOrder], file = '../results/Results_UK_short.csv')
write.csv(results.USA[,colOrder], file = '../results/Results_USA_short.csv')

### 
# Copy files to nice folders

results.UK = read.csv("../results/Results_UK.csv", stringsAsFactors = F)
results.USA = read.csv("../results/Results_USA.csv", stringsAsFactors = F)

createNiceResultsFolders(results.UK,"../results/UK/")
createNiceResultsFolders(results.USA,"../results/USA/")
