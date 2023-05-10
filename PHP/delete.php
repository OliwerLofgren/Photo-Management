<?php
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "../JSON/users.json";
$users = json_decode(file_get_contents($filename), true);
   
$request_method = $_SERVER["REQUEST_METHOD"];
$input_data = json_decode(file_get_contents("php://input"), true);

//This section is for deleting a current image
     if($request_method == "DELETE"){
        //You need to add id:s to every image
            $photo_id = $input_data["photo_id"];
            $users_photo = $users[0]["saved_photos"];
        foreach($users[0]["uploaded_photos"] as $index => $photo){
            if ($photo["photo_id"] == $photo_id) {
                array_splice($users[0]["uploaded_photos"], $index, 1);
            }
        }
        file_put_contents($filename, json_encode($users));
        $message = ["message" => "Photo has successfully been deleted"];
        sendJSON($message);

        }
        $message = ["message" => "Wrong kind of method!"];
        sendJSON($message, 400);
?>