var tl = gsap.timeline();

var menubutton = document.querySelector("#menuicon");
menubutton.addEventListener("click", function () {
  tl.to("#full", {
    display:"block",
    right: "0",
    duration: 0.7,
  });
  tl.to("#nav i", {
    opacity: 0,
  });
  tl.from("#full h4", {
    x: 500,
    duration: 0.7,
    opacity: 0,
    stagger: 0.2, //ek ek karke aayengi cheeze
  });
  tl.from("#full i", {
    opacity: 0,
  });
});

var closebutton = document.querySelector("#closeicon");
closebutton.addEventListener("click", function () {
  tl.to("#full", {
    right: "-40%",
    duration: 0.7,
    display:"none"
  });
  tl.to("#nav i", {
    opacity: 1,
  });
});

var left_side = document.querySelectorAll(".left-side h1 .word");
var right_side = document.querySelectorAll(".right-side h1, h2, h3");
gsap.from(left_side, {
  y: -50,
  opacity: 0,
  duration: 1.5,
  stagger: 0.2,
  delay: 0.4,
});

gsap.from(right_side, {
  y: -50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  delay: 0.8,
});

// card 3 button
document.getElementById('prev-slide').addEventListener('click', function () {
  const radios = document.getElementsByName('slider');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radios[(i - 1 + radios.length) % radios.length].checked = true;
      break;
    }
  }
});

document.getElementById('next-slide').addEventListener('click', function () {
  const radios = document.getElementsByName('slider');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radios[(i + 1) % radios.length].checked = true;
      break;
    }
  }
});


//Chatbot Script

document.addEventListener("DOMContentLoaded", function () {
  var chatbotButton = document.querySelector("#chatbot-button");
  var chatbotContainer = document.querySelector("#chatbot-container");

  chatbotButton.addEventListener("click", function () {
      if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
          chatbotContainer.style.display = 'block';
      } else {
          chatbotContainer.style.display = 'none';
      }
  });
});