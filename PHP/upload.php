<?php 
    ini_set("display_errors", 1);
    require_once("functions.php");
   
    $filename = "../JSON/users.json";
   
    $users = json_decode(file_get_contents($filename), true);
   
    $request_method = $_SERVER["REQUEST_METHOD"];
    $input_data = json_decode(file_get_contents("php://input"), true);

    
    if ($request_method == "POST") {
        //This section is for uploading new images
        if(isset($_FILES["upload"])){
            $tmp_name = $_FILES["upload"]["tmp_name"];
            $name = $_FILES["upload"]["name"];
            
            $allowed_extensions = ["jpg", "jpeg", "png", "gif"];
            $extension = pathinfo($name, PATHINFO_EXTENSION);
    
    
        if (!in_array(strtolower($extension), $allowed_extensions)) {
            $message = ["message" => "Invalid file type"];
            sendJSON($message, 400);
        }
        
        $destination = "../PHP/my_photos/" . $name;
        
        if (move_uploaded_file($tmp_name, $destination)) {
            $photo_id = count($users[0]["uploaded_photos"]) + 1;
            $new_photo = [
                "photo_id" => $photo_id,
                "photo" => rtrim($destination, "/")
            ];
            $users[0]["uploaded_photos"][] = $new_photo;

          
            file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
            sendJSON($users);
       
        }else{
            $message = ["message" => "Unable to upload file!"];
            sendJSON($message, 400);
        }
        }

    }
        $message = ["message" => "Wrong kind of method!"];
        sendJSON($message, 400);
    ?>

    

 
    