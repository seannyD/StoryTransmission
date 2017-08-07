<?php
$base = '../../../private/StoryTransmission/';
if(file_exists ( "/srv/www.excdlab/data" )){
$base = '/srv/www.excdlab/data/StoryTransmission/';
}

$fi = new FilesystemIterator($base."qualifyingSurvey/", FilesystemIterator::SKIP_DOTS);
printf("%d QSurvey files<br /><br />", iterator_count($fi));

$fi = new FilesystemIterator($base."distractionTask/", FilesystemIterator::SKIP_DOTS);
printf("%d DTask files", iterator_count($fi));
?>