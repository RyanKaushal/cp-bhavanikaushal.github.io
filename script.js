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
     Mobile Navbar Toggle (FIXED)
     =============================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    // 🔑 FORCE MENU CLOSED ON LOAD
    navLinks.classList.remove("active");

    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    // Optional: close menu when link is clicked (recommended)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  /* ===============================
 Services → Open Article in Modal Iframe
============================== */
document.querySelectorAll(".service-item").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    // Get the article content from the hidden div
    const articleDiv = item.querySelector(".service-article");
    if (!articleDiv) return; // No article, skip

    let articleHTML = articleDiv.innerHTML; // Get the article's HTML

    // Remove the last <p> (WhatsApp link) from the article
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = articleHTML;
    const paragraphs = tempDiv.querySelectorAll("p");
    if (paragraphs.length > 0) {
      paragraphs[paragraphs.length - 1].remove(); // Remove the last paragraph (WhatsApp link)
    }
    articleHTML = tempDiv.innerHTML; // Updated HTML without the link

    // Create modal elements
    const modal = document.createElement("div");
    modal.className = "modal active";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = "&times;"; // X symbol
    closeBtn.addEventListener("click", () => {
      modal.remove(); // Close modal
    });

    const iframe = document.createElement("iframe");
    iframe.className = "modal-iframe";
    // Load article into iframe with a button at the bottom
    iframe.srcdoc = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 1rem; line-height: 1.5; color: #333; }
            a { color: #2c7be5; }
            .btn { padding: 0.7rem 1.4rem; border-radius: 30px; text-decoration: none; font-size: 0.9rem; cursor: pointer; border: none; display: inline-block; }
            .secondary { background: #2dbf6c; color: #fff; }
            .modal-whatsapp-btn { margin-top: 1rem; display: block; width: 100%; text-align: center; }
          </style>
        </head>
        <body>
          ${articleHTML}
          <div class="modal-whatsapp-btn">
            <button class="btn secondary" onclick="window.open('https://wa.me/917017784451?text=Hello%20Doctor%2C%20I%20would%20like%20to%20consult%20regarding%20${item.getAttribute('data-issue')}.%20Please%20let%20me%20know%20the%20available%20appointment%20timings.', '_blank'); window.parent.postMessage('closeModal', '*');">Contact on WhatsApp</button>
          </div>
        </body>
      </html>
    `;

    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(iframe);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Listen for message to close modal
    const messageHandler = (event) => {
      if (event.data === 'closeModal') {
        modal.remove();
        window.removeEventListener('message', messageHandler);
      }
    };
    window.addEventListener('message', messageHandler);

    // Close modal on background click
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.remove();
        window.removeEventListener('message', messageHandler);
      }
    });
  });
});
   /* ===============================
   Stats Counter Animation
   =============================== */

const counters = document.querySelectorAll(".counter");

const startCounting = () => {
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute("data-target"));
    let count = 0;

    const updateCount = () => {
      const increment = Math.ceil(target / 100);

      if (count < target) {
        count += increment;
        counter.innerText = count;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  });
};

const statsSection = document.querySelector(".stats-section");

if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting();
        observer.unobserve(statsSection); // run once only
      }
    });
  });

  observer.observe(statsSection);
}


});



