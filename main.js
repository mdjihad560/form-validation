// script.js
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const errorDiv = document.getElementById("error");
    const successDiv = document.getElementById("success");

    errorDiv.textContent = "";
    successDiv.textContent = "";

    // Basic validation
    if (name === "" || email === "" || message === "") {
      errorDiv.textContent = "All fields are required.";
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errorDiv.textContent = "Please enter a valid email.";
      return;
    }

    // Ajax request using Fetch API
    fetch("contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(
        email
      )}&message=${encodeURIComponent(message)}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "success") {
          successDiv.textContent = "Your message has been sent successfully!";
          document.getElementById("contactForm").reset();
        } else {
          errorDiv.textContent = "Failed to send message. Please try again.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errorDiv.textContent = "An error occurred. Please try again.";
      });
  });
