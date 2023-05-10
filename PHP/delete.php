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
            $id = $input_data["id"];
            $users_photo = $users[0]["saved_photos"];
    
            foreach($users_photo as $index => $photo){
                if ($photo["id"] == $id) {
                    array_splice($users_photo, $index, 1);
                    file_put_contents($filename, json_encode($users_photo, JSON_PRETTY_PRINT));
                    sendJSON($users_photo);
                }
            }

        }
        $message = ["message" => "Wrong kind of method!"];
        sendJSON($message, 400);
?>