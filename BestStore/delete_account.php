<?php
session_start();
include 'tools/db.php';

if (isset($_SESSION['id'])) {
    $id = $_SESSION['id'];
    $dbConnection = getDatabaseConnection();
    
    // Delete user from the database
    $stmt = $dbConnection->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    // Destroy session and redirect to the homepage
    session_unset();
    session_destroy();
    header("Location: /index.php");
    exit();
}
?>
