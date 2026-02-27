(function () {
  const observerOptions = {
    root: null,
    rootMargin: "-10% 0px -70% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        if (!id) return;

        // Remove active class from all links
        document.querySelectorAll(".toc li a").forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to current link
        const tocLink = document.querySelector(`.toc li a[href="#${id}"]`);
        if (tocLink) {
          tocLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  // Track all headers that have an id
  document
    .querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
    .forEach((header) => {
      observer.observe(header);
    });
})();
