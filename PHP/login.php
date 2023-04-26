<?php 
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "../JSON/users.json";
$users = [];

$users = json_decode(file_get_contents($filename), true);
$input_data = json_decode(file_get_contents("php://input"), true);

$request_method = $_SERVER["REQUEST_METHOD"];
if ($request_method == "POST") {
    
    $username = $input_data["username"];
    $password = $input_data["password"];

    foreach($users as $user){
        if ($user["username"] == $username && $user["password"]) {
            $logged_in_user = [
                "username" => $username,
                "password" => $password
            ];
            $users[] = $logged_in_user;
            sendJSON($logged_in_user);
        }
    }
    $message = ["message" => "User not found!"];
    sendJSON($message, 404);
}
$message = ["message" => "Wrong kind of method!"];
sendJSON($message, 400);


?>