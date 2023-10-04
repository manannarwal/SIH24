  // JavaScript to handle popup
  const loginPopup = document.getElementById("login-popup");
  const registrationPopup = document.getElementById("registration-popup");
  const openLoginPopupButton = document.getElementById("open-login-popup");
  const openRegistrationPopupButton = document.getElementById("open-registration-popup");
  const closeLoginPopupButton = document.getElementById("close-login-popup");
  const closeRegistrationPopupButton = document.getElementById("close-registration-popup");
  
  // Function to open login popup
  function openLoginPopup() {
    loginPopup.classList.add("show");
  }
  
  // Function to open registration popup
  function openRegistrationPopup() {
    registrationPopup.classList.add("show");
  }
  
  // Function to close login popup
  function closeLoginPopup() {
    loginPopup.classList.remove("show");
  }
  
  // Function to close registration popup
  function closeRegistrationPopup() {
    registrationPopup.classList.remove("show");
  }
  
  openLoginPopupButton.addEventListener("click", openLoginPopup);
  openRegistrationPopupButton.addEventListener("click", openRegistrationPopup);
  closeLoginPopupButton.addEventListener("click", closeLoginPopup);
  closeRegistrationPopupButton.addEventListener("click", closeRegistrationPopup);
  
    $(document).ready(function() {
    $("#open-login-popup").click(function() {
      $("#login-popup").show();
      $("#registration-popup").hide();
    });
  
    $("#open-registration-popup").click(function() {
      $("#login-popup").hide();
      $("#registration-popup").show();
    });
  
    // Close login form when close button is clicked
    $("#close-login-popup").click(function() {
      $("#login-popup").hide();
    });
  
    // Close registration form when close button is clicked
    $("#close-registration-popup").click(function() {
      $("#registration-popup").hide();
    });
  
    // Close the popups when clicking outside of them
    $(document).mouseup(function(e) {
      var loginContainer = $("#login-popup");
      var registrationContainer = $("#registration-popup");
  
      if (
        !loginContainer.is(e.target) &&
        loginContainer.has(e.target).length === 0 &&
        !registrationContainer.is(e.target) &&
        registrationContainer.has(e.target).length === 0
      ) {
        loginContainer.hide();
        registrationContainer.hide();
      }
    });
  });
  