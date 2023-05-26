<?php 
ini_set("display_errors", 1);
require_once("functions.php");

$filename = "JSON/users.json";
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
            
        // Check if the file is allowed or not 
        if (!in_array(strtolower($extension), $allowed_extensions)) {
            $message = ["message" => "Invalid file type"];
            sendJSON($message, 400);
            }
        
        //This is the ID for the user who is logged in    
        $user_id = $_POST["logged_in_id"];
        // Initialize the variable to store the index of the logged-in user
        $logged_user_index = null;
        // Loop through the users array to find the logged-in user
        foreach ($users as $index => $user) {
        // Check if the user's ID matches the logged-in user ID    
        if ($user["id"] == $user_id) {
            // Store the index of the logged-in user
            $logged_user_index = $index;
            // Exit the loop since the user is found
            break;
            }
        }
        if ($logged_user_index !== null) {
            //This is the path for user's folder where the file will be stored.
            $user_folder = "../Photo-Management/PHP/my_photos/photos_" . $user_id;
            // Create the user-specific folder if it doesn't exist
            if (!file_exists($user_folder)) {
                 mkdir($user_folder, 0777, true);
            }
    
        $destination = $user_folder . "/" . $name;
        
        //This condition checks if the uploaded file was successfully moved to the destination.    
        if (move_uploaded_file($tmp_name, $destination)) {
            $logged_user = $users[$logged_user_index];
            // Check if the user already has a profile picture
            if ($logged_user["profile_picture"] !== "") {
                //Any previously existing profile picture for the user is deleted before replacing it with the new picture.
                unlink($logged_user["profile_picture"]);
            }
            //Updates the value with desitnation variable
            $logged_user["profile_picture"] = $destination;
            //Replaces the old user object with the updated user that now includes the new profile_picture value.
            $users[$logged_user_index] = $logged_user;
            
            //Parses the changes to our JSON
            file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
            $photo_url = $destination;
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
    sendJSON($message, 405);

?>