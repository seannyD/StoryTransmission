# StoryTransmission

This is a repository that contains the web page for running the experiment in:

Richard E.W. Berl, Alarna N. Samarasinghe, Seán G. Roberts, Fiona M. Jordan, Michael C. Gavin (in prep) Prestige and content biases together shape the cultural transmission of narratives.

The folders contain:

-  www:  the folder to be made public on the server.
-  private: the folder to be held on the server side.
-  offline: Various stimuli prepared offline.
-  stats: Scripts for gathering the data into a coherent format.


The version of the repository at the point of submission is: 
https://github.com/seannyD/StoryTransmission/tree/a8a1a995dd0ce000222435bf70741ec2df237b29


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
-  (swiched to [lamejs](https://github.com/zhuker/lamejs) library which seems faster than liblame)
-  Writing metadata to ID3 tags of the mp3 files
-  Ability to make multiple recordings per story
-  Long recordings are now converted to multiple wav files before encoding
-  Playing evaluation story
-  Voice evaluation survey
-  Returning worker code
-  Started using Bootstrap styling
-  General instructions
-  Instructions for the distraction task
-  Server side php now dictates filenames on server
-  Logs of times and files created to be able to link data together
-  Works on localhost, correlation-machine and UoB servers
-  Qualifying mode is with a url variable "qualify=T"

## Story order experiment

You can run a "story order" experiment using e.g. baseWebsite/html/storyOrder.html?storyOrder=true

## Testing

If you add a url variable "test=T" to the url, then you get some configuration options (Some of this works, other bits I haven't tested):

http://correlation-machine.com/StoryTransmission/html/surveyTest.html?test=T

The first text box in the test section lists the stages that will happen (comma delimted, no spaces or quotes).  This can be handy for testing particular stages, but you'll probably always need "consent,techTest,localisation" for the later stages to work