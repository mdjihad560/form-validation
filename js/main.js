$(function () {
  // Get the form.

  var form = $("#contact-form");

  // Get the messages div.
  var formMessages = $(".form-message");

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData,
      contentType: "application/json",
      dataType: "json",
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $("#contact-form input,#contact-form textarea").val("");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("success");
        $(formMessages).addClass("error");

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            "Oops! An error occured and your message could not be sent."
          );
        }
      });
  });
});

// var formform = $(".php-email-form");

// formform.validate({
//   errorClass: "error fail-alert",
//   validClass: "valid success-alert",
//   rules: {
//     name: {
//       required: true,
//       minlength: 3,
//     },

//     email: {
//       required: true,
//       email: true,
//     },
//   },
//   messages: {
//     name: {
//       minlength: "Name should be at least 3 characters",
//     },

//     email: {
//       email: "The email should be in the format: abc@domain.tld",
//     },
//   },
// });
