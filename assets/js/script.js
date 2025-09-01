

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});



document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggle");
  const navbar = document.querySelector(".navbar");

  toggle.addEventListener("click", function () {
      // Toggle the 'on' class for the button
      this.classList.toggle("on");

      // Slide toggle the navbar
      if (navbar.style.display === "block") {
          navbar.style.display = "none";
      } else {
          navbar.style.display = "block";
      }
  });
});

(function() {
    emailjs.init("X4WNWymq0WAwa9wvX"); // Replace with your Public Key
})();

// Form Submit Handler
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const serviceID = "service_rqed2jj";  // Replace with your Service ID
    const templateID = "template_o3hnuke"; // Replace with your Template ID

    // Collecting form data
    const templateParams = {
        user_name: document.getElementById("name").value,
        user_email: document.getElementById("email").value,
        user_phno: document.getElementById("phno").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    // Sending email using EmailJS
    emailjs.send(serviceID, templateID, templateParams)
        .then(response => {
            alert("Email Sent Successfully!");
            console.log("SUCCESS!", response.status, response.text);
            document.getElementById("contact-form").reset();
        })
        .catch(error => {
            alert("Failed to Send Email.");
            console.error("FAILED...", error);
        });
});


// Particles 

document.addEventListener('DOMContentLoaded', function() {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 3,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 3,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#3a7bd5",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 3,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        });


  // expirience


  function filterExperience() {
    const value = document.getElementById("filter").value;
    const cards = document.querySelectorAll(".experience-card");
  
    cards.forEach(card => {
      const year = card.dataset.year;
      const role = card.dataset.role;
  
      if (value === "all" || value === year || value === role) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  

 // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        // Simple fade-in animation for the container
        document.querySelector('.about-container').classList.add('fade-in');



document.addEventListener('DOMContentLoaded', function() {
            const serviceCards = document.querySelectorAll('.service-card');
            
            function checkVisibility() {
                serviceCards.forEach(card => {
                    const cardTop = card.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (cardTop < windowHeight - 100) {
                        const delay = parseInt(card.getAttribute('data-delay'));
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, delay);
                    }
                });
            }
            
            // Initial check
            checkVisibility();
            
            // Check on scroll
            window.addEventListener('scroll', checkVisibility);
        });



// Services
document.addEventListener('DOMContentLoaded', function() {
            const serviceCards = document.querySelectorAll('.service-card');
            
            function checkVisibility() {
                serviceCards.forEach(card => {
                    const cardTop = card.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (cardTop < windowHeight - 100) {
                        const delay = parseInt(card.getAttribute('data-delay'));
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, delay);
                    }
                });
            }
            
            // Initial check
            checkVisibility();
            
            // Check on scroll
            window.addEventListener('scroll', checkVisibility);
        });




