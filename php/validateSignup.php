<?php

// Establish a database connection
$conn = mysqli_connect("localhost", "root", "", "contemporarycarve");

// Get the user credentials from the POST request
$data = json_decode(file_get_contents("php://input"), true);
$email = $data["user_email"];
$name = $data["user_name"];
$password = $data["user_password"];
$phone = $data["user_phone"];
$address = $data["user_address"];

// Escape the user input to prevent SQL injection
$email = mysqli_real_escape_string($conn, $email);
$name = mysqli_real_escape_string($conn, $name);
$password = mysqli_real_escape_string($conn, $password);
$phone = mysqli_real_escape_string($conn, $phone);
$address = mysqli_real_escape_string($conn, $address);

// Check if a user with the same email already exists
$query = "SELECT * FROM users WHERE user_email = '$email'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    // Return an error response if the email already exists
    $response = array(
        "success" => false,
        "message" => "User with this email already exists"
    );
    echo json_encode($response);
} else {
    // Insert the new user credentials into the database
    $insertQuery = "INSERT INTO users (user_Name, user_Email, user_Password, user_Phone, user_ShipAddress) VALUES ('$name', '$email', '$password', '$phone', '$address')";
    $insertResult = mysqli_query($conn, $insertQuery);

    if ($insertResult) {
        // Return a success response if insertion is successful
        $response = array(
            "success" => true
        );
        echo json_encode($response);
    } else {
        // Return an error response if insertion fails
        $response = array(
            "success" => false,
            "message" => "Error occurred during signup"
        );
        echo json_encode($response);
    }
}

// Close the database connection
mysqli_close($conn);
?>