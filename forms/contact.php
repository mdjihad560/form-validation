<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $subject = trim($_POST["subject"]);
        $message = trim($_POST["message"]);

        // http_response_code(400);
        // echo $_POST['message']; exit;

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($subject) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "jihadkhan07@gmail.com";

        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content = "First Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Subject: $subject\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        header('Content-type: application/json');
        $response = array();

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            $response_array['status'] = 'success';
            $response_array['message'] = "Thank You! Your message has been sent.";
            header('Content-type: application/json');
            echo json_encode($response_array);
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            $response_array['status'] = 'error';
            $response_array['message'] = "Oops! Something went wrong and we couldn't send your message.";
            header('Content-type: application/json');
            echo json_encode($response_array);
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        $response_array['status'] = 'error';
        $response_array['message'] = "There was a problem with your submission, please try again.";
        header('Content-type: application/json');
        echo json_encode($response_array);
    }

?>