document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector(".main-container");
  const headerContainer = document.querySelector(".header-container");
  const card = document.querySelector(".card");
  const scoreH3 = document.querySelector(".scoreH3");
  const textH2 = document.querySelector(".textH2");
  const reload = document.querySelector(".reload");
  reload.addEventListener("click", reloadFunc);

  const timeCount = document.querySelector(".time-count");
  const gameOverWrapper = document.querySelector(".gameOver-wrapper");
  const gameOver = document.querySelector(".gameOver-text");

  const tryAgain = document.querySelector(".tryAgain");
  tryAgain.addEventListener("click", reloadFunc);

  const darkScreenBtn = document.querySelector(".dark-screen-button");
  darkScreenBtn.addEventListener("click", darkScreenToggle);

  let dark = true;
  let imagesArray = cardsArray;
  let newImagesArray = [];

  let clickedCardsArray = [];
  let clickedCardsId = [];
  let CheckmatchedCardsToRemove = [];

  let imageOpened = false;
  let matchedImagesForScore = [];
  let score = 0;
  let scoreFromMatch;
  let time = 30.0;
  let RoundedTime;
  let remainingTime;
  let additionalPoints;
  let finalScore = score;

  imagesArray.sort(() => 0.5 - Math.random());

  function createCards() {
    for (let i = 0; i < imagesArray.length; i++) {
      var cardContainer = document.createElement("div");

      var card = document.createElement("div");
      var cardFront = document.createElement("div");
      var cardBack = document.createElement("div");
      var cardBackImage = document.createElement("img");

      cardBackImage.setAttribute("id", i);
      cardContainer.setAttribute("class", "cardContainer");
      cardContainer.setAttribute("id", i);
      card.setAttribute("class", "card");
      card.setAttribute("id", i);
      card.addEventListener("click", clickedCard);
      cardFront.setAttribute("class", "cardFront");
      cardBack.setAttribute("class", "cardBack");

      mainContainer.appendChild(cardContainer);
      cardContainer.appendChild(card);
      card.appendChild(cardFront);
      card.appendChild(cardBack);
      cardBack.appendChild(cardBackImage);

      cardBackImage.setAttribute("src", imagesArray[i].img);
    }
  }
  createCards();

  function countdownFunc() {
    time -= 0.01;
    RoundedTime = time.toFixed(2);

    // To get - Positive Zero - at the end of Countdown
    timeCount.innerText = Math.abs(RoundedTime).toFixed(2);

    if (imagesArray.length == CheckmatchedCardsToRemove.length) {
      setTimeout(() => {
        remainingTime = time;
        finalScore = (score + remainingTime * 100).toFixed(0);
        scoreH3.innerText = score.toFixed(0);

        let additionalPointsInterval = setInterval(() => {
          score += 2;
          scoreH3.innerText = "+" + score;
          console.log(score, finalScore);

          if (score >= finalScore) {
            console.log("test ClearInterval 2");
            clearInterval(additionalPointsInterval);
            scoreH3.innerText = finalScore;
          }
        }, 1);
      }, 500);

      clearInterval(setInterval1);
      gameOverWrapper.style.display = "flex";
      gameOverWrapper.classList.add("blockedScreen");
      gameOver.innerText = "Congratulations! You Won!";
      mainContainer.classList.add("gameOver-main-container");
    } else if (RoundedTime == 0) {
      clearInterval(setInterval1);
      gameOverWrapper.style.display = "flex";
      gameOverWrapper.classList.add("blockedScreen");
      mainContainer.classList.add("gameOver-main-container");
      gameOver.innerText = "Gave Over";

      setTimeout(() => {
        if (imagesArray.length == CheckmatchedCardsToRemove.length) {
          gameOver.innerText = "Congratulations! You Won!";
        } else if (imagesArray.length != CheckmatchedCardsToRemove.length) {
          gameOver.innerText = "Sorry, you lose, Try Again!";
        }
      }, 500);
    }
  }

  let setInterval1 = setInterval(() => {
    countdownFunc();
  }, 10);

  function removeMatchedCards() {
    [...mainContainer.childNodes].filter((item) => {
      if (CheckmatchedCardsToRemove.includes(item.id)) {
        item.classList.add("removed");
      }
    });
  }

  function MatchCards() {
    var cards = document.querySelectorAll("img");

    var chosenCard1Img = clickedCardsArray[0];
    var chosenCard2Img = clickedCardsArray[1];

    if (
      chosenCard1Img === chosenCard2Img &&
      clickedCardsId[0] === clickedCardsId[1]
    ) {
      var sameFirstImg = clickedCardsArray[1];
      clickedCardsArray = [];
      clickedCardsArray[0] = sameFirstImg;

      var sameFirstId = clickedCardsId[1];
      clickedCardsId = [];
      clickedCardsId[0] = sameFirstId;
    } else if (
      clickedCardsArray[0] === clickedCardsArray[1] &&
      clickedCardsId[0] !== clickedCardsId[1]
    ) {
      textH2.classList.remove("visible");
      textH2.classList.add("visible");
      setTimeout(() => {
        textH2.classList.toggle("visible");
      }, 1000);

      score = +(
        score +
        time * (imagesArray.length - matchedImagesForScore.length)
      ).toFixed(0);
      matchedImagesForScore.push(1);
      scoreH3.innerText = score;

      CheckmatchedCardsToRemove.push(clickedCardsId[0]);
      CheckmatchedCardsToRemove.push(clickedCardsId[1]);

      removeMatchedCards();
      clickedCardsArray = [];
      clickedCardsId = [];
    } else if (clickedCardsArray[0] !== clickedCardsArray[1]) {
      var savedLastClickedImg = clickedCardsArray[1];
      clickedCardsArray = [];
      clickedCardsArray[0] = savedLastClickedImg;

      var savedLastClickedId = clickedCardsId[1];
      clickedCardsId = [];
      clickedCardsId[0] = savedLastClickedId;
    }
  }

  function clickedCard() {
    var cardId = this.getAttribute("id");

    if (imageOpened == false) {
      imageOpened == true;
      this.classList.toggle("clicked");

      clickedCardsArray.push(imagesArray[cardId].name);
      clickedCardsId.push(cardId);

      setTimeout(() => {
        imageOpened == false;
        this.classList.toggle("clicked");
      }, 500);

      if (clickedCardsArray.length === 2) {
        setTimeout(() => {
          MatchCards();
        }, 200);
      }
    }
  }

  function reloadFunc() {
    window.location.href = window.location.href;
  }

  function darkScreenToggle() {
    document.body.classList.toggle("dark-screen");
    darkScreenBtn.classList.toggle("dark-btn");

    if (darkScreenBtn.classList.contains("dark-btn")) {
      darkScreenBtn.innerText = "Dark";
    } else {
      darkScreenBtn.innerText = "Light";
    }
  }
});

let cardsArray = [
  {
    name: "camera",
    img: "https://icons.iconarchive.com/icons/toma4025/rumax/128/camera-icon.png",
  },
  {
    name: "camera",
    img: "https://icons.iconarchive.com/icons/toma4025/rumax/128/camera-icon.png",
  },
  {
    name: "anime",
    img: "https://icons.iconarchive.com/icons/binassmax/pry-frente-black-special-2/128/pictures-4-icon.png",
  },
  {
    name: "anime",
    img: "https://icons.iconarchive.com/icons/binassmax/pry-frente-black-special-2/128/pictures-4-icon.png",
  },
  {
    name: "shirt",
    img: "https://icons.iconarchive.com/icons/michael/nike/128/Nike-Shirt-7-icon.png",
  },
  {
    name: "shirt",
    img: "https://icons.iconarchive.com/icons/michael/nike/128/Nike-Shirt-7-icon.png",
  },
  {
    name: "Painting",
    img: "https://icons.iconarchive.com/icons/itzikgur/my-seven/128/Graphics-Painting-icon.png",
  },
  {
    name: "Painting",
    img: "https://icons.iconarchive.com/icons/itzikgur/my-seven/128/Graphics-Painting-icon.png",
  },
  {
    name: "movie",
    img: "https://icons.iconarchive.com/icons/firstline1/movie-mega-pack-4/128/Arthur-Newman-icon.png",
  },
  {
    name: "movie",
    img: "https://icons.iconarchive.com/icons/firstline1/movie-mega-pack-4/128/Arthur-Newman-icon.png",
  },
  {
    name: "present",
    img: "https://icons.iconarchive.com/icons/dooffy/christmas/128/present-icon.png",
  },
  {
    name: "present",
    img: "https://icons.iconarchive.com/icons/dooffy/christmas/128/present-icon.png",
  },
];

//https://forum.freecodecamp.org/t/how-does-math-random-work-to-sort-an-array/151540

// For Reload Page
//     function reloadFunc(){
//     window.location.href = window.location.href;
//   }

//   function reloadFunc(){
//     history.go(0);
//   }
