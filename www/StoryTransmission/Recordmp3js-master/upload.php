<?php

//if(!is_dir("recordings")){
//	$res = mkdir("recordings",0777); 
//}

// pull the raw binary data from the POST array
$data = substr($_POST['data'], strpos($_POST['data'], ",") + 1);
// decode it
//$filename = $_POST['fname'];
$id = $_POST['id'];


$base = '../../../private/StoryTransmission/recordings/';
if(file_exists ( "/srv/www.excdlab/data" )){
$base = '/srv/www.excdlab/data/StoryTransmission/recordings/';
}

$filename = microtime()."_".rand(1000,9999).".mp3";
$filename = substr($filename,2,strlen($filename));
$filename = $base."REC_".$filename;

echo($id.";".$filename);

$decodedData = base64_decode($data);

$fp = fopen($filename, 'wb');
fwrite($fp, $decodedData);
fclose($fp);

?>
