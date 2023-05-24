<?php
ini_set("display_errors", 1);
require_once("functions.php");

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $logged_in_id = $data['logged_in_id'];
   
    


    $usersData = file_get_contents('../JSON/users.json');

    $users = json_decode($usersData, true);


    $index = null;
    foreach ($users as $key => $user) {
        // Check if the current user's ID matches the logged-in user's ID
        if ($user['id'] === $logged_in_id) {
            // If a match is found, store the index of the user in the array
            $index = $key;
            // Exit the loop since we have found the user
            break;
        }
    }

    // If the user is found, remove it from the array
    if ($index !== null) {
        $user = $users[$index];
        $username = $user['username'];
        $userFolderPath = "../PHP/my_photos/photos_" . $logged_in_id;
        
        array_splice($users, $index, 1);
        
        // Remove the user's folder and its contents
          if (is_dir($userFolderPath)) {
            removeDir($userFolderPath);
          } 
            
            $updatedUsersData = json_encode($users, JSON_PRETTY_PRINT);
            file_put_contents('../JSON/users.json', $updatedUsersData);
        //Add the username here.
            $response = [
            'message' =>  $username .  ' has been deleted successfully'
        ];
        sendJSON($response);
    } else {
        $response = [
            'message' =>  $username . " not found"
        ];
        sendJSON($response, 404);
    }
} else {
    $response = [
        'message' => 'Invalid request method'
    ];
    sendJSON($response, 405);
}

?>