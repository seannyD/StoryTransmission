# Assumed file structure:

# Transmission/
# L__  stats/
# |         getStoryOrderData.R
# L__  results/
# |    L__ StoryOrder/
# |        L__ rawData/
# |        L__ cleanData/
# L___ OnlineBackups/
#      L__ Story/
#          L__ storyOrder/
#          L__ storyOrderMostImportant/
#          L__ tellStoryOrder/



try(setwd("~/Documents/Bristol/Transmission/stats/"))
try(setwd("~/Desktop/FPPT/Data/stats/"))

storyBackupFolder = "../OnlineBackups/Story/"

newID = function(id){
  return(grepl("[A-Z][0-9A-Z][0-9][0-9]",id))
}


ordersP1 = data.frame(stringsAsFactors = F)
consentsP1 = data.frame(stringsAsFactors = F)
ordersP3 = data.frame(stringsAsFactors = F)
consentsP3 = data.frame(stringsAsFactors = F)
surveyP1 = data.frame(stringsAsFactors = F)
surveyP2 = data.frame(stringsAsFactors = F)
surveyP3 = data.frame(stringsAsFactors = F)

# Phase 2 for transcription
ordersP2 = data.frame(stringsAsFactors = F)

imageNames = paste0("S",1:16,".jpg")

consentsColumns = c("participantID","consentReceivedInfo","consentWithdraw","consentVideo","consentVideoDisseminated","consentFacePixel","consentTakePartInStudy","startTime")

finalSurveyColumns = c("surveyImportantScene","surveyGender","surveyAge",'surveyNativeEnglish',"surveyEmail")

convertSurveyFileColumns = 
  c("surveyImportantScene","surveyGender","surveyAge",'surveyNativeEnglish',"surveyEmail","participantID",'time',"phase")
names(convertSurveyFileColumns) = c("question1","question2","question3","question4",'question5','participantID',"time",'phase')


storyOrderFiles = list.files(paste0(storyBackupFolder,"storyOrder/"),"*.csv")
for(f in storyOrderFiles){
  dx = read.csv(paste0(storyBackupFolder,"storyOrder/",f),stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")
  #if(newID(dx$participantID[1])){
  if("phase" %in% names(dx)){
    phase = dx$phase[1]
    if("order" %in% names(dx)){
      order = tail(dx$order,1)
      initialOrder = head(dx$order,1)
      if(!is.na(order)){
        orderX = strsplit(order,"#")[[1]]
        orderX = c(orderX,rep("-",length(imageNames)-length(orderX)))
        names(orderX) = paste0("image",1:length(orderX))
        
        #initialOrderX = strsplit(initialOrder,"#")[[1]]
        #initialOrderX = c(orderX,rep("-",length(imageNames)-length(initialOrderX)))
        #names(initialOrderX) = paste0("image",1:length(initialOrderX))
        
        
        rowToAdd = cbind(data.frame(
                                  storyOrderDatafile=f,
                                  participantID=dx$participantID[1],
                                  order=order,
                                  initialOrder = initialOrder,
                                  stringsAsFactors = F),
                             as.data.frame(t(orderX)))
        if(phase=="p1"){
          ordersP1 = rbind(ordersP1,rowToAdd)
        } else{
          if(phase=="p3"){
          ordersP3 = rbind(ordersP3,rowToAdd)
          } else{
            ordersP2 = rbind(ordersP2,rowToAdd)  
          }
        }
      }
    }
    if("consentReceivedInfo" %in% names(dx)){
      names(dx)[names(dx)=="timestamp"] = "startTime"
      names(dx)[names(dx)=="ID"] = "participantID"
      for(cx in consentsColumns){
        if(!cx %in% names(dx)){
          dx[,cx] = NA
        }
      }
      toAdd = dx[1,consentsColumns]
      if(phase=="p1"){
        consentsP1 = rbind(consentsP1,toAdd)
      } else{
        consentsP3 = rbind(consentsP3,toAdd)
      }
    }
    if("question1" %in% names(dx)){
      names(dx) = convertSurveyFileColumns[names(dx)]
      dx = dx[1,]
      phase = dx$phase
      dx$surveyDataFile = f
      if(phase=="p1"){
        surveyP1 = rbind(surveyP1,dx[1,])
      } else{
        if(phase=="p3"){
          surveyP3 = rbind(surveyP3,dx[1,])
        } else{
          surveyP2 = rbind(surveyP2,dx[1,])
        }
      }
    }
  }
  #}
}

extraCCols = c("storyOrderDatafile","order","initialOrder",paste0("image",1:length(imageNames)))

consentsP1[,extraCCols] = ordersP1[match(consentsP1$participantID, ordersP1$participantID),extraCCols]
d1 = consentsP1[complete.cases(consentsP1),]

consentsP3[,extraCCols] = ordersP3[match(consentsP3$participantID, ordersP3$participantID),extraCCols]
d1P3 = consentsP3[complete.cases(consentsP3[,c("participantID","consentReceivedInfo","order")]),]

d1[,c(finalSurveyColumns,"surveyDataFile")] = surveyP1[match(d1$participantID,surveyP1$participantID),c(finalSurveyColumns,"surveyDataFile")]
# P3 doesn't have a final survey
#if(nrow(d1P3)>0 && ncol(d1P3)>0){
#  d1P3[,finalSurveyColumns] = surveyP3[match(d1P3$participantID,surveyP3$participantID),finalSurveyColumns]
#}

d1P2 = ordersP2[,c("participantID",extraCCols)]
#d1P2 = d1P2[complete.cases(d1P2),]

d2P1 = data.frame(stringsAsFactors = F)
d2P2 = data.frame(stringsAsFactors = F)
d2P3 = data.frame(stringsAsFactors = F)
tellStoryOrderFiles = list.files(paste0(storyBackupFolder,"tellStoryOrder/"),"*.csv")
for(f in tellStoryOrderFiles){
  dx = read.csv(paste0(storyBackupFolder,"tellStoryOrder/",f),stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")
  
  if("phase" %in% names(dx)){
    phase = dx$phase[1]
    
    if("sceneID" %in% names(dx)){
      descriptions = dx$storyText
      names(descriptions) = dx$sceneID
      descriptions = descriptions[imageNames]
      desx = cbind(participantID = dx$participantID[1], as.data.frame(t(descriptions),stringsAsFactors = F))
      desx$phase = phase
      desx$tellStoryOrderDatafile = f
      names(desx) = c("participantID",imageNames,"phase")
      if(phase=="p1"){
        d2P1 = rbind(d2P1,desx)
      } else{
        if(phase=="p3"){
          d2P3 = rbind(d2P3,desx)
        } else{
          d2P2 = rbind(d2P2,desx)
        }
      }
    }
  }
}

d1[,imageNames] = d2P1[match(d1$participantID,d2P1$participantID),imageNames]
d1P3[,imageNames] = d2P3[match(d1P3$participantID,d2P3$participantID),imageNames]
d1P2[,imageNames] <- d2P2[match(d1P2$participantID,d2P2$participantID),imageNames]


storyOrderMostImportantFiles = list.files(paste0(storyBackupFolder,"storyOrderMostImportant/"),"*.csv")
storyOrderMostImportantColumns = c("mostImportantSceneNumber","mostImportantSceneSRC","mostImportantSceneReason","storyOrderDataFile")


d1[,storyOrderMostImportantColumns] = NA
d1P3[,storyOrderMostImportantColumns] = NA
try(d1P2[,storyOrderMostImportantColumns] <- NA)
for(f in storyOrderMostImportantFiles){
  dx = read.csv(paste0(storyBackupFolder,"storyOrderMostImportant/",f),stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")
  if("mostImportantSceneNumber" %in% names(dx)){
    if("phase" %in% names(dx)){
      phase = dx$phase[1]
      if((dx$participantID %in% d1$participantID)||(dx$participantID %in% d1P3$participantID)){
        dx$storyOrderDataFile = f
        if(phase=="p1"){
        d1[match(dx$participantID,d1$participantID),storyOrderMostImportantColumns] = dx[1,storyOrderMostImportantColumns]
        } else{
          if(phase=="p3"){
            d1P3[match(dx$participantID,d1P3$participantID),storyOrderMostImportantColumns] = dx[1,storyOrderMostImportantColumns]          
          } else{
            d1P2[match(dx$participantID,d1P2$participantID),storyOrderMostImportantColumns] = dx[1,storyOrderMostImportantColumns]          
          }
        }
      }
    }
  }
}


d1$surveyGender[d1$surveyGender=="item1"] = "Man"
d1$surveyGender[d1$surveyGender=="item2"] = "Woman"

d1$surveyNativeEnglish[d1$surveyNativeEnglish=="item1"] = "Yes"
d1$surveyNativeEnglish[d1$surveyNativeEnglish=="item2"] = "No"

######
# Times

timeFiles = list.files(paste0(storyBackupFolder,"logs/"),"*.csv")
timeData = data.frame(stringsAsFactors = F)
for(f in timeFiles){
  if(grepl("Time_",f)){
    dx = read.csv(paste0(storyBackupFolder,"logs/",f),stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")
    dx$file = f
    dx$stage = "p1"
    if("storyOrderConsentStage3" %in% dx$Message){
       dx$stage = "p3"
    }
    if((!"storyOrderInstructions" %in% dx$Message) && "selectMostImportantScene" %in% dx$Message){
        dx$stage = "p2"
    }
    timeData = rbind(timeData,dx)
  }
}
#timeData = timeData[timeData$participantId %in% d1$participantID,]

timeData$Time2 =  as.numeric(as.POSIXct(timeData$Time))
timeData = timeData[order(timeData$Time2),]

timeData_storyOrderStartTime = timeData[timeData$Message=="storyOrder" & timeData$stage=="p1",]
timeData_writeStoryStartTime = timeData[timeData$Message=="WriteStoryFromOrder" & timeData$stage=="p1",]
timeData_writeStoryEndTime = timeData[timeData$Message=="selectMostImportantScene" & timeData$stage=="p1",]

d1$storyOrderStartTime = timeData_storyOrderStartTime[match(d1$participantID,timeData_storyOrderStartTime$participantId),]$Time2
d1$writeStoryStartTime = timeData_writeStoryStartTime[match(d1$participantID,timeData_writeStoryStartTime$participantId),]$Time2
d1$writeStoryEndTime = timeData_writeStoryEndTime[match(d1$participantID,timeData_writeStoryEndTime$participantId),]$Time2

d1$durationStoryOrder = d1$writeStoryStartTime - d1$storyOrderStartTime
d1$durationWriteStory = d1$writeStoryEndTime - d1$writeStoryStartTime

# P3

timeData_storyOrderStartTimeP3 = timeData[timeData$Message=="storyOrder" & timeData$stage=="p3",]
timeData_writeStoryStartTimeP3 = timeData[timeData$Message=="WriteStoryFromOrder" & timeData$stage=="p3",]
timeData_writeStoryEndTimeP3 = timeData[timeData$Message=="selectMostImportantScene" & timeData$stage=="p3",]

d1P3$storyOrderStartTimeP3 = timeData_storyOrderStartTimeP3[match(d1P3$participantID,timeData_storyOrderStartTimeP3$participantId),]$Time2
d1P3$writeStoryStartTimeP3 = timeData_writeStoryStartTimeP3[match(d1P3$participantID,timeData_writeStoryStartTimeP3$participantId),]$Time2
d1P3$writeStoryEndTimeP3 = timeData_writeStoryEndTimeP3[match(d1P3$participantID,timeData_writeStoryEndTimeP3$participantId),]$Time2

d1P3$durationStoryOrderP3 = d1P3$writeStoryStartTimeP3 - d1P3$storyOrderStartTimeP3
d1P3$durationWriteStoryP3 = d1P3$writeStoryEndTimeP3 - d1P3$writeStoryStartTimeP3



#########
# FIXES #
#########

# ML23 and ML51 are both AA27
d1[d1$participantID=="ML23",]$participantID = "AA27"
#d1P3[d1P3$participantID=="ML23",]$participantID = "AA27"
d1[d1$participantID=="ML51",]$participantID = "AA27"
#d1P3[d1P3$participantID=="ML51",]$participantID = "AA27"

# MG43 and MG96 are both AA84
d1[d1$participantID=="MG43",]$participantID = "AA84"
#d1P3[d1P3$participantID=="MG43",]$participantID = "AA84"
d1[d1$participantID=="MG96",]$participantID = "AA84"
#d1P3[d1P3$participantID=="MG96",]$participantID = "AA84"

# The first MG31 (i.e. between 11am and 12pm on 15/03/2019) is now AA42.
d1[d1$participantID=="MG31" & d1$startTime=="2019-3-15 11:8:50",]$participantID = "AA42"



# Test runs
testRuns = c("AA84","MD67",'ME41','ME47','ME69',"ME80")
d1 = d1[!d1$participantID %in% testRuns,]
d1P3 = d1P3[!d1P3$participantID %in% testRuns,]

write.csv(d1,"../results/StoryOrder/rawData/storyOrderData_phase1.csv",row.names = F,fileEncoding = "UTF-8")
write.csv(d1P2,"../results/StoryOrder/rawData/storyOrderData_phase2.csv",row.names = F,fileEncoding = "UTF-8")
write.csv(d1P3,"../results/StoryOrder/rawData/storyOrderData_phase3.csv",row.names = F,fileEncoding = "UTF-8")

