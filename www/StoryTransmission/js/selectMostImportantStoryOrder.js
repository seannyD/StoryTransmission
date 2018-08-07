

var mostImportantSceneNumber;
var mostImportantSceneSRC;

function initialiseSelectMostImportantScene(){
	createMostImportantSceneSelector();
	$("#sceneImportance").hide();
	$('#mostImportantSceneReason').bind('input propertychange', function() {
		if($('#mostImportantSceneReason').val().length>0){
			$("#finishSelectMostImportantStoryOrderButton").show();
		}else{
			$("#finishSelectMostImportantStoryOrderButton").hide();
		}
	});
	$("#finishSelectMostImportantStoryOrderButton").hide();
	$("#selectMostImportantStoryOrder").show();
	$("#mostImportantSceneReason").val("");
	setInstruction("This is your final story. Which scene do you think is most important scene in your story?");
}

function createMostImportantSceneSelector(){
	
	var table = "<table>";
	for(var i=0;i<storyCardOrder.length;++i){
		var row = createMostImportantSceneSelectorRow(
			i,
			storyCardOrder[i],
			storyCardOrderText[i]);
		table += row;
	}
	table += "</table>";
	document.getElementById("storyTable").innerHTML = table;
}

function createMostImportantSceneSelectorRow(sceneNumber,sceneSRC,sceneText){
	var rowTemplate = 
	'<tr id="importanceSceneSCENE_NUMBER1">\
	<td><button id="importanceSceneSelectButtonSCENE_NUMBER2" class="btn btn-success" onclick="participantSelectedImportantScene(SCENE_NUMBER3)">Select</button></td>\
	<td><img class="selectImportantSceneImage" src="SCENE_SRC"></td>\
	<td>SCENE_TEXT</td>\
	</tr>';
	rowTemplate = rowTemplate.replace("SCENE_NUMBER1",sceneNumber);
	rowTemplate = rowTemplate.replace("SCENE_NUMBER2",sceneNumber);
	rowTemplate = rowTemplate.replace("SCENE_NUMBER3",sceneNumber);
	rowTemplate = rowTemplate.replace("SCENE_SRC",baseStoryImageFolder+sceneSRC);
	rowTemplate = rowTemplate.replace("SCENE_TEXT",sceneText);
	return(rowTemplate);
}

function participantSelectedImportantScene(sceneNumber){
	$("#sceneImportance").show();
	mostImportantSceneNumber = sceneNumber;
	mostImportantSceneSRC = storyCardOrder[sceneNumber];
	// Hide all except selected
	for(var i=0;i<storyCardOrder.length;++i){
		if(i!=mostImportantSceneNumber){
			$("#importanceScene"+i).hide();
		}
	}
	$("#importanceSceneSelectButton"+mostImportantSceneNumber).hide();
}

function finishSelectMostImportantStoryOrder(){
	$("#finishSelectMostImportantStoryOrderButton").hide();
	uploadMostImportantSceneInfo();

}

function uploadMostImportantSceneInfo(){
	var csvText = "participantID,mostImportantSceneNumber,mostImportantSceneSRC,mostImportantSceneReason\n";

	var reason = $("#mostImportantSceneReason").val();
	// replace any double-double quotes
	reason = reason.replace(/"/g, "'");
	// surround with double-double quotes to contain new lines etc.
	reason = '"'+reason+'"';

	csvText += [participantID,
				mostImportantSceneNumber + 1, // convert to 1-indexed
				mostImportantSceneSRC,
				reason].join(",")+"\n";

	// Upload to server
	var fd = new FormData();
	//var filename = participantID  + '_DT_' + distractionTaskNumber + '.csv';
	
	//fd.append('fname', filename);
	fd.append('data', csvText);
	fd.append('filetype','storyOrderMostImportant');
	fd.append("id",participantID + "_storyOrderMostImportant");
	$.ajax({
		type: 'POST',
		url: uploadSurveyPHPLocation,
		data: fd,
		processData: false,
		contentType: false
	}).done(function(data) {
		console.log(data);
		var bits = data.split(";");
		if(bits.length==2){
			addToFileLog(bits[0],bits[1]);
		}
		setTimeout("nextStage()",500);
	});
}