document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const fields = [
    { input: document.querySelector("#full-name"), error: document.querySelector("#name-error"), label: "Full name" },
    { input: document.querySelector("#email"), error: document.querySelector("#email-error"), label: "Email address" },
    { input: document.querySelector("#country"), error: document.querySelector("#country-error"), label: "Country" },
    { input: document.querySelector("#comments"), error: document.querySelector("#comments-error"), label: "Comments" }
  ];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    fields.forEach(({ input, error, label }) => {
      const value = input.value.trim();
      let message = "";

      if (!value) {
        message = `${label} is required.`;
      } else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = "Enter a valid email address.";
      }

      error.textContent = message;
      input.setAttribute("aria-invalid", String(Boolean(message)));
      if (message) isValid = false;
    });

    if (isValid) {
      alert("Your form was submitted successfully. Thank you for reaching out!");
      form.reset();
      fields.forEach(({ input }) => input.removeAttribute("aria-invalid"));
    } else {
      const firstInvalid = fields.find(({ input }) => input.getAttribute("aria-invalid") === "true");
      firstInvalid?.input.focus();
    }
  });

  fields.forEach(({ input, error }) => {
    input.addEventListener("input", () => {
      if (input.value.trim()) {
        error.textContent = "";
        input.removeAttribute("aria-invalid");
      }
    });
  });
});
