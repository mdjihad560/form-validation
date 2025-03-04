<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $message = trim($_POST["message"] ?? "");

    if ($name && $email && $message && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Simulate sending email (you can replace this with actual mail() function)
        echo "success";
    } else {
        echo "error";
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
}
