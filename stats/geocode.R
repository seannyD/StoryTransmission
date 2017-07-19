library(ggmap)

# x = geocode("Cardiff")
# 
# # or 
# geocodeAdddress <- function(address) {
#   require(RJSONIO)
#   url <- "http://maps.google.com/maps/api/geocode/json?address="
#   url <- URLencode(paste(url, address, "&sensor=false", sep = ""))
#   x <- fromJSON(url, simplify = FALSE)
#   if (x$status == "OK") {
#     out <- c(x$results[[1]]$geometry$location$lng,
#              x$results[[1]]$geometry$location$lat)
#   } else {
#     out <- NA
#   }
#   Sys.sleep(0.2)  # API only allows 5 requests per second
#   out
# }

# or https://www.r-bloggers.com/batch-geocoding-with-r-and-google-maps/

filename = "../stats/results/Results_USA.csv"
geocodeColumns = c("usTownChildhood")

geocodeData = function(filename, geocodeColumns, outputFilename){
  d = read.csv(filename, stringsAsFactors = F)
  
  for(col in geocodeColumns){
    d[,paste(col,".lat",sep='')] = NA
    d[,paste(col,".long",sep='')] = NA
  }
  
  for(i in 1:nrow(d)){
    for(col in geocodeColumns){
      gx = geocode(d[i,col])
      d[i,paste(col,".lat",sep='')] = gx$lon
      d[i,paste(col,".long",sep='')] = gx$lat
      Sys.sleep(1)
    }
    
  }
  write.csv(d, file=outputFilename)
}


geocodeData(filename = "../results/Results_USA.csv",
            geocodeColumns = c("usTownChildhood"),
            outputFilename = "../results/Results_USA_geocoded.csv")

geocodeData(filename = "../results/Results_UK.csv",
            geocodeColumns = c("ukTownChildhood"),
            outputFilename = "../results/Results_UK_geocoded.csv")


