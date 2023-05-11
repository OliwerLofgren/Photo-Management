<?php 
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "../JSON/users.json";
$users = [];

$input_data = json_decode(file_get_contents("php://input"), true);

//If database-file dosent exist, create it otherwise decode it
if (!file_exists($filename)) {
    file_put_contents($filename, $users);
}else {
    $users = json_decode(file_get_contents($filename), true);
}


$request_method = $_SERVER["REQUEST_METHOD"];

//Check if is a POST-method otherwise send a error message
if ($request_method == "POST") {
    $username = $input_data["username"];
    $password = $input_data["password"];

    //If you are trying to register with a username that already exist in the database, error message
    foreach($users as $user){
        if ($user["username"] == $username) {
            $message = ["message" => "Conflict! Username is already taken, Please try again!"];
            sendJSON($message, 409);
        }
    }
    //If you are trying to register with empty username/password, error message
    if($username == "" or $password == ""){
        $message = ["message" => "You cant register with an empty Username or Password"];
        sendJSON($message, 404);
    }
    $new_user = [
        "username" => $username,
        "password" => $password,
        "uploaded_photos" => [],
        "saved_photos" => [],
        "profile_pictures" => []
    ];

    // add successfull registration message to user > 
    
    //Saving the new user in the database and send a response if everything went OK
    $users[] = $new_user;
    $user_json = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($filename, $user_json);
    sendJSON($new_user);
    $message = ["message" => "Success"];
    sendJSON($message, 200);

}
$message = ["message" => "Wrong kind of method"];
sendJSON($message, 400);
?>