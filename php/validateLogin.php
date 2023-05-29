<?php

// Establish a database connection
$conn = mysqli_connect("localhost", "root", "", "contemporarycarve");

// Get the user credentials from the POST request
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["user_email"];
$password = $data["user_password"];

// Escape the user inputs to prevent SQL injection
$email = mysqli_real_escape_string($conn, $email);
$password = mysqli_real_escape_string($conn, $password);

// Query the database to check if the user exists with the given credentials
$query = "SELECT * FROM users WHERE user_email = '$email' AND user_password = '$password'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    // Generate a session token
    $sessionToken = bin2hex(random_bytes(16));

    // Store the session token in the PHP session
    session_start();
    $_SESSION["sessionToken"] = $sessionToken;

    // Return the session token as a response
    $response = array(
        "success" => true,
        "token" => $sessionToken
    );
    echo json_encode($response);
} else {
    // Return an error response if the user does not exist
    $response = array(
        "success" => false,
        "message" => "Incorrect username or password"
    );
    echo json_encode($response);
}

// Close the database connection
mysqli_close($conn);
?>