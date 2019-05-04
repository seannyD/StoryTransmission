library(ggplot2)

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


# Restrict to participants with a p1 and a p3
p1 = p1[p1$participantID %in% p3$participantID,]

###
# Actual mean difference

p3ImportantScene = p3[match(p1$participantID,p3$participantID),]$mostImportantSceneSRC

p1SameAsP3 = p1$mostImportantSceneSRC[!is.na(p3ImportantScene)] == 
  p1$mostImportantSceneSRC[!is.na(p3ImportantScene)]

trueDist = c(sum(p1SameAsP3),sum(!p1SameAsP3))

###
# Simulated mean difference

simulate2phases = function(){
  length(unique(sample(p1$mostImportantSceneSRC,2)))
}

simulateAllParts = function(){
  x = replicate(nrow(p1),simulate2phases())
  c(sum(x==1),sum(x==2))
}

set.seed(111)
randomDist = replicate(10000,simulateAllParts())

expectedDist = apply(randomDist,1,mean)
expectedDistIQR = apply(randomDist,1,quantile,probs=c(0.25,0.75))

  
g = ggplot(mapping = aes(x = randomDist[1,])) +
  geom_histogram(binwidth = 1) +
  geom_segment(aes(x = trueDist[1],xend=trueDist[1],
               y = 0, yend = max(table(randomDist[1,]))*0.75), 
               arrow=arrow(ends = 'first',type="closed"),
               size=2,colour="red") +
  annotate("text",x=trueDist[1],y=max(table(randomDist[1,]))*0.8, colour="red",label="Observed") +
  annotate("text",x=median(randomDist[1,]),y=max(table(randomDist[1,]))*1.1,label="Expected") +
  coord_cartesian(xlim=c(0,16)) +
  xlab("Number of participants choosing\nthe same 'most important' scene\nin phase 1 and phase 3") +
  theme(axis.title.y = element_blank(),
        axis.ticks.y = element_blank(),
        axis.text.y = element_blank())

g

pdf("../results/StoryOrder/graphs/NumPartChooseSameImportantScene_P1vP3.pdf",width=4,height=4)
g
dev.off()
