// Shuffle in place
// TODO: check this is a good shuffler
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function showMe(x){
	document.getElementById(x).style.display = 'inLine';
}

function hideMe(x){
	document.getElementById(x).style.display = 'none';
}

function ConvertToCSV(objArray) {

	var str = "";
	// header
	for (var key in objArray) {
	  if (objArray.hasOwnProperty(key)) {
	    str += '"'+key+'",';
	  }
	}
	str = str.substring(0,str.length-1);
	str += "\n";
	for (var key in objArray) {
	  if (objArray.hasOwnProperty(key)) {
	    str += '"'+objArray[key]+'",';
	  }
	}
	str = str.substring(0,str.length-1);
	str += "\n"
	return str;
}

function getCurrentTime(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return(date+' '+time);
}