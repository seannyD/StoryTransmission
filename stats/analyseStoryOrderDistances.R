library(png)
library(dendextend)
library(dplyr)

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


# Choose a dataset to plot:
px = p1


px$storyOrderString = apply(px[,imageNames],1, function(X){
  paste(canonicalOrder[as.vector(unlist(X))],collapse="")
})

orderDist = adist(px$storyOrderString)
rownames(orderDist) = px$participantID
colnames(orderDist) = px$participantID

hm = heatmap(orderDist,distfun = as.dist)
hc = hclust(as.dist(orderDist),method="ward.D2")
plot(hc)

hc2 = hc %>% as.dendrogram %>% set("branches_k_color", k=4)
plot(hc2)

clusterParticipantOrder = hc$labels[hc$order]

rownames(px) = px$participantID
px = px[clusterParticipantOrder,]

library("cetcolor")
imageColours = cet_pal(16, name = "r3")
names(imageColours) = names(sort(canonicalOrder))
imageColours["S1.jpg"] = "#fbbbd3"
imageColours["S2.jpg"] = "#ef0e61"

pdf("../results/StoryOrder/graphs/StoryOrders_phase1.pdf",width=8)
layout(matrix(c(1,1,1,2,3,3),nrow=2,byrow = T),heights = c(1,6))
par(mar=c(1,0,1,0))
plot(c(1.5,16.5),c(1,2),type='n',xlab='',ylab='',xaxt='n',yaxt='n',bty='n')
for(i in 1:16){
  rasterImage(readPNG(imagesForPlotting[names(sort(canonicalOrder))][i]),
              i,1,i+1,2,xpd=T)
}
par(mar=c(0.5,1,0.5,2))
plot(as.dendrogram(hc),axes=F,xlab='',ylab='',main='',horiz=T,leaflab='none')
par(mar=c(1,1,1,1))
plot(c(1,16),c(1,nrow(px)),type='n',xlab='',ylab='',xaxt='n',yaxt='n')
for(i in 1:nrow(px)){
  if(i %% 2==0){
    rect(0,i-0.5,17,i+0.5,col='light gray',border=NA)
  }
  points(1:16,rep(i,16),
    col= imageColours[unlist(px[i,imageNames])],pch=16,cex=3)
  points(px[i,]$mostImportantSceneNumber,i,col=1,pch=8,cex=1)
}
axis(2,at=1:nrow(px),labels = px$participantID,las=2)
dev.off()


readImages = list()
for(i in 1:16){
  readImages[[i]] = readPNG(imagesForPlotting[i])
}
names(readImages) = imFiles

png("../results/StoryOrder/graphs/StoryOrders_phase1_fullImages.png",width=1400,height=1800)
par(mar=c(1,4,1,0))
plot(c(1.5,16.5),c(1,nrow(px)),type='n',xlab='',ylab='',xaxt='n',yaxt='n',bty='n')
axis(2,at=1:nrow(px)+0.5,labels = px$participantID,las=2)
for(p in 1:nrow(px)){
  for(i in 1:16){
  rasterImage(readImages[[px[p,imageNames[i]]]],
              i,p,i+1,p+1,xpd=T)
  }
}
dev.off()