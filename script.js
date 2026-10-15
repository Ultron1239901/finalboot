document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. ANNOUNCEMENT DATA
  // ==========================================

  const announcements = [
    {
      id: 1,
      title: "AI Hackathon 2026",
      category: "Events",
      icon: "🤖",
      description:
        "Have an innovative AI idea? Build a solution, collaborate with other students, and showcase your creativity at our sample AI hackathon.",
      location: "Campus Auditorium",
      date: "November 5, 2026",
      likes: 24
    },
    {
      id: 2,
      title: "Web Development Workshop",
      category: "Workshops",
      icon: "💻",
      description:
        "Learn the fundamentals of modern web development, including HTML, CSS, JavaScript, and responsive website design.",
      location: "Computer Lab",
      date: "October 22, 2026",
      likes: 18
    },
    {
      id: 3,
      title: "Placement Preparation Session",
      category: "Placements",
      icon: "🎯",
      description:
        "Practice aptitude, coding fundamentals, resume preparation, and interview strategies for campus recruitment.",
      location: "Seminar Hall",
      date: "October 28, 2026",
      likes: 35
    },
    {
      id: 4,
      title: "Coding Club Recruitment",
      category: "Clubs",
      icon: "👨‍💻",
      description:
        "Interested in coding, DSA, competitive programming, or open-source development? Explore opportunities to participate in a student coding community.",
      location: "CSE Department",
      date: "October 25, 2026",
      likes: 16
    },
    {
      id: 5,
      title: "Photography Club Meetup",
      category: "Clubs",
      icon: "📸",
      description:
        "Connect with photography enthusiasts, share your work, and explore creative photography projects around campus.",
      location: "Student Activity Area",
      date: "October 30, 2026",
      likes: 12
    },
    {
      id: 6,
      title: "Cybersecurity Awareness Session",
      category: "Workshops",
      icon: "🔐",
      description:
        "Explore cybersecurity fundamentals, phishing prevention, password security, and responsible digital practices.",
      location: "Seminar Hall",
      date: "November 2, 2026",
      likes: 29
    },
    {
      id: 7,
      title: "Student Project Showcase",
      category: "Events",
      icon: "🚀",
      description:
        "Discover student projects in AI, IoT, software development, and emerging technologies. Bring your ideas and learn from fellow innovators.",
      location: "Main Auditorium",
      date: "November 10, 2026",
      likes: 21
    },
    {
      id: 8,
      title: "Campus Update: Student Participation",
      category: "General",
      icon: "📢",
      description:
        "Students can use this platform to discover campus opportunities and share ideas with their student community.",
      location: "Campus-wide",
      date: "October 14, 2026",
      likes: 10
    },
    {
      id: 9,
      title: "Resume Building Workshop",
      category: "Workshops",
      icon: "📝",
      description:
        "Learn how to present your projects, technical skills, internships, and achievements clearly on a professional resume.",
      location: "Placement Cell",
      date: "November 6, 2026",
      likes: 27
    }
  ];

  // ==========================================
  // 2. HTML ELEMENT REFERENCES
  // ==========================================

  const announcementGrid = document.getElementById("announcementGrid");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.getElementById("filterButtons");
  const emptyState = document.getElementById("emptyState");
  const resetFilters = document.getElementById("resetFilters");
  const resultsCount = document.getElementById("resultsCount");

  const voiceForm = document.getElementById("voiceForm");
  const message = document.getElementById("message");
  const studentName = document.getElementById("studentName");
  const studentVoice = document.getElementById("studentVoice");
  const characterCount = document.getElementById("characterCount");

  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");

  // ==========================================
  // 3. APPLICATION STATE
  // ==========================================

  let selectedCategory = "All";
  let searchTerm = "";

  // Stores likes for the current browser session only.
  const likedAnnouncements = new Set();

  document.title = "Dr AIT Campus Voice | Your Voice";

  // ==========================================
  // 4. HELPER FUNCTION
  // ==========================================

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
      element.className = className;
    }

    if (text !== undefined) {
      element.textContent = text;
    }

    return element;
  }

  // ==========================================
  // 5. RENDER ANNOUNCEMENTS
  // ==========================================

  function renderAnnouncements() {
    if (!announcementGrid) return;

    const filteredAnnouncements = announcements.filter((announcement) => {
      const matchesCategory =
        selectedCategory === "All" ||
        announcement.category === selectedCategory;

      const searchableText = [
        announcement.title,
        announcement.category,
        announcement.description,
        announcement.location,
        announcement.date
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(searchTerm);

      return matchesCategory && matchesSearch;
    });

    announcementGrid.replaceChildren();

    if (emptyState) {
      emptyState.hidden = filteredAnnouncements.length !== 0;
    }

    if (resultsCount) {
      const total = filteredAnnouncements.length;

      resultsCount.textContent =
        `${total} announcement${total === 1 ? "" : "s"} found`;
    }

    filteredAnnouncements.forEach((announcement) => {
      const isLiked = likedAnnouncements.has(announcement.id);

      const currentLikes =
        announcement.likes + (isLiked ? 1 : 0);

      // Announcement card
      const card = createElement("article", "announcement-card");

      // Card header
      const cardTop = createElement("div", "card-top");

      const icon = createElement(
        "span",
        "card-icon",
        announcement.icon
      );

      icon.setAttribute("aria-hidden", "true");

      const badge = createElement(
        "span",
        "category-badge",
        announcement.category
      );

      cardTop.append(icon, badge);

      // Card content
      const content = createElement("div", "card-content");

      const title = createElement(
        "h3",
        "",
        announcement.title
      );

      const description = createElement(
        "p",
        "card-description",
        announcement.description
      );

      // Location and date
      const meta = createElement("div", "card-meta");

      const location = createElement(
        "span",
        "",
        `📍 ${announcement.location}`
      );

      const date = createElement(
        "span",
        "",
        `📅 ${announcement.date}`
      );

      meta.append(location, date);

      // Card actions
      const actions = createElement("div", "card-actions");

      const likeButton = createElement(
        "button",
        `like-btn${isLiked ? " liked" : ""}`
      );

      likeButton.type = "button";

      likeButton.setAttribute(
        "aria-pressed",
        String(isLiked)
      );

      likeButton.setAttribute(
        "aria-label",
        `${isLiked ? "Unlike" : "Like"} ${announcement.title}. ${currentLikes} likes`
      );

      const heart = createElement(
        "span",
        "heart",
        isLiked ? "♥" : "♡"
      );

      heart.setAttribute("aria-hidden", "true");

      const count = createElement(
        "span",
        "like-count",
        String(currentLikes)
      );

      const likesLabel = createElement(
        "span",
        "",
        "likes"
      );

      likeButton.append(heart, count, likesLabel);

      // Like button functionality
      likeButton.addEventListener("click", () => {
        if (likedAnnouncements.has(announcement.id)) {
          likedAnnouncements.delete(announcement.id);
        } else {
          likedAnnouncements.add(announcement.id);
        }

        renderAnnouncements();
      });

      const categoryLabel = createElement(
        "span",
        "card-date",
        announcement.category
      );

      actions.append(likeButton, categoryLabel);

      content.append(
        title,
        description,
        meta,
        actions
      );

      card.append(cardTop, content);

      announcementGrid.append(card);
    });
  }

  // ==========================================
  // 6. CATEGORY FILTERS
  // ==========================================

  if (filterButtons) {
    filterButtons.addEventListener("click", (event) => {
      const button = event.target.closest(".filter-btn");

      if (!button) return;

      selectedCategory = button.dataset.category || "All";

      filterButtons
        .querySelectorAll(".filter-btn")
        .forEach((filterButton) => {
          const isActive = filterButton === button;

          filterButton.classList.toggle("active", isActive);

          filterButton.setAttribute(
            "aria-pressed",
            String(isActive)
          );
        });

      renderAnnouncements();
    });
  }

  // ==========================================
  // 7. SEARCH FUNCTIONALITY
  // ==========================================

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value.trim().toLowerCase();

      renderAnnouncements();
    });
  }

  // ==========================================
  // 8. RESET SEARCH AND FILTERS
  // ==========================================

  if (resetFilters) {
    resetFilters.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
      }

      searchTerm = "";
      selectedCategory = "All";

      if (filterButtons) {
        filterButtons
          .querySelectorAll(".filter-btn")
          .forEach((button) => {
            const isActive = button.dataset.category === "All";

            button.classList.toggle("active", isActive);

            button.setAttribute(
              "aria-pressed",
              String(isActive)
            );
          });
      }

      renderAnnouncements();

      if (searchInput) {
        searchInput.focus();
      }
    });
  }

  // ==========================================
  // 9. RESPONSIVE MOBILE NAVIGATION
  // ==========================================

  function closeMenu() {
    if (!primaryNav || !menuToggle) return;

    primaryNav.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!primaryNav || !menuToggle) return;

    primaryNav.classList.add("is-open");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute(
      "aria-label",
      "Close navigation menu"
    );

    document.body.classList.add("menu-open");
  }

  if (menuToggle && primaryNav) {
    // Toggle menu on mobile
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when a navigation link is clicked
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close menu when clicking outside the navigation
    document.addEventListener("click", (event) => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (!isOpen) return;

      const clickedInsideNav = primaryNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle) {
        closeMenu();
      }
    });
  }

  // ==========================================
  // 10. KEYBOARD ACCESSIBILITY
  // ==========================================

  document.addEventListener("keydown", (event) => {
    // Close mobile menu with Escape
    if (event.key === "Escape") {
      closeMenu();
    }

    // Press "/" to focus the announcement search
    const activeTag = document.activeElement?.tagName;

    const isTyping = [
      "INPUT",
      "TEXTAREA",
      "SELECT"
    ].includes(activeTag);

    if (
      event.key === "/" &&
      !isTyping &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.altKey
    ) {
      if (searchInput) {
        event.preventDefault();

        searchInput.focus();

        const announcementsSection =
          document.getElementById("announcements");

        if (announcementsSection) {
          announcementsSection.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    }
  });

  // ==========================================
  // 11. RESPONSIVE WINDOW RESIZING
  // ==========================================

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      // Close mobile navigation when switching to desktop
      if (window.innerWidth > 720) {
        closeMenu();
      }
    }, 150);
  });

  // ==========================================
  // 12. STUDENT VOICE CHARACTER COUNTER
  // ==========================================

  if (studentVoice && characterCount) {
    studentVoice.addEventListener("input", () => {
      const currentLength = studentVoice.value.length;

      characterCount.textContent =
        `${currentLength} / 1000`;
    });
  }

  // ==========================================
  // 13. STUDENT VOICE FORM SUBMISSION
  // ==========================================

  if (voiceForm) {
    voiceForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!studentName || !studentVoice || !message) {
        return;
      }

      const name = studentName.value.trim();
      const voice = studentVoice.value.trim();

      if (!name || !voice) {
        message.textContent = "Please fill in all fields.";
        return;
      }

      if (voice.length > 1000) {
        message.textContent =
          "Your message must not exceed 1000 characters.";
        return;
      }

      message.textContent =
        `Thanks, ${name}! Your voice has been received on this page.`;

      voiceForm.reset();

      if (characterCount) {
        characterCount.textContent = "0 / 1000";
      }
    });
  }

  // ==========================================
  // 14. INITIALIZE WEBSITE
  // ==========================================

  renderAnnouncements();

});