<?php
ini_set("display_errors", 1);
require_once("functions.php");

//This section is for deleting a current image
     if($request_method == "DELETE"){
        //You need to add id:s to every image
            $id = $input_data["id"];
    
            foreach($users as $index => $user){
                if ($user["id"] == $id) {
                    array_splice($users, $index, 1);
                    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
                    sendJSON($users);
                }
            }
        }
        $message = ["message" => "Wrong kind of method!"];
        sendJSON($message, 400);
?>