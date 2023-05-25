<?php
ini_set("display_errors", 1);
require_once("functions.php");

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    //Get the current logged_in_id 
    $logged_in_id = $data['logged_in_id'];




    $usersData = file_get_contents('../JSON/users.json');

    //decodes the user data JSON into a PHP array of users
    $users = json_decode($usersData, true);

    //This will be used to store the index of the user to be deleted
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

    if ($index !== null) {
        $user = $users[$index];
        $username = $user['username'];
        //Foldermap for the user who is logged in
        $userFolderPath = "../PHP/my_photos/photos_" . $logged_in_id;

        // Remove the user's folder and its contents
        if (is_dir($userFolderPath)) {
            removeDir($userFolderPath);
        }
        // If the user is found, remove it from the array
        array_splice($users, $index, 1);


        $updatedUsersData = json_encode($users, JSON_PRETTY_PRINT);
        file_put_contents('../JSON/users.json', $updatedUsersData);

        $response = [
            'message' => $username . ' has been deleted successfully'
        ];

        sendJSON($response);
    } else {

        $response = [
            'message' => $username . " not found"
        ];

        sendJSON($response, 404);
    }

} else {

    $response = [
        'message' => 'Wrong kind of method'
    ];

    sendJSON($response, 405);
}

?>