library(xtable)

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
#          L__ logs/



try(setwd("~/Documents/Bristol/Transmission/stats/"))
try(setwd("~/Desktop/FPPT/Data/stats/"))

d = read.csv("../results/StoryOrder/rawData/storyOrderData_phase1.csv",stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")

d = d[!duplicated(d$participantID),]

p3file = "../results/StoryOrder/rawData/storyOrderData_phase3.csv"
noP3Data = FALSE

p2file = "../results/StoryOrder/rawData/storyOrderData_phase2.csv"
noP2Data = FALSE

if(file.exists(p3file)){
  dp3 = read.csv(p3file,stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")
} else{
  dp3 = data.frame()
  noP3Data = TRUE
}

if(file.exists(p2file)){
  dp2 = read.csv(p2file,stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")
} else{
  dp2 = data.frame()
  #noP2Data = TRUE
}

parts = d$participantID

d = d[d$participantID %in% parts,]
dp3 = dp3[dp3$participantID %in% parts,]

#########
# Latex
makeLatex = function(dx,dxp2,dxp3){
  lTable = makeLatexTable(dx,dxp2,dxp3)
  
  p1Important = paste(
    paste("\\textbf{Phase1 most important Scene:} ",
          dx$mostImportantSceneNumber)," (",dx$mostImportantSceneSRC,")",
    "\\\\ \\textbf{Reason}:",
    dx$mostImportantSceneReason,
    "\\\\",collapse="\n")
  p2Important  = ""
  p3Important = ""
  
  if(nrow(dxp2)>0){
    p2Important = paste(
      paste("\\textbf{Phase2 most important Scene:} ",
            dxp2$mostImportantSceneNumber)," (",dxp2$mostImportantSceneSRC,")",
      "\\\\ \\textbf{Reason}:",
      dxp2$mostImportantSceneReason,
      "\\\\",collapse="\n")
  }
  
  if(nrow(dxp3)>0){
    p3Important = paste(
      paste("\\textbf{Phase3 most important Scene:} ",
            dxp3$mostImportantSceneNumber)," (",dxp3$mostImportantSceneSRC,")",
      "\\\\ \\textbf{Reason}:",
      dxp3$mostImportantSceneReason,
      "\\\\",collapse="\n")
  }
  
  
  paste(
    paste("\\section{",dx$participantID,"}"),
    dx$startTime,
    "\\\\",
    p1Important,
    "\\\\",
    p2Important,
    "\\\\",
    p3Important,
    "\\\\ \\newpage \\clearpage",
    lTable,
    "\\clearpage \\newpage",
    collapse="\n")
}

changeToIconPNG = function(X){
  gsub("\\.jpg","icon.png",X)
}

makeLatexTable = function(dx,dxp2,dxp3){
  imageFiles= dx[paste0("image",1:16)]
  descriptions = dx[unlist(imageFiles)]
  imageFilesX = paste0("\\includegraphics[width=0.09\\textwidth]{../img_icon/",changeToIconPNG(imageFiles),"}")
  
  tx = data.frame(
    N = 1:length(imageFilesX),
    phase1 = imageFilesX,
    descriptions1 = t(descriptions))
  
  imageFilesP3 = rep("",length(imageFiles))
  descriptionsP3 = rep("",length(descriptions))
  imageFilesXP3 = rep("",length(imageFilesX))
  
  if(nrow(dxp2)>0 && ncol(dxp2)>0){
    imageFilesP2= dxp2[paste0("image",1:16)]
    descriptionsP2 = dxp2[unlist(imageFilesP2)]
    descriptionsP2 = t(descriptionsP2)
    imageFilesXP2 = paste0("\\includegraphics[width=0.09\\textwidth]{../img_icon/",changeToIconPNG(imageFilesP2),"}")
    tx$phase2 = imageFilesXP2
    tx$descriptions2 = descriptionsP2
  }
  
  if(nrow(dxp3)>0 && ncol(dxp3)>0){
    imageFilesP3= dxp3[paste0("image",1:16)]
    descriptionsP3 = dxp3[unlist(imageFilesP3)]
    descriptionsP3 = t(descriptionsP3)
    imageFilesXP3 = paste0("\\includegraphics[width=0.09\\textwidth]{../img_icon/",changeToIconPNG(imageFilesP3),"}")
    tx$phase3 = imageFilesXP3
    tx$descriptions3 = descriptionsP3
  }
  
  xt = xtable(tx)
  align(xt) <- c("r","r",rep(c("l","p{5cm}"),length.out=ncol(tx)-1))
  
  return(print(xt,include.rownames=F,type="latex",
               sanitize.text.function = function(x){x},
               hline.after=c(-1, 0), tabular.environment = "longtable"))
  
}


# makeTable = function(dx,dxp3){
#   ix = paste0("image",1:16)
#   ix = ix[ix %in% names(dx)]
#   imageFiles= dx[,ix]
#   ifx = unlist(imageFiles)
#   ifx = ifx[ifx %in% names(dx)]
#   descriptions = dx[,ifx]
#   imageFilesX = paste0("\\includegraphics[width=0.2\\textwidth]{img/",imageFiles,"}")
#   
#   
#   imageFilesP3 = rep("",length(imageFiles))
#   descriptionsP3 = rep("",length(descriptions))
#   imageFilesXP3 = rep("",length(imageFilesX))
#   if(nrow(dxp3)>0 && ncol(dxp3)>0){
#     ix = paste0("image",1:16)
#     ix = ix[ix %in% names(dxp3)]
#     imageFilesP3= dxp3[ix]
#     ifx = unlist(imageFilesP3)
#     ifx = ifx[ifx %in% names(dxp3)]
#     descriptionsP3 = dxp3[ifx]
#     imageFilesXP3 = paste0("\\includegraphics[width=0.2\\textwidth]{img/",imageFilesP3,"}")
#   }
#   
#   x = paste("\\begin{longtable}{ll | ll}",
#             "  \\hline\nImg & Description & Img & Desription\n",
#   "\\endhead ",
#   "\\hline",
#   "\\endfoot",
#   "\\endlastfoot",
#   #\\begin{tabular}{ll}",
#       paste(imageFilesX,"&",descriptions,"&",
#             imageFilesXP3,"&",descriptionsP3,
#             "\\\\\\",collapse="\n"),
#   #"\\end{tabular}",
#   "\\end{longtable}",collapse="\n")
#   
#   return(x)
# }

makeTex = TRUE

if(makeTex){
  for(i in 1:nrow(d)){
    tex = "\\documentclass[10pt,a4paper,landscape]{article}
    \\usepackage{graphicx}
    \\usepackage{longtable}
    \\usepackage[utf8]{inputenc}
    \\usepackage[margin=0.5in]{geometry}
    \\begin{document}\n\n"
    
    dxp3 = data.frame()
    dxp2 = data.frame()
    if(!noP3Data){
      dxp3 = dp3[dp3$participantID == d$participantID[i],][1,]
      if(is.na(dxp3$participantID)){
        dxp3 = dxp3[F,]
      }
    }
    print(nrow(dxp3))
    
    if(!noP2Data){
      dxp2 = dp2[match(dx$participantID,dp2$participantID),][1,]
      if(is.na(dxp2$participantID)){
        dxp2 = dxp2[F,]
      }
    }
    
     # dxp3 = dp3[dp3$participantID == d$participantID[i],][1,]
    #  dxp2 = dp2[dp2$participantID == d$participantID[i],][1,]
      tex <- paste(tex,"\n",makeLatex(d[i,],dxp2,dxp3))
      tex = paste(tex,"\n","\\end{document}")
      cat(tex,file = 
            paste0("../results/StoryOrder/cleanData/tex/storyOrder_",d$participantID[i],".tex"))
  }

}
#######

# HTML


makeHTMLTable = function(dx,dxp2,dxp3){
  imageFiles= dx[paste0("image",1:16)]
  descriptions = dx[unlist(imageFiles)]
  imageFilesX = paste0('<img width="100" src="img/',imageFiles,'">')
  
  
  imageFilesP3 = rep("",length(imageFiles))
  descriptionsP3 = rep("",length(descriptions))
  imageFilesXP3 = rep("",length(imageFilesX))
  
  if(nrow(dxp3)>0 && ncol(dxp3)>0){
    imageFilesP3= dxp3[paste0("image",1:16)]
    descriptionsP3 = dxp3[unlist(imageFilesP3)]
    descriptionsP3 = t(descriptionsP3)
    imageFilesXP3 = paste0('<img width="100" src="img/',imageFilesP3,'">')
  }
  
  tx = data.frame(
    N = 1:length(imageFilesX),
    phase1 = imageFilesX,
    descriptions1 = t(descriptions),
    phase3 = imageFilesXP3,
    descriptions3 = descriptionsP3,
    stringsAsFactors = F
  )
  if(nrow(dxp2)>0 && ncol(dxp2)>0){
    imageFilesP2= dxp2[paste0("image",1:16)]
    descriptionsP2 = dxp2[unlist(imageFilesP2)]
    descriptionsP2 = t(descriptionsP2)
    imageFilesXP2 = paste0('<img width="100" src="img/',imageFilesP2,'">')
    tx = data.frame(
      N = 1:length(imageFilesX),
      phase1 = imageFilesX,
      descriptions1 = t(descriptions),
      phase2 = imageFilesXP2,
      descriptions2 = descriptionsP2,
      phase3 = imageFilesXP3,
      descriptions3 = descriptionsP3,
      stringsAsFactors = F
    )    
  }
  return(print(xtable(tx),include.rownames=F,type="html",sanitize.text.function = function(x){x}))
  
}

htmlTable = ""

for(i in 1:nrow(d)){
  dx = d[i,]
  dxp3 = data.frame()
  dxp2 = data.frame()
  if(!noP3Data){
    dxp3 = dp3[match(dx$participantID,dp3$participantID),][1,]
    if(is.na(dxp3$participantID)){
      dxp3 = dxp3[F,]
    }
  }
  
  if(!noP2Data){
    dxp2 = dp2[match(dx$participantID,dp2$participantID),][1,]
    if(is.na(dxp2$participantID)){
      dxp2 = dxp2[F,]
    }
  }
  
  
  tx = makeHTMLTable(dx,dxp2,dxp3)
  
  div = paste(
    paste0('<div id="', dx$participantID,'">'),
    paste0('<h1>',dx$participantID,'</h1>'),
    paste("Phase1 most important Scene: ",dx$mostImportantSceneNumber," (",dx$mostImportantSceneSRC,")"),
    "<br /> Reason: ",
    dx$mostImportantSceneReason,
    "<br />Phase2 most important Scene: ",dxp2$mostImportantSceneNumber," (",dxp2$mostImportantSceneSRC,")",
    "<br /> Reason: ",
    dxp2$surveyImportantScene,
    "<br />",
    paste("Phase3 most important Scene: ",dxp3$mostImportantSceneNumber," (",dxp3$mostImportantSceneSRC,")"),
    "<br /> Reason: ",
    dxp3$mostImportantSceneReason,
    "<br />",
    tx,
    "</div>",
    collapse="\n")
  
  htmlTable = paste0(htmlTable,"\n",div)
  
}

pid = sort(unique(d$participantID))

dropdown = paste(
  '<select id="partSelect" onchange="changePart()">',
  paste0('<option value="',pid,'">',pid,'</option>',collapse = "\n"),
  '</select>',collapse="\n")
  
partList = paste("partList = [",paste(paste0("'",sort(unique(d$participantID)),"'"),collapse=","),"];")

js = paste(
  "<script>\n",
  partList,
'
function showMe(id){
  document.getElementById(id).style.display="inline";
}

function hideMe(id){
  document.getElementById(id).style.display = "none";
}

function changePart(){
  var val = document.getElementById("partSelect").value;
  for(var i=0;i<partList.length;++i){
    if(partList[i]==val){
      showMe(val)
    } else{
      hideMe(partList[i])
    }
  }
}

document.addEventListener("DOMContentLoaded", function(event) { 
  for(var i=0;i<partList.length;++i){
    showMe(partList[i]);
    hideMe(partList[i]);
  }
  changePart();
});
</script>\n', collapse="\n")

page = paste(
  '<html><body>',
  js,
  dropdown,
  htmlTable,
  '</body></html>',collapse = "\n")

cat(page,file="../results/StoryOrder/cleanData/storyOrder.html")
