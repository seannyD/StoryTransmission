library(png)
library(dendextend)
library(dplyr)
library(qgraph)

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

#p1 = p1[!p1$participantID %in% c("MF37","MG56","MG50","MG97"),]

getStoryOrderString = function(X){
  paste(canonicalOrder[as.vector(unlist(X))],collapse="")
}

p1$storyOrderString = apply(p1[,imageNames],1, getStoryOrderString)
p2$storyOrderString = apply(p2[,imageNames],1, getStoryOrderString)
p3$storyOrderString = apply(p3[,imageNames],1, getStoryOrderString)

pairs = list(
  c("MF85","MF37"),
  c("MG81","MG49"),
  c("AA42","MG26"),
  c("MG31","MG25"),
  c("MG10","AA84"),
  c("MG64","MG45"),
  c("MG32","MG41"),
  c("MJ71","MJ32"),
  c("MJ21","MJ87"),
  c("MK47","MK19"),
  c("ML28","AA27"),
  c("ML14","ML53"),
  c("MN59","MN92"),
  c("MS95","MS19"),
  c("MU70","MU43"),
  c("MU77","MU97"))

pdf("../results/StoryOrder/graphs/PairDistanceGraphs.pdf",width=8,height=8)
par(mfrow=c(4,4),mar=c(0,0,1,0))
for(i in 1:length(pairs)){
  pair = pairs[[i]]

  p1A = p1[p1$participantID ==pair[1],]$storyOrderString
  p1B = p1[p1$participantID ==pair[2],]$storyOrderString
  p2X = p2[p2$participantID ==pair[1],]$storyOrderString
  p3A = p3[p1$participantID ==pair[1],]$storyOrderString
  p3B = p3[p1$participantID ==pair[2],]$storyOrderString
  
  if(length(p1A)==0){p1A=NA}
  if(length(p1B)==0){p1B=NA}
  if(length(p2X)==0){p2X=NA}
  if(length(p3A)==0){p3A=NA}
  if(length(p3B)==0){p3B=NA}
  
  dist_m = adist(c(p1A,p1B,p2X,p3A,p3B))
  rownames(dist_m) = c("P1A","P1B","P2","P3A","P3B")
  colnames(dist_m) = c("P1A","P1B","P2","P3A","P3B")
  dist_m = dist_m[,!is.na(dist_m[1,])]
  dist_m = dist_m[!is.na(dist_m[,1]),]
  dist_mi <- 16-dist_m # similarity
  
  groups = list(c(which(rownames(dist_m)=="P1A"),
                  which(rownames(dist_m)=="P1B")),
                c(which(rownames(dist_m)=="P2")),
                c(which(rownames(dist_m)=="P3A"),
                  which(rownames(dist_m)=="P3B")))
  
  for(i in 1:length(groups)){
    if(length(groups[[i]])==0){
      groups[[i]] <- NULL
    }
  }
  
  #qgraph(dist_mi, layout='spring',groups=list(c(1,2),c(3),c(4,5)), vsize=15,border=F,palette="colorblind",edge.color="black")
  qgraph(dist_mi, layout='spring',
         groups=groups, 
         vsize=15,palette="colorblind",
         edge.color="black",title=paste(pair,collapse="/"))

}
dev.off()

#######
# MDS

library(MASS)


allStoryOrderStrings = c(p1$storyOrderString,p2$storyOrderString,p3$storyOrderString)

dist.all = adist(allStoryOrderStrings)
rownames(dist.all) = c(
  paste("P1",p1$participantID),
  paste("P2",p2$participantID),
  paste("P3",p3$participantID))
colnames(dist.all) = rownames(dist.all)
dist.all = dist.all[,!is.na(dist.all[1,])]
dist.all = dist.all[!is.na(dist.all[,1]),]
dist.all.real = dist.all
# Smooth
dist.all = dist.all + 0.1

# MDS
set.seed(2389)
mds.all = isoMDS(dist.all)
phase = c(rep("P1",nrow(p1)),
          rep("P2",nrow(p2)),
          rep("P3",nrow(p3)))
colsx = c("#1b9e77","#d95f02","#7570b3")
colsx = adjustcolor(colsx,alpha.f = 0.6)

hull = chull(mds.all$points[phase=="P1",])
P1.hull = data.frame(mds.all$points[phase=="P1",][hull,])
names(P1.hull) = c("x","y")
hull = chull(mds.all$points[phase=="P2",])
P2.hull = data.frame(mds.all$points[phase=="P2",][hull,])
names(P2.hull) = c("x","y")
hull = chull(mds.all$points[phase=="P3",])
P3.hull = data.frame(mds.all$points[phase=="P3",][hull,])
names(P3.hull) = c("x","y")

library(ggplot2)
pdf("../results/StoryOrder/graphs/PairDistances_MDS_all.pdf",
    width=4,height=4)
ggplot(data.frame(x=mds.all$points[,1],
           y=mds.all$points[,2],
           Phase=phase,stringsAsFactors = F), 
       aes(x=x,y=y,colour=Phase)) +
  geom_polygon(data=P1.hull,aes(x=x,y=y,colour="P1"),fill=NA) +
  geom_polygon(data=P2.hull,aes(x=x,y=y,colour="P2"),fill=NA) +
  geom_polygon(data=P3.hull,aes(x=x,y=y,colour="P3"),fill=NA) +
  geom_point() +
  scale_colour_manual(aes(colour=Phase),values=colsx) +
     xlab("Dimension 1") + ylab("Dimension 2") +
  theme(legend.position = 'top')
dev.off()

pdf("../results/StoryOrder/graphs/PairDistanceGraphs_MDS.pdf",width=8,height=8)
par(mfrow=c(4,4),mar=c(0,0,3,0))
for(i in 1:length(pairs)){
  pair = pairs[[i]]
  
  pointNames = 
    c(P1A=paste("P1",pair[1],collapse = " "),
      P1B=paste("P1",pair[2],collapse = " "),
      P2 =paste("P2",pair[1],collapse = " "),
      P3A=paste("P3",pair[1],collapse = " "),
      P3B=paste("P3",pair[2],collapse = " "))
  pointNames = pointNames[pointNames %in% rownames(mds.all$points)] 
  mdspoints = mds.all$points[pointNames,]
  rownames(mdspoints) = names(pointNames)
  
  xlim = range(mdspoints[,1])
  dx = (diff(xlim)*0.1)
  xlim[1] = xlim[1] - dx
  xlim[2] = xlim[2] + dx
  ylim = range(mdspoints[,2])
  dy = diff(ylim)*0.1
  ylim[1] = ylim[1] -dy
  ylim[2] = ylim[2] +dy
  
  #remove {type = "n"} to see dots
  plot(mdspoints, type='n', cex = 3, col = , xlab = "", ylab = "",xaxt='n',yaxt='n', 
       xlim=xlim, ylim=ylim,
       main = paste(pair,collapse="/")) 
  cols = c(P1A="#1b9e77CC",P1B="#1b9e77CC",P2="#d95f02CC",P3A="#7570b3CC",P3B="#7570b3CC")
  colx = cols[rownames(mdspoints)]
  
  arrows.to.draw = list(c("P1A","P2"),
                        c("P1B","P2"),
                        c("P2","P3A"),
                        c("P2","P3B"))
  for(arr in arrows.to.draw){
    if(arr[1] %in% rownames(mdspoints) & arr[2] %in% rownames(mdspoints)){
      arrows(mdspoints[arr[1],1],mdspoints[arr[1],2],mdspoints[arr[2],1],mdspoints[arr[2],2])
    }
  }
  points(mdspoints,col=colx,cex=5,pch=16,xpd=T)
  text(mdspoints,labels = rownames(mdspoints))
  
}
dev.off()


####
# Stats test: are languages getting more similar over time?
p1x = adist(p1$storyOrderString)
p1x = p1x[upper.tri(p1x)]
# for phase 2, we only take one participant from the pair
p2x = adist(p2[p2$participantID %in% sapply(pairs,function(X){X[1]}),]$storyOrderString)
p2x = p2x[upper.tri(p2x)]
p3x = adist(p3$storyOrderString)
p3x = p1x[upper.tri(p3x)]

phases = c(rep("P1",length(p1x)),
           rep("P2",length(p2x)),
           rep("P3",length(p3x)))

dx = data.frame(
  distance = c(p1x,p2x,p3x),
  Phase = phases
)
dx$Phase = factor(dx$Phase,ordered=F)

colsx = c("#1b9e77","#d95f02","#7570b3")
pdf("../results/StoryOrder/graphs/PairDistances_Distribution.pdf", width=4,height=3)
ggplot(dx,aes(y=distance,x=Phase,fill=Phase)) +
  geom_violin() +
  scale_fill_manual(aes(fill=Phase),values=colsx) +
  xlab("Phase") + ylab("Order distance") +
  theme(legend.position = 'top')
dev.off()

summary(aov(distance~Phase,data=dx))

t.test(dx[dx$Phase=="P1",]$distance,dx[dx$Phase=="P2",]$distance)
t.test(dx[dx$Phase=="P2",]$distance,dx[dx$Phase=="P3",]$distance)
t.test(dx[dx$Phase=="P1",]$distance,dx[dx$Phase=="P3",]$distance)


# Distance between mds points
first2DimDist = as.matrix(dist(dist.all.real))

sel1 = grepl("P1 ",rownames(first2DimDist))
p1x = first2DimDist[sel1,sel1]
p1x = p1x[upper.tri(p1x)]
# for phase 2, we only take one participant from the pair
sel2 = paste("P2",p2[p2$participantID %in% sapply(pairs,function(X){X[1]}),]$participantID)
p2x = first2DimDist[sel2,sel2]
p2x = p1x[upper.tri(p2x)]
sel3 = grepl("P3 ",rownames(first2DimDist))
p3x = first2DimDist[sel3,sel3]
p3x = p1x[upper.tri(p3x)]

phases = c(rep("P1",length(p1x)),
           rep("P2",length(p2x)),
           rep("P3",length(p3x)))

dxF2D = data.frame(
  distance = c(p1x,p2x,p3x),
  Phase = phases
)
dxF2D$Phase = factor(dxF2D$Phase,ordered=F)

pdf("../results/StoryOrder/graphs/PairDistances_Distribution_FirstTwoDimensions.pdf", width=4,height=3)
ggplot(dxF2D,aes(y=distance,x=Phase,fill=Phase)) +
  geom_violin() +
  scale_fill_manual(aes(fill=Phase),values=colsx) +
  xlab("Phase") + ylab("Order distance") +
  theme(legend.position = 'top')
dev.off()

summary(aov(distance~Phase,data=dxF2D))

t.test(dxF2D[dxF2D$Phase=="P1",]$distance,dxF2D[dxF2D$Phase=="P2",]$distance)
t.test(dxF2D[dxF2D$Phase=="P2",]$distance,dxF2D[dxF2D$Phase=="P3",]$distance)
t.test(dxF2D[dxF2D$Phase=="P1",]$distance,dxF2D[dxF2D$Phase=="P3",]$distance)





