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
                $photo_id = $input_data["photo_id"];
                $user_id = $users[$logged_user_index]["id"];
                $uploaded_photos = $users[$logged_user_index]["uploaded_photos"];
                $profile_picture = $users[$logged_user_index]["profile_picture"];
                $profile_picture_deleted = false;
                
               
                foreach($uploaded_photos as $index => $photo){
                    //If the ID matches the id of the images you want to delete
                    if ($photo["photo_id"] == $photo_id) {
                        // Check if the photo is the same as the profile picture
                    if ($photo["photo"] == $profile_picture or $photo["photo"] == $photo["photo"]) {
                        array_splice($uploaded_photos, $index, 1);
                        $users[$logged_user_index]["uploaded_photos"] = $uploaded_photos;
                        
                    }else{
                        //Returns trailing name component of path. Example: my_photos/dog.jpg => dog.jpg
                        $photo_file = basename($photo["photo"]);
                        $photo_path = "../PHP/my_photos/photos_" . $user_id . "/" . $photo_file;
                        
                        if (file_exists($photo_path)) {
                        //If the file exist delete the file
                            unlink($photo_path);
                        }
                        //Delete the index where the file is located in JSON file.
                        array_splice($uploaded_photos, $index, 1);
                        
                        
                        // Updating the user's uploaded_photos array in the JSON data
                        $users[$logged_user_index]["uploaded_photos"] = $uploaded_photos;
                    }
                    
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
        sendJSON($message, 405);
?>