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
       
        
        
        if ($id == null && $obj == null && $liked == null) {
            $message = ["message" => "Array is null!"];
            sendJSON($message, 400);
        }
        if ($id == "" && $obj == "" && $liked == "") {
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

    }
        // $message = ["message" => "Wrong kind of method!"];
        // sendJSON($message, 400);
    ?>

    

 
    