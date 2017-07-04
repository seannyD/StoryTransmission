// Instructions

// The text strings below specify what the speaker will see.  
// They are HTML strings, surrounded by double quote characters.
// New lines in the string will not be shown to the participant, so use <p> for prargraph beginnings or <br /> for breaks between paragraphs.
// You can specify a title using <h1>Title Text</h1>
// You can split the string over more than one line as long as you put a forward slash at the end of the line (otherwise it thinks that the string has stopped).

var speakerTestText = 
'<h1>Audio test</h1>\
<p>Play the sound below to make sure your audio is working.  Please adjust your speakers or headphones to a comfortable volume.\
<p>Then press <strong>"Yes, my audio is working"</strong>.';

var techWarning = 
'<h1>Permission to record your voice</h1>\
<p>In this experiment, we need to record your voice.  Recording will not begin immediately - you will be told when recording starts and stops.\
<p>Please follow the instructions below to allow us to use your microphone:\
<ul>\
<li>Click the <span class="bg-success">"Yes, share my microphone"</span> button below.\
<li>A pop-up will appear asking if you want to allow this web page to access your microphone.\
<li>Select "Allow".\
</ul>\
<p> <img src="../resources/images/ShareMicInstructions.png">';

var participantDeclinedToShareMicrophoneText =
'<h1>Permission to record your voice</h1>\
<p>You are required to use your microphone to complete this task.\
<p><span class="text-warning"><strong>You declined to share your microphone.</strong></span>  This experiment involves recording your voice, so we need to access the microphone.\
<p>If you would like to continue with the experiment, you can still do so by <strong>Removing the temporary block</strong>:\
<ul>\
<li> Click on the <img src="../resources/images/i_icon.png" style="height: 1em"> icon to the left of the address bar in your browser.\
<li> A pop-up will appear.\
<li> Under <strong>Permissions</strong>, and <strong>Use the microphone</strong>, click the X to remove the temporary block (see the image below).\
</ul>\
<p> <img src="../resources/images/ShareMicInstructions_Fail.png">\
<ul>\
<li> Close the pop-up window.\
<li> Click the <span class="bg-success">"Yes, share my microphone"</span> button below.\
<li>A pop-up will appear asking if you want to allow this web page to access your microphone.\
<li>Select "Allow".\
</ul>\
<p> <img src="../resources/images/ShareMicInstructions.png">\
<br /><br />\
<p>If you do not wish to continue the experiment, please close the window.<br />';

var micTestText = 
"<h1>Test your microphone</h1>\
<p>Press <strong>Start Recording</strong> to start recording.  Press <strong>Stop Recording</strong> to finish recording.\
<p>Please read the following sentence. <strong>Edison invented the phonograph in 1877 for the recording of sound.</strong>";

var micTestText2 = 
"<h1>Test your microphone</h1>\
<p>Listen to your recording - did it work?";

var micFailMessage = 
"<h1>Problem with your microphone?</h1>\
<p>You are required to use your microphone to complete this task.\
<p>If you're having a problem recording audio, you can try refreshing the page and start again.\
<p>If this problem persists, you will be unable to complete this task.";

var failTechTest = "Sorry, we could not access a microphone on your device.";


var failUploadText = 
"<h1>Warning</h1>\
<p><span class=\"text-warning\">There was a problem uploading your data</span>\
<p>Your recording failed to upload to the server. Please contact the researchers to make them aware of the problem and ensure you receive payment.\
<p>Please include your Mechanical Turk Worker ID in any correspondence.\
<p>Contact: Richard E.W. Berl, Department of Human Dimensions of Natural Resources Colorado State University, rewberl@colostate.edu";

var uploadTimeoutText = 
"<h1>Your recording is taking longer than expected to upload.<h1>\
<p>You can leave this window open in the background and check back in a few minutes. If the upload takes more than 10-15 minutes or you have run out of the time allotted for the task, please contact the researchers to make them aware of the problem and ensure you receive payment.\
<p>Please include your Mechanical Turk Worker ID in any correspondence.\
<p>Contact: Richard E.W. Berl, rewberl@colostate.edu";

var generalErrorText = 
"<h1>An error has occurred</h1>\
<p>Please contact the researchers to make them aware of the problem and ensure you receive payment.\
<p>Please include your Mechanical Turk Worker ID in any correspondence.\
<p>Contact: Richard E.W. Berl, rewberl@colostate.edu";

// No longer using prolific
//var endSurveyText = "Thank you for completing the survey, follow the link below to get your worker code. <br /><br />" ;

var endSurveyText_MechanicalTurk = 
"<h1>Thank you for participating!</h1>\
<p>If you have any comments, questions, or concerns, or would like to be informed of future developments in this study, the researchers can be reached at: \
<p>Richard E.W. Berl, Department of Human Dimensions of Natural Resources Colorado State University, rewberl@colostate.edu\
<p>Alarna Samarasinghe, Department of Archaeology and Anthropology University of Bristol, as15936@bristol.ac.uk\
<p>If you have questions about your rights as a volunteer in this research, you may contact:\
<p>Colorado State University Institutional Review Board RICRO_IRB@mail.colostate.edu, 970-491-1553\
<p>University of Bristol Faculty of Arts Human Research Ethics Committee Liam McKervey, Research Ethics Co-ordinator Liam.McKervey@bristol.ac.uk, 0117 331 7472\
<h1>Worker completion code</h1>\
<p>Below you will find your worker code.  Save your code in a secure location for entry on Mechanical Turk. Your Completion Code must match the one entered here in order to receive compensation for your participation. <p> <h1>COMPLETION CODE:</h1> ";

var endQualifyingSurveyText_MechanicalTurk = 
"<h1>Thank you for participating!</h1>\
<p>If you have any comments, questions, or concerns, or would like to be informed of future developments in this study, the researchers can be reached at: \
<p>Richard E.W. Berl, Department of Human Dimensions of Natural Resources Colorado State University, rewberl@colostate.edu\
<p>Alarna Samarasinghe, Department of Archaeology and Anthropology University of Bristol, as15936@bristol.ac.uk\
<p>If you have questions about your rights as a volunteer in this research, you may contact:\
<p>Colorado State University Institutional Review Board RICRO_IRB@mail.colostate.edu, 970-491-1553\
<p>University of Bristol Faculty of Arts Human Research Ethics Committee Liam McKervey, Research Ethics Co-ordinator Liam.McKervey@bristol.ac.uk, 0117 331 7472\
<h1>To qualify for the main task:</h1>\
<p>Below you will find your worker code.  Save your code in a secure location for entry on Mechanical Turk. Your Completion Code must match the one entered here in order to receive compensation for your participation. <p> <h1>COMPLETION CODE:</h1> ";

//var endSurveyText.Prolific = "Please follow the link below to complete the survey on Prolific Academic. <br /><br />";

var uploadingText = "<h1>Uploading</h1><p>Uploading your story, please wait ...";

var recordingInstructionText = 
"<h1>Tell us a story!</h1>\
<p>Using your microphone, please tell us the story that you have just heard. It is okay if you cannot remember everything but please try and recall as many details as possible. \
<p>Press <strong>Start Recording</strong> to start recording.  Press <strong>Stop Recording</strong> to finish recording. \
<p>After your recording has been stopped, pressing record again will add to the previous recording, if you have anything to add.\
<p>Once you have finished, before submitting your recording, press play and skip around using the progress bar to ensure it is audible, understandable, and of good quality. You can press record to say again any parts of the recording that were not clear.\
<p>After you have finished your recall and checked your recording, press the button below to continue.";




var playStoryInstructionText = 
"<h1>Listen!</h1>\
<p>Please press <strong>Listen</strong> to listen to the recording below. Pay close attention: you will be asked to recall as many details from the story as you can.\
<p><strong>IMPORTANT:</strong> Ensure that your speakers are at a sufficient volume and your sound is working <strong>before</strong> playing the recording, as <strong>it will play only once</strong>. If you do not listen to or cannot hear the full recording and are therefore unable to recall it, your responses will be invalid and may be rejected.\
<p><strong>WARNING:</strong> This section is timed. From the time you press the play button to listen to the story until the time when you have completed recalling the story (about 20 minutes), you are required to remain at your computer. If it is clear from your data that you were not present for the full task, your responses will be invalid and may be rejected.";


var continueMultipleRecordingText = 
"<h1>Continue Recording?</h1>\
<p>If you are finished telling your story, click <strong>I have finished telling my story</strong>.\
<p>Or you can click <strong>Continue Recording</strong> to record more of your story";


var speechEvaluationInstructionText1 = 
"<h1>Speaker Evaluation: Speaker 1</h1>\
<p>Please listen to the recording below.  You will then be asked to indicate your impressions of the speaker. You may listen to each recording as many times as needed.\
<p><strong>IMPORTANT:</strong> Pay close attention to the items on each rating scale. Please use the entire breadth of the scale.\
<p>The passage, from 'Comma Gets a Cure', is copyright 2000 Douglas N. Honorof, Jill McCullough & Barbara Somerville. All rights reserved.";


var speechEvaluationInstructionText2 = 
"<h1>Speaker Evaluation: Speaker 2</h1>\
<p>Please listen to the recording below.  You will then be asked to indicate your impressions of the speaker. You may listen to each recording as many times as needed.\
<p><strong>IMPORTANT:</strong> Pay close attention to the items on each rating scale. Please use the entire breadth of the scale.\
<p>The passage, from 'Comma Gets a Cure', is copyright 2000 Douglas N. Honorof, Jill McCullough & Barbara Somerville. All rights reserved.";

var distractionTaskInstructions = 
"<h1>Memory test</h1>\
<p>You will now be asked to complete a memory test. You will be shown a rectangular grid, with a set of 5 \"cards\" with different symbols on them placed in a specific arrangement on the grid. You will have 30 seconds to memorize the symbols on the cards and their placement on the grid. You will then have 30 seconds to choose the cards with the correct symbols and place them in the correct arrangement. This task will be repeated a total of 3 times.\
<p>Press the button below when you are ready.";


var distractionTaskWatchInstructions = "<h1>Remember the symbols!</h1>"
var distractionTaskSelectInstructions = "<h1>Drag the correct symbols to the correct locations!</h1>"

function setInstruction(t){
	showMe("instructions");
	document.getElementById("instructions").innerHTML = t;
}

function endSurvey(){
	// Not currently used
	setInstruction(endSurveyText);
}

function showWorkerCode(){
	setInstruction(endSurveyText_MechanicalTurk + "<h1>" +workerCode + "</h1>");
}
