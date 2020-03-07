import "./singer-songwriter.scss";

(function() {
  window.onload = function initUI() {
    initAudio();
    initFooterStyle();
    initScrollInteraction();
    setFooterCopyright();
  };

  function setFooterCopyright() {
    document.getElementById(
      "copyright-year"
    ).innerHTML = new Date().getFullYear();
  }

  function initScrollInteraction() {
    const scrollHereEl = document.querySelector(".scroll-here");
    const scrollDestinationSection = document.querySelector(".content-listen");

    scrollHereEl.addEventListener("click", scrollToDestination);

    function scrollToDestination() {
      scrollDestinationSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  function initFooterStyle() {
    const footerRocksEl = document.querySelector(".footer-rocks");
    const contentViewerEl = document.querySelector(".content-viewer");

    addPaddingBottomToContentViewer();

    window.addEventListener("resize", addPaddingBottomToContentViewer);

    function addPaddingBottomToContentViewer() {
      contentViewerEl.style.paddingBottom = `${footerRocksEl.scrollHeight}px`;
    }
  }

  function initAudio() {
    const audio = document.getElementById("audio-native-player");
    const transportBtn = document.querySelector(".audio-transport-control");
    const progressBar = document.querySelector(".audio-progress");
    const listenSectionTitle = document.querySelector(".listen-section-title");
    const listenSectionSubtitle = document.querySelector(
      ".listen-section-subtitle"
    );
    const trackNameDisplayEl = document.querySelector(".current-track-display");
    let onPlaybackElapse;
    let willPlay = false;

    transportBtn.addEventListener("click", transportHandler);
    listenSectionTitle.addEventListener("click", transportHandler);
    listenSectionSubtitle.addEventListener("click", transportHandler);

    function transportHandler() {
      willPlay = !willPlay;

      if (willPlay) play();
      else pause();
    }

    function play() {
      audio.play();

      setCurrentTrackNameDisplay();

      onPlaybackElapse = setInterval(() => {
        setCurrentTrackNameDisplay();
        progressBar.style.width = `${(audio.currentTime / audio.duration) *
          100}%`;
      }, 1000);

      trackNameDisplayEl.classList.remove("hide");
      transportBtn.classList.remove("show-play-btn");
      transportBtn.classList.add("show-pause-btn");
    }

    function pause() {
      clearInterval(onPlaybackElapse);

      audio.pause();

      trackNameDisplayEl.classList.add("hide");
      transportBtn.classList.remove("show-pause-btn");
      transportBtn.classList.add("show-play-btn");
    }

    let lastTrackName = "";
    function setCurrentTrackNameDisplay() {
      const currentTrackName = getCurrentTrackName();

      if (lastTrackName === currentTrackName) return;
      if (!currentTrackName) {
        trackNameDisplayEl.classList.add("hide");
      } else {
        trackNameDisplayEl.innerHTML = currentTrackName;
        lastTrackName = currentTrackName;
      }
    }

    function getCurrentTrackName() {
      const { currentTime } = audio;
      if (currentTime < 13) return "No One Escapes";
      if (currentTime < 26) return "Coming Easy";
      if (currentTime < 45) return "You Work For Me Now";
      if (currentTime < 62) return "Skye";
      return "Pretty Lawns &amp; Pearly Gates";
    }
  }
})();
