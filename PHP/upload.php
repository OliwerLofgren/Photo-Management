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
            $user_id = $_POST["logged_in_id"];
            $logged_user_index = null;
            foreach ($users as $index => $user) {
                if ($user["id"] == $user_id) {
                    $logged_user_index = $index;
                    break;
                }
            }
          
            if ($logged_user_index !== null) {
                $destination = "../PHP/my_photos/" . $name;
                
                if (move_uploaded_file($tmp_name, $destination)) {
                    $logged_user = $users[$logged_user_index];
                    $photo_id = count($logged_user["uploaded_photos"]) + 1;
                    $new_photo = [
                        "photo_id" => $photo_id,
                        "photo" => $destination
                    ];
                    $logged_user["uploaded_photos"][] = $new_photo;
                    $users[$logged_user_index] = $logged_user;
    
                
                    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
                    sendJSON($users);
            
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
            sendJSON($message, 400);
        ?>

        

    
        