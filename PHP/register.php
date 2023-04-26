<?php 
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "../JSON/users.json";
$users = [];

$input_data = json_decode(file_get_contents("php://input"), true);

if (!file_exists($filename)) {
    file_put_contents($filename, $users);
}else {
    $users = json_decode(file_get_contents($filename), true);
}
$request_method = $_SERVER["REQUEST_METHOD"];

if ($request_method = "POST") {
    $username = $input_data["username"];
    $password = $input_data["password"];

    foreach($users as $user){
        if ($user["username"] == $username) {
            $message = ["Conflict! Username is already taken, Please try again!"];
            sendJSON($message, 409);
        }
    }

    if($username == "" or $username == ""){
        $message = ["message" => "You cant register with an empty Username or Password"];
        sendJSON($message, 404);
    }
    $new_user = [
        "username" => $username,
        "password" => $password
    ];

    $users[] = $new_user;
    $user_json = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($filename, $user_json);
    sendJSON($new_user);
}
$message = ["message" => "Wrong kind of method"];
sendJSON($message, 400)
?>