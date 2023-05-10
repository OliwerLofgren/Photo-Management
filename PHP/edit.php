<?php
ini_set("display_errors", 1);
require_once("functions.php");

  // This section is for update content
  if ($request_method == "PATCH") {
    foreach($users as $user){
        if($user[0]["saved_photos"]["id"] == $input_data["id"]){
            $new_data = [
                "id" => $input_data["id"],
                "liked" => $input_data["liked"],
            ];
        }
        sendJSON($new_data);
    }
}
$message = ["message" => "Wrong kind of method!"];
sendJSON($message, 400);


?>