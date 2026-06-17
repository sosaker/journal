document.addEventListener("DOMContentLoaded", function () {

  const journal = document.querySelector(".journal-wrapper");

  const BASE_W = 1688;
  const BASE_H = 1127;

  function applyScale() {
    const scaleX = window.innerWidth * 0.7 / BASE_W;
    const scaleY = window.innerHeight * 0.7 / BASE_H;

    const scale = Math.min(scaleX, scaleY);

    journal.style.transform = `scale(${scale})`;
    journal.style.transformOrigin = "top center";
  }

  // важно: первичный запуск
  applyScale();

  // важно: адаптация под телефон / поворот экрана
  window.addEventListener("resize", applyScale);
  window.addEventListener("orientationchange", applyScale);


  // -------------------- ТВОЙ КОД --------------------

  const images = [
    "pages/1.png",
    "pages/2.png",
    "pages/3.png",
    "pages/4.png",
    "pages/5.png",
    "pages/6.png",
    "pages/7.png",
    "pages/8.png",
    "pages/9.png",
    "pages/10.png",
    "pages/11.png",
    "pages/12.png",
  ];

  let currentSpread = 0;

  const journalContainer = document.querySelector(".journal-container");
  const leftPage = document.getElementById("leftPage");
  const rightPage = document.getElementById("rightPage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");


  function setPageImage(pageElement, imagePath) {
    if (!imagePath) {
      pageElement.style.backgroundImage = "none";
      pageElement.style.display = "none";
      return;
    }

    pageElement.style.display = "block";
    pageElement.style.backgroundImage = `url('${imagePath}')`;
    pageElement.style.backgroundSize = "cover";
    pageElement.style.backgroundPosition = "center";
  }


  function updateJournal() {
    journalContainer.classList.remove("centered");

    if (currentSpread === 0) {
      journalContainer.classList.add("centered");
      setPageImage(leftPage, null);
      setPageImage(rightPage, images[0]);
    }

    else if (currentSpread === Math.ceil((images.length - 1) / 2)) {
      journalContainer.classList.add("centered");
      setPageImage(leftPage, images[images.length - 1]);
      setPageImage(rightPage, null);
    }

    else {
      const leftIndex = 1 + (currentSpread - 1) * 2;
      const rightIndex = leftIndex + 1;

      setPageImage(leftPage, images[leftIndex]);
      setPageImage(rightPage, images[rightIndex]);
    }
  }


  nextBtn.addEventListener("click", () => {
    const maxSpread = Math.ceil((images.length - 1) / 2);

    if (currentSpread < maxSpread) {
      currentSpread++;
      updateJournal();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentSpread > 0) {
      currentSpread--;
      updateJournal();
    }
  });


  updateJournal();
});