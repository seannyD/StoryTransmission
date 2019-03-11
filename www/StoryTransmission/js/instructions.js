// Instructions

// The text strings below specify what the speaker will see.  
// They are HTML strings, surrounded by double quote characters.
// New lines in the string will not be shown to the participant, so use <p> for prargraph beginnings or <br /> for breaks between paragraphs.
// You can specify a title using <h1>Title Text</h1>
// You can split the string over more than one line as long as you put a forward slash at the end of the line (otherwise it thinks that the string has stopped).

var consentText = '<h1>The effects of social transmission biases on human cultural evolution</h1>\
<p>The purpose of this research is to investigate cultural transmission processes–in other words, what factors influence the information we remember and share with other people.\
<p>This work is a collaboration between Dr. Michael Gavin and Richard Berl in the Department of Human Dimensions of Natural Resources at Colorado State University and Dr. Fiona Jordan and Alarna Samarasinghe in the Department of Archaeology and Anthropology at the University of Bristol. The research is funded by the Max Planck Institute for the Science of Human History in Jena, Germany.\
<p>You will be asked to listen to 2 stories, each about 5 minutes long. You will then be given a short memory test and asked to recall the stories in as much detail as possible. Your response will be recorded using your microphone (no video). We then ask you to evaluate a few short recordings of speech by rating them on a number of characteristics. At the end of the survey, we also ask that you answer a brief set of questions about yourself and your background.\
<p><img src=\"../resources/images/TimeIcon.png\" align=\"left\">\
Participation should take approximately 45 minutes. There will be sections of the survey that are time- sensitive, during which you will not be able to walk away from your computer. You will be notified before beginning these sections.\
<p>Your participation in this research is voluntary. If you decide to participate in the study, you may withdraw your consent and stop participation at any time without penalty. We will not collect your name or any personal identifiers. When we report and share the data with others, we will combine the data from all participants. There are no known risks to you in taking part in this study. If you have any questions, contact information for the researchers, the CSU Institutional Review Board, and the UoB Human Research Ethics Committee are available at the end of the questionnaire.\
<p>All data will be stored securely on University of Bristol secure servers and will be handled in accordance with the Data Protection Act.\
<p>If you agree to participate, please press the button below.\
<br /><br />\
<button onclick="nextStage()" class="btn btn-success">I agree</button>';

var qualifyingConsentText = "<h1>Qualifying Task</h1>\
<p><h2>Purpose</h2>The purpose of this research is to investigate cultural transmission processes–in other words, what factors influence the information we remember and share with other people.\
<p>This work is a collaboration between Dr. Michael Gavin and Richard Berl in the Department of Human Dimensions of Natural Resources at Colorado State University and Dr. Fiona Jordan and Alarna Samarasinghe in the Department of Archaeology and Anthropology at the University of Bristol. The research is funded by the Max Planck Institute for the Science of Human History in Jena, Germany.\
<p><div><img src=\"../resources/images/TimeIcon_5min.png\" align=\"left\"><br />\
<h2>Instructions</h2>\
<p>This qualifying task will test your audio and microphone and ask you some questions about yourself and your background.\
<p>This task should take approximately 2-3 minutes.<br /><br /><br /><br /><br />\
<h2>Consent</h2>\
<p>Your participation in this research is voluntary. If you decide to participate in the study, you may withdraw your consent and stop participation at any time without penalty. We will not collect your name or any personal identifiers. When we report and share the data with others, we will combine the data from all participants. There are no known risks to you in taking part in this study. If you have any questions, contact information for the researchers, the CSU Institutional Review Board, and the UB Human Research Ethics Committee are available at the end of the questionnaire.\
<p>If you agree to participate, please press the button below.<br /><br />\
<button onclick=\"nextStage()\" class=\"btn btn-success\">I agree</button>";

var addonWarningText = '<h1>Warning: Turn video blockers off</h1>\
<p>This experiment uses video content, and some ad blockers and video blockers will prevent the program from working properly.\
<p>The following add-ons can stop videos playing properly:\
<ul>\
<li>Firefox add-on: "FlashStopper"</li>\
<li>Chrome Extension: "Disable HTML5 Autoplay"</li>\
</ul><br />\
<p>Please disable these add-ons for this website.\
<p>For example, for Firefox\'s "FlashStopper", click on the FlashStopper icon and click "Allow autoplay for https://transmission.excd.org"\
<p>Or for Chrome\s "Disable HTML5 Autoplay", click on the icon and click "Disable nothing"\
<p>And then refresh this page.\
<p>If you see this message again, try turning off ad blockers or other addons.  If the problem persists, please contact: Richard E.W. Berl at rewberl@colostate.edu (Mechanical Turk) or Alarna Samarasinghe (through the Prolific website).<br /><br />\
<button onclick=\"nextStage()\" class=\"btn btn-success\">I have turned off my video blockers</button>\
';

var speakerTestText = 
'<h1>Audio test</h1>\
<p>Play the music clip below to make sure your audio is working.  Please adjust your speakers or headphones to a comfortable volume.\
<p>Then press <strong>"Yes, my audio is working"</strong>.\
<p><small>Music from <em>Prelude No. 23</em> by Chris Zabriskie.</small>';

var techWarning = 
'<h1>Permission to record your voice</h1>\
<p>In this survey, we need to record your voice.  Recording will not begin immediately and you will not be recorded for the full duration of the survey--you will be told when recording starts and stops.\
<p>Please follow the instructions below to allow us to use your microphone:\
<ul>\
<li>Click the <span class="bg-success">"Yes, share my microphone"</span> button below.\
<li>A pop-up will appear asking if you want to allow this web page to access your microphone.\
<li>Select "Allow".\
</ul>\
<p> <img src="../resources/images/ShareMicInstructions.png">';

var techWarningChrome = 
'<h1>Permission to record your voice</h1>\
<p>In this survey, we need to record your voice.  Recording will not begin immediately and you will not be recorded for the full duration of the survey--you will be told when recording starts and stops.\
<p>Please follow the instructions below to allow us to use your microphone:\
<ul>\
<li>Click the <span class="bg-success">"Yes, share my microphone"</span> button below.\
<li>A pop-up will appear asking if you want to allow this web page to access your microphone.\
<li>Select "Allow".\
</ul>\
<p> <img src="../resources/images/Chrome_ShareMicInstructions.png">';

var participantDeclinedToShareMicrophoneText =
'<h1>Permission to record your voice</h1>\
<p>You are required to use your microphone to complete this task.\
<p><span class="text-warning"><strong>You declined to share your microphone.</strong></span>  This survey involves recording your voice, so we need to access the microphone.\
<p>If you would like to continue with the survey, you can still do so by <strong>Removing the temporary block</strong>:\
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
<p>If you do not wish to continue the survey, please close the window.<br />';

var participantDeclinedToShareMicrophoneTextChrome =
'<h1>Permission to record your voice</h1>\
<p>You are required to use your microphone to complete this task.\
<p><span class="text-warning"><strong>You declined to share your microphone.</strong></span>  This survey involves recording your voice, so we need to access the microphone.\
<p>If you would like to continue with the survey, you can still do so by <strong>Removing the temporary block</strong>:\
<ul>\
<li> Click on the <img src="../resources/images/camera_icon.png" style="height: 1em"> icon to the right of the address bar in your browser.\
<li> A pop-up will appear.\
<li> Click "Always allow https://transmission.excd.org to access your microphone.\
</ul>\
<p> <img src="../resources/images/Chrome_ShareMicInstructions_Fail.png">\
<ul>\
<li> Click "Done".\
<li> Click the <span class="bg-success">"Yes, share my microphone"</span> button below.\
<li>A pop-up will appear asking if you want to allow this web page to access your microphone.\
<li>Select "Allow".\
</ul>\
<p> <img src="../resources/images/Chrome_ShareMicInstructions.png">\
<br /><br />\
<p>If you do not wish to continue the survey, please close the window.<br />';

var micTestText = 
'<h1>Test your microphone</h1>\
<p>Press <strong>Start Recording</strong> to begin recording.  Press <strong>Stop Recording</strong> to finish recording.\
<p>Please read the following sentence: "<strong>Edison invented the phonograph in 1877 for the recording of sound.</strong>"';

var micTestText2 = 
"<h1>Test your microphone</h1>\
<p>Listen to your recording - did it work?";

var micFailMessage = 
"<h1>Problem with your microphone?</h1>\
<p>You are required to use your microphone to complete this task.\
<p>If you are having a problem recording audio, you can try refreshing the page and start again.\
<p>If this problem persists, you will be unable to complete this task.";

var failTechTest = "Sorry, we could not access a microphone on your device.";

var browserFailText = "<h1>Browser not supported</h1><p>The browser you are using is not supported for this experiment, or you are using a mobile devide. <p>You can open this webpage using <strong>Firefox</strong> or <strong>Chrome</strong> on a laptop/desktop."

var failUploadText = 
"<h1>Warning</h1>\
<p><span class=\"text-warning\">There was a problem uploading your data</span>\
<p>Your recording failed to upload to the server. Please contact the researchers to make them aware of the problem and ensure you receive payment.\
<p>Please include your Mechanical Turk Worker ID in any correspondence.\
<p>Contact: Richard E.W. Berl at rewberl@colostate.edu (Mechanical Turk) or Alarna Samarasinghe (through the Prolific website)";

var uploadTimeoutText = 
"<h1>Your recording is taking longer than expected to upload.<h1>\
<p>You can leave this window open in the background and check back in a few minutes. If the upload takes more than 10-15 minutes or you have run out of the time allotted for the task, please contact the researchers to make them aware of the problem and ensure you receive payment.\
<p>Please include your Mechanical Turk Worker ID in any correspondence, and the error code: \"UPLOADTIMEOUT\".\
<p>Contact: Richard E.W. Berl at rewberl@colostate.edu (Mechanical Turk) or Alarna Samarasinghe (through the Prolific website)";

var generalErrorText = 
"<h1>An error has occurred</h1>\
<p>Please contact the researchers to make them aware of the problem and ensure you receive payment.\
<p>Please include your Mechanical Turk Worker ID in any correspondence.\
<p>Contact: Richard E.W. Berl at rewberl@colostate.edu (Mechanical Turk) or Alarna Samarasinghe (through the Prolific website)";

var endSurveyText_Prolific = 
'<h1>Thank you for participating!</h1>\
<p>If you have any comments, questions, or concerns, or would like to be informed of future developments in this study, please contact Alarna Samarasinghe through the Prolific Academic site.\
<p>Please click on the link below to complete the survey and return to Prolific.\
<p><a href="https://prolific.ac/submissions/complete?cc=NP1BNGF7">https://prolific.ac/submissions/complete?cc=NP1BNGF7</a>\
<p>Or copy this completion code and use it in the Prolific completion page:\
<h1>Completion code</h1>\
<br />\
<h1><span class="bg-success">NP1BNGF7</span></h1>\
'

var endSurveyText_MechanicalTurk = 
"<h1>Thank you for participating!</h1>\
<p>If you have any comments, questions, or concerns, or would like to be informed of future developments in this study, the researchers can be reached at: \
<p>Richard E.W. Berl, Department of Human Dimensions of Natural Resources, Colorado State University, rewberl@colostate.edu\
<p>Alarna Samarasinghe, Department of Archaeology and Anthropology, University of Bristol, as15936@bristol.ac.uk\
<br><p>If you have questions about your rights as a volunteer in this research, you may contact:\
<p>Colorado State University Institutional Review Board, RICRO_IRB@mail.colostate.edu, 970-491-1553\
<p>University of Bristol Faculty of Arts Human Research Ethics Committee, Liam McKervey, Research Ethics Co-ordinator, Liam.McKervey@bristol.ac.uk, 0117 331 7472\
<h1>Completion code</h1>\
<p>Below you will find your completion code. Save your code in a secure location for entry on Mechanical Turk. You can also write it down to make sure you do not lose it. Your completion code must match the one entered here in order to receive compensation for your participation. <p> <h2>COMPLETION CODE:</h2> ";

var endQualifyingSurveyText_MechanicalTurk = 
"<h1>Thank you for participating!</h1>\
<p>If you have any comments, questions, or concerns, or would like to be informed of future developments in this study, the researchers can be reached at: \
<p>Richard E.W. Berl, Department of Human Dimensions of Natural Resources Colorado State University, rewberl@colostate.edu\
<p>Alarna Samarasinghe, Department of Archaeology and Anthropology University of Bristol, as15936@bristol.ac.uk\
<br><p>If you have questions about your rights as a volunteer in this research, you may contact:\
<p>Colorado State University Institutional Review Board RICRO_IRB@mail.colostate.edu, 970-491-1553\
<p>University of Bristol Faculty of Arts Human Research Ethics Committee Liam McKervey, Research Ethics Co-ordinator Liam.McKervey@bristol.ac.uk, 0117 331 7472\
<br><h1>To qualify for the main task:</h1>\
<p>Below you will find your completion code. Save your code in a secure location for entry on Mechanical Turk. You can also write it down to make sure you do not lose it. Your completion code must match the one entered here in order to move on to the full survey. <p> <h2>COMPLETION CODE:</h2> ";

var endQualifyingSurveyText_Prolific =
'<h1>Thank you for participating!</h1>\
<p>If you have any comments, questions, or concerns, or would like to be informed of future developments in this study, the researchers can be reached at: \
<p>Richard E.W. Berl, Department of Human Dimensions of Natural Resources, Colorado State University, rewberl@colostate.edu\
<p>Alarna Samarasinghe, Department of Archaeology and Anthropology, University of Bristol, as15936@bristol.ac.uk\
<br><p>If you have questions about your rights as a volunteer in this research, you may contact:\
<p>Colorado State University Institutional Review Board, RICRO_IRB@mail.colostate.edu, 970-491-1553\
<p>University of Bristol Faculty of Arts Human Research Ethics Committee, Liam McKervey, Research Ethics Co-ordinator, Liam.McKervey@bristol.ac.uk, 0117 331 7472\
<br><p>Please click on the link below to complete the survey and return to Prolific.\
<p><a href="https://prolific.ac/submissions/complete?cc=H7L09VUP">https://prolific.ac/submissions/complete?cc=H7L09VUP</a>\
<p>Or copy this completion code and use it in the Prolific completion page:\
<h1>Completion code</h1>\
<br />\
<h1><span class="bg-success">NP1BNGF7</span></h1>\
'

var uploadingText = "<h1>Uploading</h1><p>Uploading your story, please wait...";

var recordingInstructionText = 
"<h1>Tell us the story!</h1>\
<p>Using your microphone, please tell us the story that you just heard. It is okay if you cannot remember everything, but please try to recall as many details as possible. \
<p>Press <strong>Start Recording</strong> to start recording.  Press <strong>Stop Recording</strong> to finish recording. \
<p>After you have finished and are sure you have nothing more to add, press the button below to continue.";


var playStoryInstructionText = 
"<h1>Listen!</h1>\
<h2><strong>IMPORTANT:</strong> Please read the notices below before playing.</h2>\
<p><strong>NOTICE:</strong> Ensure that your speakers are at a sufficient volume and your sound is working <strong>before</strong> playing the recording, as <strong>it will play only once</strong>. If you do not listen to or cannot hear the full recording and are therefore unable to recall it, your responses will be invalid and may be rejected.\
<p><strong>NOTICE:</strong> This section is timed. From the time you press the play button to listen to the story until the time when you have completed recalling the story (about 15 minutes), you are required to remain at your computer. If it is clear from your data that you were not present for the full task, your responses will be invalid and may be rejected.\
<p>Please press <strong>Listen</strong> to listen to the recording below. Pay close attention: you will be asked to recall as many details from the story as you can.";


var continueMultipleRecordingText = 
"<h1>Continue recording?</h1>\
<p>If you are finished telling the story, click <strong>I have finished telling the story</strong>.\
<p>Or you can click <strong>Continue Recording</strong> to record more of the story";


// this message is actually a survey so that participants get the "next" button.
var recordingInstructionTextPreRound2 = "<h1>Next story</h1>"
var recordingInstructionTextPreRound2Survey = {
    pages: [{
        name: "page1",
        questions: [{
            type: "html",
            html: "<p>You will now be presented with a new story to listen to and recall. You will not be asked to recall any more details from the first story, so please pay close attention to the new story. <p>Press the button below to continue.",
            name: "question1"
        }]
    }]
}


var speechEvaluationInstructionText1 = 
"<h1>Speaker evaluation: Speaker 1</h1>\
<p>Please listen to the recording below.  You will then be asked to indicate your impressions of the speaker. You may listen to each recording as many times as needed.\
<p><strong>IMPORTANT:</strong> Pay close attention to the items on each rating scale. Please use the entire breadth of the scale.\
<p>When you're finished, click the \"Next\" button at the bottom of the page\
<p><small>The passage, from <em>Comma Gets a Cure</em>, is copyright 2000 Douglas N. Honorof, Jill McCullough & Barbara Somerville. All rights reserved.</small>";


var speechEvaluationInstructionText2 = 
"<h1>Speaker evaluation: Speaker 2</h1>\
<p>Please listen to the recording below.  You will then be asked to indicate your impressions of the speaker. You may listen to each recording as many times as needed.\
<p><strong>IMPORTANT:</strong> Pay close attention to the items on each rating scale. Please use the entire breadth of the scale.\
<p>When you're finished, click \"Next\" at the bottom of the page\
<p><small>The passage, from <em>Comma Gets a Cure</em>, is copyright 2000 Douglas N. Honorof, Jill McCullough & Barbara Somerville. All rights reserved.</small>";

var distractionTaskInstructions = 
'<h1>Memory test</h1>\
<p>You will now be asked to complete a memory test. You will be shown a rectangular grid with a set of 5 "cards" with different symbols on them placed in a specific arrangement on the grid. You will have 20 seconds to memorize the symbols on the cards and their placement on the grid. You will then have 20 seconds to choose the cards with the correct symbols and place them in the correct arrangement. This task will be repeated a total of 4 times.\
<p>Press the button below when you are ready.';


//---------------------
//    STORY ORDER
//---------------------

var storyOrderConsentText = '<h1>Social issues picture task</h1>\
<p>You are invited to take part in study regarding how we construct narratives. \
<p>ParticipantID = PARTICIPANT_ID_HERE\
<p>This study is carried out in 3 parts, 2 of which will take place today, and the final part will take place in a week. We will ask you to leave your email address so that we can invite you to the final part of the study.\
<br />\
<p>In the first part you will be shown some line drawings and asked to create a narrative. You will then be asked some questions about the narrative you’ve created. This part of the study will be completed online and take approximately 20 minutes.\
<p>You will then be asked to take part in a face-to-face study where you will create a narrative with another participant. This part of the study will be video recorded. We will then ask you to answer some questions on the online platform. This part of the study should take no longer than 40 minutes. \
<p>In one week’s time you will be invited to participate in the final part of the study via email. This part of the study will be carried out online and you can complete at home from any desktop or laptop computer. In this part you will be shown some line drawings and asked to create a narrative. This should take approximately 20 minutes. After submitting this part of the study, your email address will be removed from our records.\
<br />\
<p>Apart from your email address in the intial parts of the study and your voice and image in the video recording, no identifying information will be recorded. Your email address will be deleted on completion of the study and you can opt to have your face pixelated in any dissemination of recordings. Your data will be stored on encrypted, password-protected hard drives. \
<br />\
<p>There are no physical risk in taking part in this study, other than those associated with everyday life. Some of the line drawings depict moderate violence and may cause mild distress.  \
<br />\
<p>You can withdraw from the study at any point without giving any reason. Should you wish to withdraw from the study, please contact Alarna Samarasinghe (details above). You will be provided with a 4-digit ID number that you can quote and all associated files will be deleted.\
<br />\
<p>The research is carried out by Alarna Samarasinghe, a Postgraduate Researcher in the Department of Anthropology & Archaeology at the University of Bristol, and overseen by  Professor Fiona Jordan and Dr Sean Roberts in the same department. If you have any questions, please contact Alarna Samarasinghe (as15936@bristol.ac.uk). \
<br />\
<p>The Faculty of Arts Research Ethics Committee at the University of Bristol has reviewed this study. \
<p>If you have any concerns related to your participation in this study please direct them to the Faculty of Arts  Research Ethics Committee, via Liam McKervey, Research Governance and Ethics Officer (Tel: 0117 331 7472 email: Liam.McKervey@bristol.ac.uk)';

var storyOrderPhase3ConsentText = '<h1>Social issues picture task</h1>\
<p>You are invited to take part in study regarding how we construct narratives. \
<p>ParticipantID = PARTICIPANT_ID_HERE\
<p>This study is carried out in 3 parts, the last of which will take place today. \
<br />\
<p>In the first part you will be shown some line drawings and asked to create a narrative. You will then be asked some questions about the narrative you’ve created. This part of the study will be completed online and take approximately 20 minutes.\
<p>You will then be asked to take part in a face-to-face study where you will create a narrative with another participant. This part of the study will be video recorded. We will then ask you to answer some questions on the online platform. This part of the study should take no longer than 40 minutes. \
<p>In one week’s time you will be invited to participate in the final part of the study via email. This part of the study will be carried out online and you can complete at home from any desktop or laptop computer. In this part you will be shown some line drawings and asked to create a narrative. This should take approximately 20 minutes. After submitting this part of the study, your email address will be removed from our records.\
<br />\
<p>Apart from your email address in the intial parts of the study and your voice and image in the video recording, no identifying information will be recorded. Your email address will be deleted on completion of the study and you can opt to have your face pixelated in any dissemination of recordings. Your data will be stored on encrypted, password-protected hard drives. \
<br />\
<p>There are no physical risk in taking part in this study, other than those associated with everyday life. Some of the line drawings depict moderate violence and may cause mild distress.  \
<br />\
<p>You can withdraw from the study at any point without giving any reason. Should you wish to withdraw from the study, please contact Alarna Samarasinghe (details above). You will be provided with a 4-digit ID number that you can quote and all associated files will be deleted.\
<br />\
<p>The research is carried out by Alarna Samarasinghe, a Postgraduate Researcher in the Department of Anthropology & Archaeology at the University of Bristol, and overseen by  Professor Fiona Jordan and Dr Sean Roberts in the same department. If you have any questions, please contact Alarna Samarasinghe (as15936@bristol.ac.uk). \
<br />\
<p>The Faculty of Arts Research Ethics Committee at the University of Bristol has reviewed this study. \
<p>If you have any concerns related to your participation in this study please direct them to the Faculty of Arts  Research Ethics Committee, via Liam McKervey, Research Governance and Ethics Officer (Tel: 0117 331 7472 email: Liam.McKervey@bristol.ac.uk)';

var storyOrderNoConsentScreenInstructions = 
"<p>Thank you for your interest in the Social Issues Picture Task.\
<br />\
<p>As you have not given consent, you will not be required to take part in this task.";


var storyOrderAskForParticipantIDInstructions = 
"<h1>Social issues picture task</h1>\
<p>Thank you for your continued interest in the Social Issues Picture Task.\
<p>Please enter the participant ID code you were given below:<br />";

var storyOrderParticipantInstructions = 
'<h1>Social issues picture task</h1>\
<p>Thank you for your interest in the Social Issues Picture Task. \
<br />\
<p>You will now be shown 16 images and asked to rearrange them to make a story. \
<br />\
<p>You can put the pictures in any order to create a story. \
 <br />\
<p>Please click on the image and drag and drop the image into the storyline bar at the top. \
<p>You can move the pictures in the story line bar to change the order or you can drag it outside of the story line to remove it. \
<p>If you would like to see a larger version of the picture just click once on the image.\
 <br />\
<p>Please use all 16 images to create your story.\
<br />\
<p>After you have ordered the pictures, you will then get the opportunity to write your story based on each of the pictures.\
<br />\
<p>You will get 15 minutes to complete this section.\
<br />\
<button onclick="nextStage()" class="btn btn-success">Continue</button>';

var storyOrderPreSecondStageInstructions = 
'<h1>Social issues picture task</h1>\
<p>Thank you for submitting your final story.\
<p>You are now ready to move on to the second part of the study which will continue offline.';

var storyOrderFinishInstruction = 
'<h1>Social issues picture task</h1>\
<p>Thank you for taking part.\
<br />\
<p>Should any of the images in this study have caused you distress, please feel free to contact the Student Counselling Service at http://www.bristol.ac.uk/student-counselling/ \
<br />\
<p>You will be invited to take part in the final stage in a week. You will be sent a link via the email address you have provided.\
<br />\
<p>Please make note of your ID below as you will need this to take part in the final stage.' +
'<p><span style="color:red;font-size: 20pt;font-weight: bold;">PARTICIPANT_ID_HERE</span>' +
'<br /><p>Should you wish for your data to be removed at any stage, please contact Alarna Samarasinghe at as15936@bristol.ac.uk / alarna.samarasinghe@gmail.com and provide the ID number above.';

var storyOrderPhase3FinishInstruction = 
'<h1>Social issues picture task</h1>\
<p>Thank you for taking part. If you would like to know the outcomes of this study please contact Alarna Samarasinghe (details below).\
<p>Should any of the images in this study have caused you distress, please feel free to contact the Student Counselling Service at http://www.bristol.ac.uk/student-counselling/ \
<br />\
<p>ParticipantID = <span style="color:red;font-size: 20pt;font-weight: bold;"> PARTICIPANT_ID_HERE </span>\
<p>Should you wish for your data to be removed at any stage, please contact Alarna Samarasinghe at as15936@bristol.ac.uk / alarna.samarasinghe@gmail.com and provide the ID number above.';


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
	if(prolificParticipant){
		setInstruction(endSurveyText_Prolific);
	} else{
		setInstruction(endSurveyText_MechanicalTurk + "<h1>" +workerCode + "</h1>" +
		"<br /><br /><p>After you have saved this code, it is now safe to close this tab on your browser. Your data have been saved");
	}
}
