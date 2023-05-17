<?php
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "../JSON/users.json";
$users = json_decode(file_get_contents($filename), true);

$request_method = $_SERVER["REQUEST_METHOD"];
$input_data = json_decode(file_get_contents("php://input"), true);

//This section is for deleting a current image
if ($request_method == "DELETE") {
    $logged_in_id = $input_data["logged_in_id"];

    $logged_user_index = null;
    foreach ($users as $index => $user) {
        if ($user["id"] == $logged_in_id) {
            $logged_user_index = $index;
            break;
        }
    }

    if ($logged_user_index !== null) {
        // Delete the user from the users array
        array_splice($users, $logged_user_index, 1);

        file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
        $message = ["message" => "User has been successfully deleted"];
        sendJSON($message);
    } else {
        $message = ["message" => "User not found"];
        sendJSON($message, 404);
    }
}