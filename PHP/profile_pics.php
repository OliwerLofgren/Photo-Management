<?php 
    ini_set("display_errors", 1);
    require_once("functions.php");

    $filename = "../JSON/users.json";

    $users = json_decode(file_get_contents($filename), true);

    $request_method = $_SERVER["REQUEST_METHOD"];
    $input_data = json_decode(file_get_contents("php://input"), true);

    if ($request_method == "POST") {
        // This section is for uploading a new profile picture
        if(isset($_FILES["upload"])){
            $tmp_name = $_FILES["upload"]["tmp_name"];
            $name = $_FILES["upload"]["name"];
            
            $allowed_extensions = ["jpg", "jpeg", "png", "gif"];
            $extension = pathinfo($name, PATHINFO_EXTENSION);
    
            if (!in_array(strtolower($extension), $allowed_extensions)) {
                $message = ["message" => "Invalid file type"];
                sendJSON($message, 400);
            }
            

            $user_id = $_POST["logged_in_id"];
            $logged_user_index = null;
            foreach ($users as $index => $user) {
                if ($user["id"] == $user_id) {
                    $logged_user_index = $index;
                    break;
                }
            }

            if ($logged_user_index !== null) {
                $user_folder = "../PHP/my_photos/photos_" . $user_id;
            
                // Create the user-specific folder if it doesn't exist
                if (!file_exists($user_folder)) {
                    mkdir($user_folder, 0777, true);
                }
    
                $destination = $user_folder . "/" . $name;
               
                if (move_uploaded_file($tmp_name, $destination)) {
                    $logged_user = $users[$logged_user_index];
                    $new_photo = [
                        "photo" => $destination
                    ];

                    // Check if the user already has a profile picture
                    if (isset($logged_user["profile_pictures"]) && !empty($logged_user["profile_pictures"])) {
                        // Replace the existing profile picture
                        $logged_user["profile_pictures"][0] = $new_photo;
                    } else {
                        // Add the new profile picture
                        $logged_user["profile_pictures"][] = $new_photo;
                    }

                    $users[$logged_user_index] = $logged_user;

                    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
                    $photo_url = $new_photo["photo"];
                    sendJSON($photo_url);
                } else {
                    $message = ["message" => "Unable to upload file!"];
                    sendJSON($message, 400);
                }
            }

            } else {
                $message = ["message" => "User not found"];
                sendJSON($message, 404);
            }
            
            

    }

    $message = ["message" => "Wrong kind of method!"];
    sendJSON($message, 400);
?>