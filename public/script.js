document.addEventListener("DOMContentLoaded", function () {
  // References to elements
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const createAccountBtn = document.getElementById("createAccountBtn");
  const registrationModal = document.getElementById("registrationModal");
  const closeBtn = document.querySelector(".close");

  // Date of birth dropdowns
  const daySelect = document.getElementById("day");
  const monthSelect = document.getElementById("month");
  const yearSelect = document.getElementById("year");

  // Populate date of birth dropdowns
  populateDays();
  populateMonths();
  populateYears();

  // Event listener for login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Simple validation
      if (!email || !password) {
        alert("Please enter both email and password");
        return;
      }

      // Send login request to the server
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error || "Something went wrong");
            });
          }
          return response.json();
        })
        .then((data) => {
          alert("Login successful");
          console.log("Login successful:", data);
          // Redirect or update UI as needed
        })
        .catch((error) => {
          alert(error.message);
          console.error("Login failed:", error);
        });
    });
  }

  // Event listener for register form submission
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const day = daySelect.value;
      const month = monthSelect.value;
      const year = yearSelect.value;
      const gender = document.querySelector(
        'input[name="gender"]:checked'
      )?.value;

      // Simple validation
      if (!firstName || !lastName || !email || !password) {
        alert("Please fill in all required fields");
        return;
      }

      if (!gender) {
        alert("Please select a gender");
        return;
      }

      const name = `${firstName} ${lastName}`;
      const birthdate = `${year}-${month}-${day}`;

      // Send registration request to the server
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error || "Something went wrong");
            });
          }
          return response.json();
        })
        .then((data) => {
          alert("Registration successful");
          console.log("Registration successful:", data);
          hideModal();
          // Redirect or update UI as needed
        })
        .catch((error) => {
          alert(error.message);
          console.error("Registration failed:", error);
        });
    });
  }

  // Event listener for opening the registration modal
  if (createAccountBtn) {
    createAccountBtn.addEventListener("click", function () {
      showModal();
    });
  }

  // Event listener for closing the registration modal
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      hideModal();
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === registrationModal) {
      hideModal();
    }
  });

  // Function to show the modal
  function showModal() {
    if (registrationModal) {
      registrationModal.style.display = "block";
    }
  }

  // Function to hide the modal
  function hideModal() {
    if (registrationModal) {
      registrationModal.style.display = "none";
    }
  }

  // Function to populate the days dropdown
  function populateDays() {
    if (!daySelect) return;

    for (let i = 1; i <= 31; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      daySelect.appendChild(option);
    }
    // Set default to current day
    daySelect.value = new Date().getDate();
  }

  // Function to populate the months dropdown
  function populateMonths() {
    if (!monthSelect) return;

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let i = 0; i < months.length; i++) {
      const option = document.createElement("option");
      option.value = i + 1;
      option.text = months[i];
      monthSelect.appendChild(option);
    }
    // Set default to current month
    monthSelect.value = new Date().getMonth() + 1;
  }

  // Function to populate the years dropdown
  function populateYears() {
    if (!yearSelect) return;

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      yearSelect.appendChild(option);
    }
    // Set default to current year
    yearSelect.value = currentYear;
  }

  // Language translations
  const translations = {
    "English (UK)": {
      loginButton: "Log In",
      forgotPassword: "Forgotten password?",
      createAccount: "Create New Account",
      createPage: "Create a Page",
      createPageText: "for a celebrity, brand or business.",
      welcomeText:
        "Facebook helps you connect and share with the people in your life.",
    },
    "Français (France)": {
      loginButton: "Connexion",
      forgotPassword: "Mot de passe oublié ?",
      createAccount: "Créer un compte",
      createPage: "Créer une Page",
      createPageText: "pour une célébrité, une marque ou une entreprise.",
      welcomeText:
        "Facebook vous permet de rester en contact et d'échanger avec les personnes qui font partie de votre vie.",
    },
    Español: {
      loginButton: "Iniciar sesión",
      forgotPassword: "¿Has olvidado la contraseña?",
      createAccount: "Crear cuenta nueva",
      createPage: "Crear una página",
      createPageText: "para una celebridad, una marca o un negocio.",
      welcomeText:
        "Facebook te ayuda a comunicarte y compartir con las personas que forman parte de tu vida.",
    },
    Deutsch: {
      loginButton: "Anmelden",
      forgotPassword: "Passwort vergessen?",
      createAccount: "Neues Konto erstellen",
      createPage: "Erstelle eine Seite",
      createPageText: "für eine Berühmtheit, eine Marke oder ein Unternehmen.",
      welcomeText:
        "Facebook hilft dir, mit den Menschen in deinem Leben in Verbindung zu bleiben und Inhalte zu teilen.",
    },
  };

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

      // Update login button
      const loginButton = document.querySelector(".login-button");
      if (loginButton) loginButton.textContent = t.loginButton;

      // Update forgot password link
      const forgotPassword = document.querySelector(".forgot-password a");
      if (forgotPassword) forgotPassword.textContent = t.forgotPassword;

      // Update create account button
      const createAccountBtn = document.getElementById("createAccountBtn");
      if (createAccountBtn) createAccountBtn.textContent = t.createAccount;

      // Update create page text
      const createPageLink = document.querySelector(".create-page a");
      const createPageText = document.querySelector(".create-page p");
      if (createPageLink && createPageText) {
        createPageLink.innerHTML = `<strong>${t.createPage}</strong>`;
        createPageText.innerHTML = `<a href="#"><strong>${t.createPage}</strong></a> ${t.createPageText}`;
      }

      // Update welcome text
      const welcomeText = document.querySelector(".left-section h2");
      if (welcomeText) welcomeText.textContent = t.welcomeText;

      // Update document title with language
      if (language !== "English (UK)") {
        document.title = `Facebook - ${t.loginButton}`;
      } else {
        document.title = "Facebook - log in or sign up";
      }

      console.log(`Language updated to ${language}`);
    } else {
      console.log(`No translations available for ${language}`);
    }
  }
});
