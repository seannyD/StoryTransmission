// Instructions

// The text strings below specify what the speaker will see.  
// They are HTML strings, surrounded by double quote characters.
// New lines in the string will not be shown to the participant, so use <p> for prargraph beginnings or <br /> for breaks between paragraphs.
// You can specify a title using <h1>Title Text</h1>
// You can split the string over more than one line as long as you put a forward slash at the end of the line (otherwise it thinks that the string has stopped).

var techWarning = 
"<h1>Permission to record your voice</h1>\
<p>In this experiment, we need to record your voice.  Recording will not begin immediately - you will be told when recording starts and stops.\
<p>Please follow the instructions below to allow us to use your microphone.\
<p> INSTRUCTIONS TO DO";

var failTechTest = "Sorry, we could not access a microphone on your device.";

// No longer using prolific
//var endSurveyText = "Thank you for completing the survey, follow the link below to get your worker code. <br /><br />" ;

var endSurveyText_MechanicalTurk = 
"<h1>Thank you for participating!</h1>\
<p>If you have any comments, questions, or concerns, or would like to be informed of future developments in this study, the researchers can be reached at: \
<p>Richard E.W. Berl, Department of Human Dimensions of Natural Resources Colorado State University, rewberl@colostate.edu\
<p>Alarna Samarasinghe, Department of Archaeology and Anthropology University of Bristol, as15936@bristol.ac.uk\
<p>If you have questions about your rights as a volunteer in this research, you may contact:\
<p>Colorado State University Institutional Review Board RICRO_IRB@mail.colostate.edu\
<p>970-491-1553\
<p>University of Bristol Faculty of Arts Human Research Ethics Committee Liam McKervey, Research Ethics Co-ordinator Liam.McKervey@bristol.ac.uk\
<p>0117 331 7472\
<h1>Worker completion code</h1>\
<p>Below you will find your worker code.  Save your code in a secure location for entry on Mechanical Turk. Your Completion Code must match the one entered here in order to receive compensation for your participation. <p> <h1>COMPLETION CODE:</h1> ";

//var endSurveyText.Prolific = "Please follow the link below to complete the survey on Prolific Academic. <br /><br />";

var uploadingText = "<h1>Uploading</h1><p>Uploading your story, please wait ...";

var recordingInstructionText = 
"<h1>Tell us a story!</h1>\
<p>Using your microphone, please record yourself recalling as many details as you can from the story you just heard. It is okay if you do not recall them in the correct order or remember something later—any details of the story can be mentioned at any time in the recording. \
<p>Press <strong>Start Recording</strong> to start recording.  Press <strong>Stop Recording</strong> to finish recording. \
<p>After your recording has been stopped, pressing record again will add to the previous recording, if you have anything to add.\
<p>Once you have finished, before submitting your recording, press play and skip around using the progress bar to ensure it is audible, understandable, and of good quality. You can press record to say again any parts of the recording that were not clear.\
<p>After you have finished your recall and checked your recording, press the button below to continue.";




var playStoryInstructionText = 
"<h1>Listen!</h1>\
<p>Please listen to the recording below. Pay close attention, as you will be asked to recall as many details from the story as you can.\
<p><strong>IMPORTANT:</strong> Ensure that your speakers are at a sufficient volume and your sound is working <strong>before</strong> playing the recording, as <strong>it will play only once</strong>. If you do not listen to or cannot hear the full recording and are therefore unable to recall it, your responses will be invalid and may be rejected.\
<p><strong>WARNING:</strong> This section is timed. From the time you press the play button to listen to the story until the time when you have completed recalling the story (about 20 minutes), you are required to remain at your computer. If it is clear from your data that you were not present for the full task, your responses will be invalid and may be rejected.";




var speechEvaluationInstructionText1 = 
"<h1>Speaker Evaluation: Speaker 1</h1>\
<p>Please listen to the recording below.  You will then be asked to indicate your impressions of the speaker. You may listen to each recording as many times as needed.\
<p><strong>IMPORTANT:</strong> Pay close attention to the items on each rating scale. Please try to use the entire breadth of the scale.\
<p>The passage, from 'Comma Gets a Cure', is copyright 2000 Douglas N. Honorof, Jill McCullough & Barbara Somerville. All rights reserved.";


var speechEvaluationInstructionText2 = 
"<h1>Speaker Evaluation: Speaker 2</h1>\
<p>Please listen to the recording below.  You will then be asked to indicate your impressions of the speaker. You may listen to each recording as many times as needed.\
<p><strong>IMPORTANT:</strong> Pay close attention to the items on each rating scale. Please try to use the entire breadth of the scale.\
<p>The passage, from 'Comma Gets a Cure', is copyright 2000 Douglas N. Honorof, Jill McCullough & Barbara Somerville. All rights reserved.";

var distractionTaskInstructions = 
"<h1>Memory test</h1>\
<p>You will now be asked to complete a memory test. You will be shown a rectangular grid, with a set of 7 “cards” with different symbols on them placed in a specific arrangement on the grid. You will have 30 seconds to memorize the symbols on the cards and their placement on the grid. You will then have 30 seconds to choose the cards with the correct symbols and place them in the correct arrangement. This task will be repeated a total of 3 times.\
<p>Press the button below when you are ready.";

function setInstruction(t){
	document.getElementById("instructions").innerHTML = t;
}

function endSurvey(){
	// Not currently used
	setInstruction(endSurveyText);
}

function showWorkerCode(){
	setInstruction(endSurveyText_MechanicalTurk + "<h1>" +workerCode + "</h1>");
}