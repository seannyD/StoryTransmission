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



try(setwd("~/Documents/Bristol/Transmission/stats/"))
try(setwd("~/Desktop/Transmission/stats/"))

d = read.csv("../results/StoryOrder/rawData/storyOrderData_phase1.csv",stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")

dp3 = read.csv("../results/StoryOrder/rawData/storyOrderData_phase3.csv",stringsAsFactors = F,encoding = "UTF-8",fileEncoding = "UTF-8")

parts = union(d$participantID,dp3$participantID)

d = d[d$participantID %in% parts,]
dp3 = dp3[dp3$participantID %in% parts,]

#########
# Latex
makeLatex = function(dx,dxp3){
  lTable = makeTable(dx,dxp3)
  paste(
    paste("\\section{",dx$participantID,"}"),
    dx$startTime,
    "\\\\",
    paste("\\textbf{Phase1 most important Scene:} ",dx$mostImportantSceneNumber),
    "\\\\ \\textbf{Reason}:",
    dx$mostImportantSceneReason,
    "\\\\",
    paste("\\textbf{Phase3 most important Scene:} ",dxp3$mostImportantSceneNumber),
    "\\\\ \\textbf{Reason}:",
    dxp3$mostImportantSceneReason,
    "\\\\",
    lTable,
    "\\clearpage \\newpage",
    collapse="\n")
}

makeTable = function(dx,dxp3){
  
  imageFiles= dx[paste0("image",1:16)]
  descriptions = dx[unlist(imageFiles)]
  imageFilesP3= dxp3[paste0("image",1:16)]
  descriptionsP3 = dxp3[unlist(imageFiles)]
  
  imageFilesX = paste0("\\includegraphics[width=0.2\\textwidth]{img/",imageFiles,"}")
  imageFilesXP3 = paste0("\\includegraphics[width=0.2\\textwidth]{img/",imageFilesP3,"}")
  
  x = paste("\\begin{longtable}{ll | ll}",
            "  \\hline\nImg & Description & Img & Desription\n",
  "\\endhead ",
  "\\hline",
  "\\endfoot",
  "\\endlastfoot",
  #\\begin{tabular}{ll}",
      paste(imageFilesX,"&",descriptions,"&",
            imageFilesXP3,"&",descriptionsP3,
            "\\\\\\",collapse="\n"),
  #"\\end{tabular}",
  "\\end{longtable}",collapse="\n")
  
  return(x)
}

tex = "\\documentclass[12pt,a4paper]{article}
\\usepackage{graphicx}
\\usepackage{longtable}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\begin{document}\n\n"
for(i in 1:nrow(d)){
  dxp3 = dp3[dp3$participantID == d$participantID,][1,]
  try(tex <- paste(tex,"\n",makeLatex(d[i,],dxp3)))
}

tex = paste(tex,"\n","\\end{document}")

cat(tex,file = "../results/StoryOrder/cleanData/storyOrder.tex")

#######

# HTML


makeHTMLTable = function(dx,dxp3){
  imageFiles= dx[paste0("image",1:16)]
  descriptions = dx[unlist(imageFiles)]
  imageFilesP3= dxp3[paste0("image",1:16)]
  descriptionsP3 = dxp3[unlist(imageFiles)]
  
  imageFilesX = paste0('<img width="100" src="img/',imageFiles,'">')
  imageFilesXP3 = paste0('<img width="100" src="img/',imageFilesP3,'">')
  
  tx = data.frame(
    phase1 = imageFilesX,
    descriptions1 = t(descriptions),
    phase3 = imageFilesXP3,
    descriptions3 = t(descriptionsP3),
    stringsAsFactors = F
  )
  return(print(xtable(tx),include.rownames=F,type="html",sanitize.text.function = function(x){x}))
  
}

htmlTable = ""

for(i in 1:nrow(d)){
  dxp3 = dp3[dp3$participantID == d$participantID,][1,]
  dx = d[i,]
  
  tx = makeHTMLTable(dx,dxp3)
  
  div = paste(
    paste0('<div style="border:thick solid #0000FF" id="', dx$participantID,'">'),
    paste0('<h1>',dx$participantID,'</h1>'),
    paste("Phase1 most important Scene: ",dx$mostImportantSceneNumber),
    "<br /> Reason: ",
    dx$mostImportantSceneReason,
    "<br />",
    paste("Phase3 most important Scene: ",dxp3$mostImportantSceneNumber),
    "<br /> Reason: ",
    dxp3$mostImportantSceneReason,
    "<br />",
    tx,
    "</div>",
    collapse="\n")
  
  htmlTable = paste0(htmlTable,"\n",div)
  
}

dropdown = paste(
  '<select id="partSelect" onchange="changePart()">',
  paste0('<option value="',unique(d$participantID),'">',unique(d$participantID),'</option>'),
  '</select>',collapse="\n")
  
partList = paste("partList = [",paste(paste0("'",unique(d$participantID),"'"),collapse=","),"];")

js = paste(
  "<script>\n",
  partList,
'
function showMe(id){
  document.getElementById(id).display="inline";
}

function hideMe(id){
  document.getElementById(id).display="none";
}

function changePart(){
  var val = document.getElementById("partSelect").value;
  for(var i=0;i<partList.length;++i){
    if(partList[i]==val){
      showMe(val)
    } else{
      hideMe(val)
    }
  }
}

document.addEventListener("DOMContentLoaded", function(event) { 
  for(var i=0;i<partList.length;++i){
    hideMe(partList[i])
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
