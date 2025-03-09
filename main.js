document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch("netlify.app/mail.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      if (data.trim() === "success") {
        form.reset();
        document.querySelector(".success").style.display = "block";
        document.querySelector(".error").style.display = "none";
      } else {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".success").style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.querySelector(".error").style.display = "block";
      document.querySelector(".success").style.display = "none";
    });
});
