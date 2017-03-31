<?php

//if(!is_dir("recordings")){
//	$res = mkdir("recordings",0777); 
//}

// get the text
$data = $_POST['data'];
// decode it
$filename = $_POST['fname'];
if(strpos($filename, '..') === FALSE){
$fp = fopen('../../../private/StoryTransmission/survey/'.$filename, 'wb');
fwrite($fp, $data);
fclose($fp);
}
?>
