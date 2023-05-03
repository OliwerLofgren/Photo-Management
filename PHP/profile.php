    <?php 
    ini_set("display_errors", 1);
    require_once("functions.php");
   
    $filename = "../JSON/users.json";
   
    $users = json_decode(file_get_contents($filename), true);
   
    $request_method = $_SERVER["REQUEST_METHOD"];
    $input_data = json_decode(file_get_contents("php://input"), true);

    ?>

    

    <?php 
    //This section is for uploading new images
    if ($request_method == "POST") {
        $photo_database = "../JSON/photos.json";
        $photos = [];
        $photos = json_decode(file_get_contents($photo_database), true);
    
        if(isset($_FILES["upload"])){
        $source = $_FILES["upload"]["tmp_name"];
        $destination = "../my_photos/" . $_FILES["upload"]["name"];
    
        if (move_uploaded_file($source, $destination)) {
            $photos[] = ["src" => $destination];
            file_put_contents($photo_database, json_encode($photos, JSON_PRETTY_PRINT));
            
            foreach ($photos as $photo) {
                    $src = $photo["src"];
                    echo "<img src='$src'>";
                }
                sendJSON($photos);
       
        }else{
            $message = ["message" => "Unable to upload file!"];
            sendJSON($message, 400);
        }
        }
    }
    // $message = ["message" => "Wrong kind of method!"];
    // sendJSON($message, 400);
    ?> 
    