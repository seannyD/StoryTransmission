# StoryTransmission

This version includes:

-  Localisation
-  Demographic survey
-  Playing story audio (just my voice for testing)
-  Distraction task
-  Recording audio (please don't record anything longer than a few seconds for now!)
-  Resampling to lower sample rates
-  Converting and saving audio to mp3 (this happens asynchronously, so you may be asked to wait at the end of the experiment)
-  Playing evaluation story
-  Voice evaluation survey
-  Returning worker code

It does not include:

-  Nice styling
-  Instructions for the distraction task
-  Instructions in general

If you add a url variable "test=T" to the url, then you get some configuration options (Some of this works, other bits I haven't tested):

http://correlation-machine.com/StoryTransmission/html/surveyTest.html?test=T

The first text box in the test section lists the stages that will happen (comma delimted, no spaces or quotes).  This can be handy for testing particular stages, but you'll probably always need "consent,techTest,localisation" for the later stages to work