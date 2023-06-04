<?php
// Connect to MySQL database
$conn = mysqli_connect("localhost", "root", "", "contemporarycarve");

// Get the product genre from the AJAX request
$id = $_GET['id'];

// Query the table based on the product genre
$sql = "SELECT * FROM products WHERE product_ID = '$id'";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Add each row to the data array
        $data[] = $row;
    }
}

// Close the database connection
$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>