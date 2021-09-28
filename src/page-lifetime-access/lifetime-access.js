import "./lifetime-access.scss";

(function () {
  window.onload = function initUI() {
    initScrollInteraction();

    ["HW", "TSM", "LA", "TW", "UTB"].forEach(initLyricsUI);
  };

  function initLyricsUI(trackId) {
    const btn = document.getElementById(trackId);
    const lyrics = document.getElementById(`lyrics-${trackId}`);
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(`.lyrics.active:not(#lyrics-${trackId})`)
        .forEach((x) => x.classList.remove("active"));

      lyrics.classList.contains("active")
        ? lyrics.classList.remove("active")
        : lyrics.classList.add("active");
    });
  }

  const colours = ["red", "blue", "purple", "green", "rgb(194, 178, 178)"];
  function initScrollInteraction() {
    let offsetTop = 0;
    let offsetBot = 0;
    const inner = document.getElementById("inner-container");
    window.requestAnimationFrame(function () {
      inner.style.backgroundColor =
        colours[Math.floor(Math.random() * colours.length)];
    });

    const innerSection = document.getElementById("inner-section");
    function applyStyles({ offsetTop, offsetBot }) {
      inner.style.paddingBottom = `${offsetTop}%`;
      innerSection.style.transform = `translate(-50%, -${offsetBot}%)`;
      inner.classList[offsetBot > 0 ? "add" : "remove"]("enable-click-thru");
    }

    applyStyles({ offsetTop: 99.5, offsetBot: 50 });
    window.scrollTo(0, 0);

    window.addEventListener("scroll", function (e) {
      offsetBot = window.scrollY / 20;
      offsetTop = window.scrollY / 15 + 99.5;

      window.requestAnimationFrame(function () {
        applyStyles({ offsetTop, offsetBot });
      });
    });
  }
})();
