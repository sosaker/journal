document.addEventListener("DOMContentLoaded", function () {
  // Твой массив картинок (сейчас их 3, потом добавишь остальные до 12)


  const journal = document.querySelector(".journal-wrapper");

  const scaleX = window.innerWidth * 0.8 / 1688;
  const scaleY = window.innerHeight * 0.8 / 1127;

  const scale = Math.min(scaleX, scaleY);
  journal.style.transform = `scale(${scale})`;

  const images = [
    "pages/1.png",       // Индекс 0 (Обложка)
    "pages/2.png", // Индекс 1
    "pages/3.png",
    "pages/4.png",
    "pages/5.png",
    "pages/6.png",
    "pages/7.png",
    "pages/8.png",
    "pages/9.png",
    "pages/10.png",
    "pages/11.png",
    "pages/12.png", // Индекс 2
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
      pageElement.style.display = "none"; // Прячем страницу, если картинки нет
      return;
    }
    pageElement.style.display = "block"; // Показываем страницу
    //pageElement.style.backgroundColor = "transparent";
    pageElement.style.backgroundImage = `url('${imagePath}')`;
  }

  function updateJournal() {
    // Сбрасываем центрирование по умолчанию
    journalContainer.classList.remove("centered");

    if (currentSpread === 0) {
      // 1. ОБЛОЖКА: Включаем режим центрирования, прячем левую страницу, показываем только правую
      journalContainer.classList.add("centered");
      setPageImage(leftPage, null);
      setPageImage(rightPage, images[0]);
    } 
    else if (currentSpread === Math.ceil((images.length - 1) / 2)) {
      // 2. ПОСЛЕДНЯЯ СТРАНИЦА: Включаем центрирование, показываем только левую страницу
      journalContainer.classList.add("centered");
      setPageImage(leftPage, images[images.length - 1]);
      setPageImage(rightPage, null);
    } 
    else {
      // 3. РАЗВОРОТЫ: Обычный режим (две страницы рядом)
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