// Code for distraction task

function startDistractionTask(version){
	showMe("distractionTaskContainer");
	dummyDistractionTask();
}


var countdown = 5;
var txId;
function dummyDistractionTask(){
	countdown = 5;
	txId = setInterval(function(){
		if(countdown==0){
			clearInterval(txId);
			setTimeout("nextStage()",100);
		} else{
			document.getElementById("distractionTaskContainer").innerHTML = "Look at the Numbers<br /><br />" + countdown;
			countdown -= 1;
		}
	}, 1000);
	
}