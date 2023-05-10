    <?php 
    ini_set("display_errors", 1);
    require_once("functions.php");
   
    $filename = "../JSON/users.json";
   
    $users = json_decode(file_get_contents($filename), true);
   
    $request_method = $_SERVER["REQUEST_METHOD"];
    $input_data = json_decode(file_get_contents("php://input"), true);

    
    if ($request_method == "POST") {
        //This section is for Collect
        $id = $input_data["id"];
        $obj = $input_data["photoObject"];
        $liked = $input_data["liked"];
       
        
        
        if ($id == null && $obj == null && $liked == null && $likes_count == null) {
            $message = ["message" => "Array is null!"];
            sendJSON($message, 400);
        }
        if ($id == "" && $obj == "" && $liked == "" && $likes_count == "") {
            $message = ["message" => "Array is empty!"];
            sendJSON($message, 400);
        }
        
        $new_data = [
            "id" => $id,
            "photoObject" => $obj,
            "liked" => $liked,
           
        ];
        $users[0]["saved_photos"][] = $new_data;
        file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
        sendJSON($new_data);
        
        
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
          
            $photos[] = ["src" => rtrim($destination, "/")];
            $users[0]["uploaded_photos"][] = $photos;
          
            file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
            sendJSON($photos);
       
        }else{
            $message = ["message" => "Unable to upload file!"];
            sendJSON($message, 400);
        }
        }

    }
    //This section is for update content
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
    // $message = ["message" => "Wrong kind of method!"];
    // sendJSON($message, 400);
    
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
        // $message = ["message" => "Wrong kind of method!"];
        // sendJSON($message, 400);
    ?>

    

 
    