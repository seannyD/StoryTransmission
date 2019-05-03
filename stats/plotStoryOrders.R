library(png)

try(setwd("~/Documents/Bristol/Transmission/stats/"))
try(setwd("~/Desktop/FPPT/Data/stats/"))

p1 = read.csv("../results/StoryOrder/rawData/storyOrderData_phase1.csv",fileEncoding = "UTF-8",stringsAsFactors = F)
p2 = read.csv("../results/StoryOrder/rawData/storyOrderData_phase2.csv",fileEncoding = "UTF-8",stringsAsFactors = F)
p3 = read.csv("../results/StoryOrder/rawData/storyOrderData_phase3.csv",fileEncoding = "UTF-8",stringsAsFactors = F)


p1 = p1[!p1$participantID %in% c("MF37","MG56","MG50","MG97"),]

images = paste0("image",1:16)
imFiles = paste0("S",1:16,".jpg")

length(unique(apply(p1[,images],1,paste,collapse="-")))
nrow(p1)
length(unique(apply(p1[,images],1,paste,collapse="-")))/nrow(p1)

d = data.frame()
px = p1
for(i in 1:nrow(px)){
  d = rbind(d, data.frame(
    imFile = unlist(px[i,images]),
    imNum = sapply(px[i,images],function(X){which(imFiles==X)}),
    order = 1:16,
    stringsAsFactors = F
  ))
}
d$imFile = as.character(d$imFile)
meanOrder = (names(sort(tapply(d$order,d$imFile,function(X){
  as.numeric(names(sort(table(X),decreasing = T))[1])
}))))
d$imNumSorted = sapply(d$imFile,function(X){which(meanOrder==X)})

imagesForPlotting = paste0("../results/StoryOrder/cleanData/img_icon/",
                           gsub("\\.jpg","icon.png",meanOrder))

imageImportanceFreq = table(p1$mostImportantSceneSRC)[meanOrder]
imageImportanceFreq[is.na(imageImportanceFreq)] = 0
names(imageImportanceFreq) = meanOrder

# S1 to S16
canonicalOrder = toupper(c("n",'l','j','d','h','b','c','a','g','i','p','f','o','m','e','k'))
canonicalOrderSorted = canonicalOrder[sapply(meanOrder,function(X){which(X==imFiles)})]

pdf("../results/StoryOrder/graphs/MeanOrder_phase1.pdf")
par(mar=c(5, 2, 4, 2) + 0.1)
  layout(matrix(c(1,2,2),ncol=3))
  imXpoint = rep(c(1,1.5),length.out=length(imagesForPlotting))
  plot(c(1,2),c(1,16),type='n',xaxt='n',yaxt='n',bty='n',xlab="",ylab="")
  for(i in 1:length(imagesForPlotting)){
    rasterImage(readPNG(imagesForPlotting[i]),
                imXpoint[i],16-i,imXpoint[i]+0.5,16-i+2,
                xpd=T)
  }
  startX = 2.05
  endX = 2.2
  imageImportanceFreqWidths = (imageImportanceFreq/max(imageImportanceFreq))*(endX-startX)
  rect(endX-imageImportanceFreqWidths,(16:1)-0.25,endX,(16:1)+0.25,col='red',xpd=T,border=NA)
  segments(endX+0.005,16.5,endX+0.005,0.5,xpd=T,col='red')
  segments(endX+0.005,(16:1),endX+0.1,16:1,xpd=T,col='red')
  text(2,16.75,labels = "Importance",xpd=T,col="red")
  # 2nd plot
  plot(1:16,1:16,type='n',yaxt='n',xlab="Story order",ylab="",xaxt='n')
  axis(2,at = 16:1, labels = canonicalOrderSorted,las=1)
  axis(1,at=c(1,8,16))
  points(d$order,17-d$imNumSorted,col=rgb(0,0,0,0.1),pch=15,cex=4)
dev.off()