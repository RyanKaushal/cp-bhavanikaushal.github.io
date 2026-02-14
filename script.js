document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     Appointment Form Validation
     =============================== */
  const appointmentForm = document.getElementById("appointmentForm");

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const message = document.getElementById("message").value.trim();
      const status = document.getElementById("formStatus");

      if (name === "" || mobile === "" || message === "") {
        status.textContent = "Please fill all required fields.";
        status.style.color = "red";
        return;
      }

      if (!/^[0-9]{10}$/.test(mobile)) {
        status.textContent = "Please enter a valid 10-digit mobile number.";
        status.style.color = "red";
        return;
      }

      status.textContent = "Thank you. Your query has been submitted successfully.";
      status.style.color = "green";
      this.reset();
    });
  }


  /* ===============================
     Mobile Navbar Toggle
     =============================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    navLinks.classList.remove("active");

    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }


  /* ===============================
     Services → Open Article in Modal
     =============================== */
  document.querySelectorAll(".service-item").forEach(item => {

    item.addEventListener("click", function (e) {
      e.preventDefault();

      const articleDiv = item.querySelector(".service-article");
      if (!articleDiv) return;

      let articleHTML = articleDiv.innerHTML;

      // Remove last paragraph (WhatsApp link)
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = articleHTML;
      const paragraphs = tempDiv.querySelectorAll("p");

      if (paragraphs.length > 0) {
        paragraphs[paragraphs.length - 1].remove();
      }

      articleHTML = tempDiv.innerHTML;

      // Create Modal Overlay
      const modal = document.createElement("div");
      modal.className = "modal active";

      // Modal Content Container
      const modalContent = document.createElement("div");
      modalContent.className = "modal-content";

      // Close Button
      const closeBtn = document.createElement("button");
      closeBtn.className = "close-btn";
      closeBtn.innerHTML = "&times;";

      closeBtn.addEventListener("click", function () {
        document.body.removeChild(modal);
        document.body.style.overflow = "auto";
      });

      // Close when clicking outside modal content
      modal.addEventListener("click", function (event) {
        if (event.target === modal) {
          document.body.removeChild(modal);
          document.body.style.overflow = "auto";
        }
      });

      // Content Wrapper
      const contentWrapper = document.createElement("div");
      contentWrapper.style.padding = "30px";
      contentWrapper.style.maxHeight = "70vh";
      contentWrapper.style.overflowY = "auto";
      contentWrapper.innerHTML = articleHTML;

      // Append Elements
      modalContent.appendChild(closeBtn);
      modalContent.appendChild(contentWrapper);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Prevent background scroll
      document.body.style.overflow = "hidden";
    });

  });


  /* ===============================
     Counter Animation (Stats Section)
     =============================== */
  const counters = document.querySelectorAll(".counter");

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      const increment = target / 200;

      const updateCounter = () => {
        const current = +counter.innerText;

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCounter, 10);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };

      updateCounter();
    });
  };

  // Trigger animation when visible
  const statsSection = document.querySelector(".stats-section");

  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

});
