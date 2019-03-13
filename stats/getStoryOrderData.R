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
surveyP3 = data.frame(stringsAsFactors = F)

imageNames = paste0("S",1:16,".jpg")

consentsColumns = c("participantID","consentReceivedInfo","consentWithdraw","consentVideo","consentVideoDisseminated","consentFacePixel","consentTakePartInStudy","startTime")

finalSurveyColumns = c("surveyImportantScene","surveyGender","surveyAge",'surveyNativeEnglish',"surveyEmail")

storyOrderFiles = list.files(paste0(storyBackupFolder,"storyOrder/"),"*.csv")
for(f in storyOrderFiles){
  dx = read.csv(paste0(storyBackupFolder,"storyOrder/",f),stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")
  #if(newID(dx$participantID[1])){
  if("phase" %in% names(dx)){
    phase = dx$phase[1]
    if("order" %in% names(dx)){
      order = tail(dx$order,1)
      if(!is.na(order)){
      orderX = strsplit(order,"#")[[1]]
      orderX = c(orderX,rep("-",length(imageNames)-length(orderX)))
      names(orderX) = paste0("image",1:length(orderX))
      rowToAdd = cbind(data.frame(participantID=dx$participantID[1],
                                order=order,stringsAsFactors = F),
                           as.data.frame(t(orderX)))
      if(phase=="p1"){
        ordersP1 = rbind(ordersP1,rowToAdd)
      } else{
        ordersP3 = rbind(ordersP3,rowToAdd)
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
      names(dx) = c("surveyImportantScene","surveyGender","surveyAge",'surveyNativeEnglish',"surveyEmail","participantID",'time',"phase")
      dx = dx[1,]
      phase = dx$phase
      if(phase=="p1"){
        surveyP1 = rbind(surveyP1,dx[1,])
      } else{
        surveyP3 = rbind(surveyP3,dx[1,])
      }
    }
  }
  #}
}

extraCCols = c("order",paste0("image",1:length(imageNames)))

consentsP1[,extraCCols] = ordersP1[match(consentsP1$participantID, ordersP1$participantID),extraCCols]
d1 = consentsP1[complete.cases(consentsP1),]

consentsP3[,extraCCols] = ordersP3[match(consentsP3$participantID, ordersP3$participantID),extraCCols]
d1P3 = consentsP3[complete.cases(consentsP3[,c("participantID","consentReceivedInfo","order")]),]

d1[,finalSurveyColumns] = surveyP1[match(d1$participantID,surveyP1$participantID),finalSurveyColumns]
# P3 doesn't have a final survey
if(nrow(d1P3)>0){
  d1P3[,finalSurveyColumns] = surveyP3[match(d1P3$participantID,surveyP3$participantID),finalSurveyColumns]
}

d2P1 = data.frame(stringsAsFactors = F)
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
      names(desx) = c("participantID",imageNames,"phase")
      if(phase=="p1"){
        d2P1 = rbind(d2P1,desx)
      } else{
        d2P3 = rbind(d2P3,desx)
      }
    }
  }
}

d1[,imageNames] = d2P1[match(d1$participantID,d2P1$participantID),imageNames]
d1P3[,imageNames] = d2P3[match(d1P3$participantID,d2P3$participantID),imageNames]


storyOrderMostImportantFiles = list.files(paste0(storyBackupFolder,"storyOrderMostImportant/"),"*.csv")
storyOrderMostImportantColumns = c("mostImportantSceneNumber","mostImportantSceneSRC","mostImportantSceneReason")


d1[,storyOrderMostImportantColumns] = NA
d1P3[,storyOrderMostImportantColumns] = NA
for(f in storyOrderMostImportantFiles){
  dx = read.csv(paste0(storyBackupFolder,"storyOrderMostImportant/",f),stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")
  if("mostImportantSceneNumber" %in% names(dx)){
    if("phase" %in% names(dx)){
      phase = dx$phase[1]
      if((dx$participantID %in% d1$participantID)||(dx$participantID %in% d1P3$participantID)){
        if(phase=="p1"){
        d1[match(dx$participantID,d1$participantID),storyOrderMostImportantColumns] = dx[1,storyOrderMostImportantColumns]
        } else{
          d1P3[match(dx$participantID,d1P3$participantID),storyOrderMostImportantColumns] = dx[1,storyOrderMostImportantColumns]          
        }
      }
    }
  }
}


write.csv(d1,"../results/StoryOrder/rawData/storyOrderData_phase1.csv",row.names = F,fileEncoding = "UTF-8")
write.csv(d1P3,"../results/StoryOrder/rawData/storyOrderData_phase3.csv",row.names = F,fileEncoding = "UTF-8")
