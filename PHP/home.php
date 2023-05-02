<?php 
ini_set("display_errors", 1);
require_once("functions.php");
$message = ["message" => ""];
$filename = "../JSON/users.json";
if(!file_exists($filename)){
    file_put_contents($filename, json_decode($message));
}else {
    $json = file_get_contents($filename);
    $message = json_decode($json, true);
}
$request_method = $_SERVER["REQUEST_METHOD"];
if (!$request_method == "POST") {
    $message = ["message" => "Wrong kind of Method"];
    echo "<p>$message<p>";
    sendJSON($message, 400);
}
$message = ["message" => "Hello!"];
sendJSON($message);

?>