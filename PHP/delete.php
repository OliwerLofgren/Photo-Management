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
        if ($user['id'] === $logged_in_id) {
            $index = $key;
            break;
        }
    }

    // If the user is found, remove it from the array
    if ($index !== null) {
        array_splice($users, $index, 1);


        $updatedUsersData = json_encode($users, JSON_PRETTY_PRINT);


        file_put_contents('users.json', $updatedUsersData);

        $response = [
            'message' => 'User deleted successfully'
        ];
        sendJSON($response, 200);
    } else {
        $response = [
            'message' => 'User not found'
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