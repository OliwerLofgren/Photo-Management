    <?php 
    ini_set("display_errors", 1);
    require_once("functions.php");
   
    $filename = "../JSON/users.json";
   
    $users = json_decode(file_get_contents($filename), true);
   
    $request_method = $_SERVER["REQUEST_METHOD"];
    $input_data = json_decode(file_get_contents("php://input"), true);

    ?>

    <?php 
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

    <?php 
    //This section is to edit your profile info
    //Patch or Put??
    //You need to add a key for the database and call it info
    if($request_method == "PATCH"){
        $info = $input_data["info"];
        foreach($users as $user){
            if($user["info"] == $info){
                $user[] = $input_data;
                sendJSON($user);
            }
        }
    }
    $message = ["message" => "Wrong kind of method!"];
    sendJSON($message, 400);
    ?>

    <?php 
    //This section is for uploading new images
    $photos = [];

    if(isset($_FILES["test"])){
    $source = $_FILES["test"]["tmp_name"];
    $destination = "uploads/" . $_FILES["test"]["name"];

    if (move_uploaded_file($source, $destination)) {
       $photos[] = ["src" => $destination];
       sendJSON($photos);
    }else{
        echo "There are no files";
    }
    }
    ?> 