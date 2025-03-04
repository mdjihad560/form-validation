$(document).ready(function () {
  $("#contactForm").submit(function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Capture form data
    const formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      message: $("#message").val(),
    };

    // Ajax request
    $.ajax({
      type: "POST",
      url: "contact.php", // PHP file for handling form data
      data: formData,
      dataType: "json",
      success: function (response) {
        if (response.success) {
          $("#formResponse")
            .text("Message sent successfully!")
            .css("color", "green");
          $("#contactForm")[0].reset(); // Clear form on success
        } else {
          $("#formResponse")
            .text("Failed to send message.")
            .css("color", "red");
        }
      },
      error: function () {
        $("#formResponse")
          .text("An error occurred. Please try again.")
          .css("color", "red");
      },
    });
  });
});
