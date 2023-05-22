<?php 
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "../JSON/users.json";
$users = [];

$users = json_decode(file_get_contents($filename), true);
$input_data = json_decode(file_get_contents("php://input"), true);

$request_method = $_SERVER["REQUEST_METHOD"];
//Check if method is POST otherwise error message
if ($request_method == "POST") {

//Save username and password from php://input (uppgifter från databasen)
    
    $username = $input_data["username"];
    $password = $input_data["password"];

    // add error message for empty username/password input here >

    foreach($users as $user){
    //If the usename that you typed in is the same username that is registerd in the database
        if ($user["username"] == $username && $user["password"]) {
            $logged_in_user = [
                "id" => $user["id"],
                "username" => $username,
                "profile_picture" => $user["profile_picture"],
            ];
            $users[] = $logged_in_user;
            sendJSON($logged_in_user);
        }
    }
//If the user dosent exist in the database = error message
    $message = ["message" => "User not found!"];
    sendJSON($message, 404);
}
$message = ["message" => "Wrong kind of method!"];
sendJSON($message, 400);


?>