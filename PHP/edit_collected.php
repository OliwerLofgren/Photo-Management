<?php
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "../JSON/users.json";
$users = json_decode(file_get_contents($filename), true);
   
$request_method = $_SERVER["REQUEST_METHOD"];
$input_data = json_decode(file_get_contents("php://input"), true);

//This section is for deleting a current image
     if($request_method == "PATCH"){
            $logged_in_id = $input_data["logged_in_id"];
           
            
            
            $logged_user_index = null;
            foreach($users as $index => $user){
                if ($user["id"] == $logged_in_id) {
                    $logged_user_index = $index;
                    break;
                }
            }
            
            if ($logged_user_index !== null) {
                $photo_id = $input_data["id"];
                $saved_photos = $users[$logged_user_index]["saved_photos"];
                
               
                foreach($saved_photos as $index => $photo){
                    //If the ID matches the id of the images you want to delete
                    if ($photo["id"] == $photo_id) {
                    //Delete the index where the file is located in JSON file.
                        array_splice($saved_photos, $index, 1);
                    //Updating the user's uploaded_photos array in the JSON data.
                        $users[$logged_user_index]["saved_photos"] = $saved_photos;
                    }
                }
                file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
                $message = ["message" => "Photo has successfully been deleted"];
                sendJSON($message);
            }else{
                $message = ["message" => "User not found"];
                sendJSON($message, 404);
            }


        }
        $message = ["message" => "Wrong kind of method!"];
        sendJSON($message, 400);
?>