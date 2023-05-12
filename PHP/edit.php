<?php
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "../JSON/users.json";
$users = json_decode(file_get_contents($filename), true);
   
$request_method = $_SERVER["REQUEST_METHOD"];
$input_data = json_decode(file_get_contents("php://input"), true);

    
  // This section is for update content
  if ($request_method == "PATCH") {
    
    $id[0]["saved_photos"]["id"] = $input_data["id"];
    $liked[0]["saved_photos"][0]["liked"] = $input_data["liked"];

    $new_data = [
        "id" => $id,
        "liked" => $liked
    ];
    file_put_contents($filename, json_encode($new_data));
    $message = ["message" => "Success, value changed to true!"];
    sendJSON($message);
}
$message = ["message" => "Wrong kind of method!"];
sendJSON($message, 400);


?>