

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggle");
  
  const navbar = document.querySelector(".navbar");
  if (!toggle || !navbar) return;

  function setMenu(open) {
      toggle.classList.toggle("on", open);
      navbar.style.display = open ? "block" : "none";
      // stop the page behind the full-screen menu from scrolling
      document.documentElement.classList.toggle("menu-open", open);
  }

  toggle.addEventListener("click", function () {
      setMenu(navbar.style.display !== "block");
  });

  navbar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
  });

  // back on a wide screen the menu is always visible, so drop the mobile state
  window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && toggle.classList.contains("on")) {
          setMenu(false);
          navbar.style.display = "";
      }
  });
});

if (window.emailjs) {
    emailjs.init("X4WNWymq0WAwa9wvX"); // Replace with your Public Key
}

// Form Submit Handler
const contactForm = document.getElementById("contact-form");
if (contactForm) contactForm.addEventListener("submit", function(event) {
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
            if (!window.particlesJS || !document.getElementById('particles-js')) return;
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
                        "value": "#4fd89b"
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
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#5b7fb8",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
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


const aboutContainer = document.querySelector('.about-container');
if (aboutContainer) aboutContainer.classList.add('fade-in');

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






// Projects: "View more" toggles the project details
document.querySelectorAll('.work-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const item = btn.closest('.work-item');
        const open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
        btn.querySelector('.work-more-label').textContent = open ? 'View less' : 'View more';
    });
});

// The whole project row opens it too (except the "Live" link, which opens the site)
document.querySelectorAll('.work-row').forEach(function (row) {
    row.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return;
        row.querySelector('.work-toggle').click();
    });
});


// Footer: size the big name so it exactly fills the footer card width
function fitFooterWord() {
    const word = document.querySelector('.footer-word');
    if (!word) return;
    word.style.fontSize = '100px';
    word.style.width = 'max-content';
    const needed = word.getBoundingClientRect().width;
    word.style.width = '';
    const available = word.clientWidth;
    if (needed > 0 && available > 0) word.style.fontSize = Math.floor(100 * available / needed * 0.98) + 'px';
}
fitFooterWord();
window.addEventListener('resize', fitFooterWord);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitFooterWord);


// Logo: make "TechAbhi" exactly as wide as the "From concepts to code" tagline
function fitBrandName() {
    const name = document.querySelector('.brand-name');
    const tag = document.querySelector('.brand-tag');
    if (!name || !tag) return;
    name.style.fontSize = '';
    const base = parseFloat(getComputedStyle(name).fontSize);
    const nameWidth = name.getBoundingClientRect().width;
    const tagWidth = tag.getBoundingClientRect().width;
    if (nameWidth > 0 && tagWidth > 0) name.style.fontSize = (base * tagWidth / nameWidth) + 'px';
}
fitBrandName();
window.addEventListener('resize', fitBrandName);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBrandName);


// In-page links (e.g. hero "View projects") scroll smoothly.
// Done in JS on purpose: CSS scroll-behavior: smooth breaks GSAP ScrollTrigger measurements.
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    });
});


// Footer copyright year stays current
document.querySelectorAll('.year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
});
