<?php 
ini_set("display_errors", 1);
require_once("functions.php");
    
$filename = "../JSON/users.json";
$users = json_decode(file_get_contents($filename), true);
$request_method = $_SERVER["REQUEST_METHOD"];
$input_data = json_decode(file_get_contents("php://input"), true);

//This section is for uploading new images
if ($request_method == "POST") {
    // Check if the "upload" field is set in the request
    if(isset($_FILES["upload"])){
         // Get the temporary location of the uploaded file
        $tmp_name = $_FILES["upload"]["tmp_name"];
         // Get the name of the uploaded file
        $name = $_FILES["upload"]["name"];
        $allowed_extensions = ["jpg", "jpeg", "png", "gif"];
        $extension = pathinfo($name, PATHINFO_EXTENSION);
        // Check if the file is allowed or not    
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
        // Set the destination path for the uploaded file, combining the user folder and the file name    
        $destination = $user_folder . "/" . $name;
        // Move the uploaded file from the temporary location to the destination path
        if (move_uploaded_file($tmp_name, $destination)) {
            // Get the logged-in user from the array of users
            $logged_user = $users[$logged_user_index];
            // Calculate the photo ID by incrementing the count of uploaded photos by 1
            $photo_id = count($logged_user["uploaded_photos"]) + 1;
            // Create a new photo entry with the photo ID and the destination path
            $new_photo = [
                "photo_id" => $photo_id,
                "photo" => $destination
            ];
            // Add the new photo to the array of uploaded photos for the logged-in user
            $logged_user["uploaded_photos"][] = $new_photo;
            // Update the user's entry in the array of users with the updated uploaded photos
            $users[$logged_user_index] = $logged_user;
            // Write the updated array of users to the file in JSON format
            file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
            sendJSON($new_photo);
            
        }else{

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

        

    
        