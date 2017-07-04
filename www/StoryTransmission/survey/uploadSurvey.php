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

$fn = md5(microtime()).".csv";

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

$filename = $base.$fn;


echo($id.";".$filename);


$fp = fopen($filename, 'wb');
fwrite($fp, $data);
fclose($fp);

?>
