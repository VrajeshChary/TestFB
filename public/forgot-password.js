document.addEventListener("DOMContentLoaded", function () {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  const securityQuestionForm = document.getElementById("securityQuestionForm");
  const forgotFormContainer = document.querySelector(".forgot-form-container");
  const securityQuestionContainer = document.querySelector(
    ".forgot-security-question"
  );
  const resetSuccessContainer = document.querySelector(".reset-success");
  const backToEmailBtn = document.getElementById("backToEmailBtn");

  // Language translations
  const translations = {
    "English (UK)": {
      findAccount: "Find Your Account",
      enterEmail:
        "Please enter your email address or mobile number to search for your account.",
      emailPlaceholder: "Email address or mobile number",
      cancel: "Cancel",
      search: "Search",
      securityQuestion: "Answer Your Security Question",
      securityText:
        "To secure your account, please answer your security question below.",
      answerPlaceholder: "Your answer",
      back: "Back",
      submit: "Submit",
      resetSent: "Reset Link Sent",
      resetText:
        "We've sent instructions to reset your password to your email address. Please check your inbox.",
      returnToLogin: "Return to Login",
      pageTitle: "Forgotten Password | Facebook",
    },
    "Français (France)": {
      findAccount: "Retrouver Votre Compte",
      enterEmail:
        "Veuillez entrer votre adresse e-mail ou numéro de mobile pour rechercher votre compte.",
      emailPlaceholder: "Adresse e-mail ou mobile",
      cancel: "Annuler",
      search: "Rechercher",
      securityQuestion: "Répondez à Votre Question de Sécurité",
      securityText:
        "Pour sécuriser votre compte, veuillez répondre à votre question de sécurité ci-dessous.",
      answerPlaceholder: "Votre réponse",
      back: "Retour",
      submit: "Soumettre",
      resetSent: "Lien de Réinitialisation Envoyé",
      resetText:
        "Nous avons envoyé des instructions pour réinitialiser votre mot de passe à votre adresse e-mail. Veuillez vérifier votre boîte de réception.",
      returnToLogin: "Retour à la Connexion",
      pageTitle: "Mot de passe oublié | Facebook",
    },
    Español: {
      findAccount: "Encuentra tu cuenta",
      enterEmail:
        "Introduce tu correo electrónico o número de móvil para buscar tu cuenta.",
      emailPlaceholder: "Correo electrónico o número de móvil",
      cancel: "Cancelar",
      search: "Buscar",
      securityQuestion: "Responde a tu pregunta de seguridad",
      securityText:
        "Para proteger tu cuenta, responde a la pregunta de seguridad a continuación.",
      answerPlaceholder: "Tu respuesta",
      back: "Volver",
      submit: "Enviar",
      resetSent: "Enlace de restablecimiento enviado",
      resetText:
        "Hemos enviado instrucciones para restablecer tu contraseña a tu correo electrónico. Por favor, revisa tu bandeja de entrada.",
      returnToLogin: "Volver al inicio de sesión",
      pageTitle: "Contraseña olvidada | Facebook",
    },
    Deutsch: {
      findAccount: "Finde deinen Account",
      enterEmail:
        "Bitte gib deine E-Mail-Adresse oder Handynummer ein, um nach deinem Konto zu suchen.",
      emailPlaceholder: "E-Mail-Adresse oder Handynummer",
      cancel: "Abbrechen",
      search: "Suchen",
      securityQuestion: "Beantworte deine Sicherheitsfrage",
      securityText:
        "Um dein Konto zu sichern, beantworte bitte deine Sicherheitsfrage unten.",
      answerPlaceholder: "Deine Antwort",
      back: "Zurück",
      submit: "Absenden",
      resetSent: "Reset-Link gesendet",
      resetText:
        "Wir haben Anweisungen zum Zurücksetzen deines Passworts an deine E-Mail-Adresse gesendet. Bitte überprüfe deinen Posteingang.",
      returnToLogin: "Zurück zum Login",
      pageTitle: "Passwort vergessen | Facebook",
    },
  };

  // Sample user data (in a real application, this would be fetched from the server)
  const users = [
    {
      email: "test@example.com",
      securityQuestion: "What is your mother's maiden name?",
      securityAnswer: "smith",
    },
    {
      email: "user@example.com",
      securityQuestion: "What was the name of your first pet?",
      securityAnswer: "fluffy",
    },
  ];

  // Handle "Find Your Account" form submission
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim().toLowerCase();

      // Find user with matching email
      const user = users.find((u) => u.email.toLowerCase() === email);

      if (user) {
        // Display security question for the user
        const securityQuestionElement =
          document.getElementById("securityQuestion");
        securityQuestionElement.textContent = user.securityQuestion;

        // Hide email form and show security question form
        forgotFormContainer.style.display = "none";
        securityQuestionContainer.style.display = "block";
      } else {
        // User not found
        alert("No account found with that email address.");
      }
    });
  }

  // Handle "Back" button to return to email form
  if (backToEmailBtn) {
    backToEmailBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Show email form and hide security question form
      forgotFormContainer.style.display = "block";
      securityQuestionContainer.style.display = "none";
    });
  }

  // Handle security question form submission
  if (securityQuestionForm) {
    securityQuestionForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim().toLowerCase();
      const securityAnswer = document
        .getElementById("securityAnswer")
        .value.trim()
        .toLowerCase();

      // Find user with matching email
      const user = users.find((u) => u.email.toLowerCase() === email);

      if (user && user.securityAnswer.toLowerCase() === securityAnswer) {
        // Answer is correct, show success message
        securityQuestionContainer.style.display = "none";
        resetSuccessContainer.style.display = "block";

        // In a real application, this would send a password reset email
        console.log("Password reset link would be sent to:", email);
      } else {
        // Incorrect answer
        alert("Your answer is incorrect. Please try again.");
      }
    });
  }

  // Language switcher functionality
  const languageLinks = document.querySelectorAll(".languages ul li a");
  if (languageLinks.length > 0) {
    languageLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active class from all language links
        languageLinks.forEach((l) => l.classList.remove("active"));

        // Add active class to clicked language link
        this.classList.add("active");

        // Get language from link text
        const language = this.textContent.trim();

        // Update page content based on selected language
        updatePageLanguage(language);

        // Store language preference in localStorage
        localStorage.setItem("preferredLanguage", language);

        // Show a confirmation message
        const languageChangeMessage = document.createElement("div");
        languageChangeMessage.className = "language-change-message";
        languageChangeMessage.textContent = `Language changed to ${language}`;
        document.body.appendChild(languageChangeMessage);

        // Remove the message after 2 seconds
        setTimeout(() => {
          languageChangeMessage.remove();
        }, 2000);
      });
    });

    // Set active language from localStorage if available
    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (storedLanguage) {
      const matchingLink = Array.from(languageLinks).find(
        (link) => link.textContent.trim() === storedLanguage
      );
      if (matchingLink) {
        languageLinks.forEach((l) => l.classList.remove("active"));
        matchingLink.classList.add("active");

        // Update page content based on stored language
        updatePageLanguage(storedLanguage);
      }
    }
  }

  // Function to update page content based on selected language
  function updatePageLanguage(language) {
    // Check if we have translations for this language
    if (translations[language]) {
      const t = translations[language];

      // Update form headings
      const findAccountHeading = document.querySelector(
        ".forgot-form-container .forgot-form-header h2"
      );
      if (findAccountHeading) findAccountHeading.textContent = t.findAccount;

      const securityQuestionHeading = document.querySelector(
        ".forgot-security-question .forgot-form-header h2"
      );
      if (securityQuestionHeading)
        securityQuestionHeading.textContent = t.securityQuestion;

      const resetSentHeading = document.querySelector(
        ".reset-success .forgot-form-header h2"
      );
      if (resetSentHeading) resetSentHeading.textContent = t.resetSent;

      // Update form texts
      const enterEmailText = document.querySelector(
        ".forgot-form-container .forgot-form-body p"
      );
      if (enterEmailText) enterEmailText.textContent = t.enterEmail;

      const securityText = document.querySelector(
        ".forgot-security-question .forgot-form-body p"
      );
      if (securityText) securityText.textContent = t.securityText;

      const resetText = document.querySelector(
        ".reset-success .forgot-form-body p"
      );
      if (resetText) resetText.textContent = t.resetText;

      // Update input placeholders
      const emailInput = document.getElementById("email");
      if (emailInput) emailInput.placeholder = t.emailPlaceholder;

      const securityAnswerInput = document.getElementById("securityAnswer");
      if (securityAnswerInput)
        securityAnswerInput.placeholder = t.answerPlaceholder;

      // Update buttons
      const cancelButton = document.querySelector(".cancel-button");
      if (cancelButton) cancelButton.textContent = t.cancel;

      const searchButton = document.querySelector(".search-button");
      if (searchButton) searchButton.textContent = t.search;

      const backButton = document.querySelector(".back-button");
      if (backButton) backButton.textContent = t.back;

      const submitButton = document.querySelector(".submit-button");
      if (submitButton) submitButton.textContent = t.submit;

      const returnButton = document.querySelector(".return-button");
      if (returnButton) returnButton.textContent = t.returnToLogin;

      // Update page title
      document.title = t.pageTitle;

      console.log(`Language updated to ${language}`);
    } else {
      console.log(`No translations available for ${language}`);
    }
  }
});
