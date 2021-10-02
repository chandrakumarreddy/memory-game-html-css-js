import images from "./data";
import "./styles.css";

const sectionElem = document.querySelector("#section");
const liveScoreCountElem = document.querySelector("#liveScoreCount");
const resetButton = document.querySelector("#reset");

let livesRemaining = 6;

const getData = () => {
  return images;
};

function randomize() {
  return [...images].sort(() => Math.random() - 0.5);
}

function reset() {
  const cardImages = randomize();
  const faces = document.querySelectorAll(".front");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.classList.remove("toggle");
    card.classList.remove("flipped");
    setTimeout(() => {
      faces[index].src = cardImages[index].imgSrc;
      faces[index].style.pointerEvents = "all";
    }, 1000);
    card.setAttribute("name", cardImages[index].name);
  });
  livesRemaining = 6;
  liveScoreCountElem.textContent = livesRemaining;
}

function validateCards(e) {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggledCards = document.querySelectorAll(".toggle");
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((flippedCard) => {
        flippedCard.classList.remove("flipped");
        flippedCard.style.pointerEvents = "none";
      });
    } else {
      sectionElem.style.pointerEvents = "none";
      setTimeout(() => {
        clickedCard.classList.remove("flipped");
        clickedCard.classList.remove("toggle");
        sectionElem.style.pointerEvents = "all";
        if (livesRemaining === 0) {
          flippedCards.forEach((flippedCard) => {
            flippedCard.classList.remove("toggle");
          });
          resetButton.removeAttribute("disabled", true);
          setTimeout(() => {
            alert("👎 you lost");
            reset();
          }, 1000);
        }
      }, 1000);
      livesRemaining -= 1;
      liveScoreCountElem.textContent = livesRemaining;
    }
  }
  if (toggledCards.length === 16) {
    setTimeout(() => {
      alert("you won");
      reset();
    }, 2000);
  }
}

resetButton.onclick = reset;

function addCard(data) {
  const card = document.createElement("div");
  const front = document.createElement("img");
  const back = document.createElement("div");
  card.appendChild(front);
  card.appendChild(back);
  card.classList.add("card");
  card.setAttribute("name", data.name);
  front.src = data.imgSrc;
  front.classList.add("front");
  back.classList.add("back");
  card.onclick = function (e) {
    this.classList.add("toggle");
    validateCards(e);
  };
  return card;
}

function init() {
  resetButton.setAttribute("disabled", true);
  const cardImages = getData();
  liveScoreCountElem.textContent = livesRemaining;
  const cards = cardImages.map((card) => addCard(card));
  sectionElem.append(...cards);
}

init();
