# For visualising the presence/absence data as a matrix,
# we can cluster the individuals by similarity to spot patterns
# This script just picks an order based on hierarchical clustering.


d = readRDS("~/Downloads/master.RDS")
#d = read.csv("~/Downloads/master.csv",stringsAsFactors = F)

dx = d[d$story=="Muki",]


dx = dx[order(dx$participantID,dx$proposition),]

px = unique(dx$participantID)
participantSimilarity = 
  matrix(NA,
    nrow=length(px),
    ncol=length(px))
rownames(participantSimilarity) = px
colnames(participantSimilarity) = px
for(i in 1:(nrow(participantSimilarity)-1)){
  di = dx[dx$participantID==px[i],]
  for(j in (i+1):(ncol(participantSimilarity))){
    dj = dx[dx$participantID==px[j],]
    similarity = sum(di[match(dj$proposition,di$proposition),]$present == dj$present)
    participantSimilarity[px[i],px[j]]= similarity
  }
}

# flip to distance
participantSimilarity = max(participantSimilarity,na.rm = T)- participantSimilarity
diag(participantSimilarity) = 0
# fill in lower
lt = lower.tri(participantSimilarity)
participantSimilarity[lt] <- t(participantSimilarity)[lt]

# Use heatmap to find ordering
hm = heatmap(participantSimilarity)

# Order of participants that preserves some similarity clusters
participantOrder = rownames(participantSimilarity)[hm$rowInd]

# Quick visualisation
presx = do.call(rbind,tapply(dx$present,dx$participantID,c))
presx = presx[participantOrder,]
image(presx)

## Also with H clust:
library(mclust)
hc = hclust(as.dist(participantSimilarity))
participantOrder = hc$labels[hc$order]