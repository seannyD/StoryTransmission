# StoryTransmission

This version includes:

-  Instructions for sharing microphone (and instructions if access is refused)
-  Tests that audio playback and recording is working 
-  Localisation
-  Demographic survey
-  Playing story audio (just my voice for testing)
-  Distraction task
-  Recording audio 
-  Resampling to lower sample rates
-  Converting and saving audio to mp3 (this happens asynchronously, so you may be asked to wait at the end of the experiment)
-  Playing evaluation story
-  Voice evaluation survey
-  Returning worker code
-  Started using Bootstrap styling
-  General instructions

It does not include:

-  Instructions for the distraction task
-  Ability to make multiple recordings per story

If you add a url variable "test=T" to the url, then you get some configuration options (Some of this works, other bits I haven't tested):

http://correlation-machine.com/StoryTransmission/html/surveyTest.html?test=T

The first text box in the test section lists the stages that will happen (comma delimted, no spaces or quotes).  This can be handy for testing particular stages, but you'll probably always need "consent,techTest,localisation" for the later stages to work