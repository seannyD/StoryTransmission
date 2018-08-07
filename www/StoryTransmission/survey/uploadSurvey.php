<?php

//if(!is_dir("recordings")){
//	$res = mkdir("recordings",0777); 
//}

// get the text
$data = $_POST['data'];
// decode it
//$filename = $_POST['fname'];
$filetype = $_POST['filetype'];
$id = $_POST['id'];

$base = '../../../private/StoryTransmission/';
if(file_exists ( "/srv/www.excdlab/data" )){
$base = '/srv/www.excdlab/data/StoryTransmission/';
}

$fn = microtime()."_".rand(1000,9999).".csv";
$fn = substr($fn,2,strlen($fn));

if($filetype === "survey"){
	$base = $base."survey/";
}
if($filetype === "timelog"){
	$base = $base."logs/";
	$fn = "Time_".$fn;
}
if($filetype === "filelog"){
	$base = $base."logs/";
	$fn = "Files_".$fn;
}
if($filetype === "distraction"){
	$base = $base."distractionTask/";	
}
if($filetype === "qualify"){
	$base = $base."qualifyingSurvey/";	
}
if($filetype === "storyOrder"){
	$base = $base."storyOrder/";	
}
if($filetype === "tellStoryFromOrderText"){
	$base = $base."tellStoryOrder/";	
}
if($filetype === "storyOrderMostImportant"){
	$base = $base."storyOrderMostImportant/";	
}


$filename = $base.$fn;


echo($id.";".$filename);


$fp = fopen($filename, 'wb');
fwrite($fp, $data);
fclose($fp);

?>
