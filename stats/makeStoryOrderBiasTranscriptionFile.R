try(setwd("~/Documents/Bristol/Transmission/stats/"))
try(setwd("~/Desktop/FPPT/Data/stats/"))


# constants
imageNames = paste0("image",1:16)
imFiles = paste0("S",1:16,".jpg")
imagesForPlotting = paste0("../results/StoryOrder/cleanData/img_icon_colour/",
                           gsub("\\.jpg","Col.png",imFiles))
names(imagesForPlotting) = imFiles

# S1 to S16
canonicalOrder = toupper(c("n",'l','j','d','h','b','c','a','g','i','p','f','o','m','e','k'))
names(canonicalOrder) = imFiles

# Load data
p1 = read.csv("../results/StoryOrder/rawData/storyOrderData_phase1.csv",fileEncoding = "UTF-8",stringsAsFactors = F)
p2 = read.csv("../results/StoryOrder/rawData/storyOrderData_phase2.csv",fileEncoding = "UTF-8",stringsAsFactors = F)
p3 = read.csv("../results/StoryOrder/rawData/storyOrderData_phase3.csv",fileEncoding = "UTF-8",stringsAsFactors = F)
p1 = p1[!p1$participantID %in% c("MF37","MG56","MG50","MG97"),]

getDX = function(px,phase){
  order = unlist(px[1,imageNames])
  dx = data.frame(
    participantID = px[1,]$participantID,
    phase = phase,
    description = unlist(px[1,order]),
    Social_Basic = "",
    Social_Gossip = "",
    Survival = "",
    Emotional_Positive = "",
    Emotional_Negative = "",
    Moral = "",
    Counterintuitive = "",
    Rational = "",
    Notes = ""
  )
  return(dx)
}



for(i in 1:nrow(p1)){
  
  p1x = getDX(p1[i,],"phase1")
  if(p1x$participantID[1] %in% p2$participantID){
    p2x = getDX(p2[p2$participantID==p1x$participantID[1],],"phase2")
    p1x = rbind(p1x,p2x)
  }
  if(p1x$participantID[1] %in% p3$participantID){
    p3x = getDX(p3[p3$participantID==p1x$participantID[1],],"phase3")
    p1x = rbind(p1x,p3x)
  }
  write.csv(p1x,file=paste0("../results/StoryOrder/rawData/Bias_",as.character(p1x$participantID[1]),"_template.csv"))
}
