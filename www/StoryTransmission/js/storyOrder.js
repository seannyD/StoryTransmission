
var storyImagesList;
var storyCardOrder = [];

var savedStoryOrders = [];


function initialiseStoryOrder(){
	var list = document.getElementById("StoryCards");
	if(list){
		storyImagesList = Sortable.create(
			list,
			{
				animation: 300,
			 	onSort: storyOrderChanged,
			 	onChoose: storyCardSelected
			 });
	}
	shuffleStoryOrder();
	storyCardOrder = getStoryCardOrder();

}

function shuffleStoryOrder(){
	var order = storyImagesList.toArray();
	shuffle(order);
	storyImagesList.sort(order);
}

function storyOrderChanged(e){
	storyCardOrder = getStoryCardOrder();
	// Save each change
	savedStoryOrders.push(storyCardOrder);
}

function getStoryCardOrder(){

	var cards = document.getElementById("StoryCards").children;
	var cardOrder = [];
	for(var i = 0; i < cards.length; i++){
		var imageName = cards[i].src;
		imageName = imageName.substr(imageName.lastIndexOf("/")+1)
		cardOrder.push(imageName);
    }
    return(cardOrder);
}

function storyCardSelected(e){
	var chosenCardSRC = e.item.src;
	console.log(chosenCardSRC);
	document.getElementById("bigStoryCardImage").src=chosenCardSRC;
}

function startStoryOrder(){
	shuffleStoryOrder();
	$("#StoryOrder").show();
}

function finishStoryOrder(){
	savedStoryOrders.push(getStoryCardOrder());
	uploadStoryOrderData();
}


function uploadStoryOrderData(){
	// Make csv and send to server
	// headers
	if(savedStoryOrders.length==0){
		return(null);
	}
	var csvText = "participantID,number,order\n";
	for(var i=0;i<savedStoryOrders.length;++i){
		csvText += participantID+","+i +",";
		csvText += savedStoryOrders[i].join("#");
		csvText += "\n";
	}

	// Upload to server
	var fd = new FormData();
	//var filename = participantID  + '_DT_' + distractionTaskNumber + '.csv';
	
	//fd.append('fname', filename);
	fd.append('data', csvText);
	fd.append('filetype','storyOrder');
	fd.append("id",participantID + "_storyOrder");
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
	//TODO: action on fail?
}
