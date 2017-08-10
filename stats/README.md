#  Stats

## getData.R

(Change the working directory and location of data in the script).

Download the results files into a folder, then run this script, changing the 'backupfolder' variable to the location of the folder.

This will produce files `../results/Results_UK.csv` and `../results/Results_USA.csv`, relative to the working directory.  It also produces a folder for each participant with their relative files.

Some early columns help check if the experiment worked properly;

-  `highPRecording.size`, LowPRecording.size: Total size of the audio recordings created.  Should be at least 2 MB
-  `totalTime`:  Time from opening the webpage to finishing the demography survey
-  `spEvalEnt`:  The entropy efficiency of the responses to the speech evaluation questions.  If this is 0, then the participant responded the same to all questions.  If it's 1, then they responded with each value equally.  Typical real value around 0.3.
-  `Dist_Round_0_VSLT.p_plus_pnd`: score on distraction task.  Max is 10, I think.
-  `NumberSwitchWindows`: The number of times that the participant 'unfocussed' the window.  This could be because they switched browser tabs, opened another program.  But also possibly adjusting sound etc.  It doesn't mean that they can't see the experiment window, just that they clicked outside of it.
-  `secondsUnfocussedWindow`:  The amount of time, in seconds, that the participant didn't have the experiment browser window in focus.  This could be quite high without implying that it's a cheater.
-  `secondsUnfocussedWindow.distraction`:  The amount of time, in seconds, that the participant didn't have the experiment browser window in focus *during distraction tasks*.  This can also be quite high without impacting performance.  e.g. one participant so far had the window unfocussed for 39 seconds, but still scored perfectly.

## geocode.R

Take the output of getData.R and geocode some columns.