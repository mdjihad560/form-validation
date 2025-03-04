const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(contactForm);

  fetch("../php/contact.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("response").innerHTML = data;
      contactForm.reset();
    })
    .catch((error) => {
      document.getElementById("response").innerHTML =
        "An error occurred. Please try again.";
      console.error("Error:", error);
    });
});
