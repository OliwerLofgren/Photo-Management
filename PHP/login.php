<?php 
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "../JSON/users.json";
$users = [];

$users = json_decode(file_get_contents($filename), true);
$input_data = json_decode(file_get_contents("php://input"), true);

$request_method = $_SERVER["REQUEST_METHOD"];
if ($request_method == "POST") {
    $username = $input_data
}


?>