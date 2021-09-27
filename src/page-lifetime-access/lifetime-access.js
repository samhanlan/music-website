import "./lifetime-access.scss";

(function () {
  window.onload = function initUI() {
    initScrollInteraction();
  };

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
    }

    applyStyles({ offsetTop: 99.5, offsetBot: 50 });
    window.scrollTo(0, 0);

    window.addEventListener("scroll", function (e) {
      offsetTop = window.scrollY / 20 + 99.5;
      offsetBot = window.scrollY / 20;
      window.requestAnimationFrame(function () {
        applyStyles({ offsetTop, offsetBot });
      });
    });
  }
})();
