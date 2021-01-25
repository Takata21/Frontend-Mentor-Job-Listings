const d = document;
const filterContainer_div = d.getElementById("filters-container ");
const cardContainer_div = d.querySelector(".cards-container");
const filtersActives_div = d.querySelector(".filters-actives");
const footer = d.getElementById("footer");
let words = [];
let result = [];
let resultItems = [];
let = cont = 0;

window.addEventListener("DOMContentLoaded", render);
// FUNCTIONS

// get data
async function getData() {
    const response = await fetch("data.json");
    data = await response.json();
    return data;
}
// render footer
async function render() {
    cardContainer_div.innerHTML = `<img src="./static/images/Spin-1s-200px.svg" alt="" class="load">
`;
    const data = await getData();
    renderCards(data);
    footer.innerHTML = ` <div class="wrapper">
            <div class="attribution">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="https://github.com/Takata21">MTakata</a>.
            </div>
        </div>`;
}

// RENDER CARDS
function renderCards(data) {
    const cards = data
        .map((card) => {
                return ` <article data-id="${card.id}" class="card">
                    <div class="card-header">
                        <img src="${card.logo}" alt="${card.logo}" class="logo">
                        <div class="card-header-data">
                            <div class="attr">
                                <p class="attr-item company">${card.company}</p>
                                <p class="attr-item new">New!</p>
                                <p class="attr-item featured"> Featured</p>
                            </div>
                            <p class="position">Senior Frontend Developer</p>
                            <ul class="details">
                                <li class="details-item postedAt"> ${
                                  card.postedAt
                                }</li>
                                <li class="details-item contract"> ${
                                  card.contract
                                }</li>
                                <li class="details-item location"> ${
                                  card.location
                                }</li>
                            </ul>
                        </div>
                    </div>
                    <hr class="line">
                    <div class="options">
                    ${card.languages
                      .map((language) => {
                        return ` <a href="" class="filters-item">${language}</a>`;
                      })
                      .join("")}
                      ${card.tools
                        .map((tool) => {
                          if (tool) {
                            return ` <a href="" class="filters-item">${tool}</a>`;
                          } else {
                            return "";
                          }
                        })
                        .join("")}
                      <a href="" class="filters-item">${card.level}</a>
                      <a href="" class="filters-item">${card.role}</a>
                    </div>

                </article>`;
    })
    .join("");
  cardContainer_div.innerHTML = "";
  cardContainer_div.innerHTML = cards;
  const filterBtn = cardContainer_div.querySelectorAll(".filters-item");
  filterBtn.forEach((item) => {
    item.addEventListener("click", filterCategory);
  });
}

function filterCategory(e) {
  e.preventDefault();
  const word = e.target.textContent;
  setWord(word);
  renderFilters(words);
}

function setWord(word) {
  let exist = false;
  words.forEach((element) => {
    if (element.item === word) {
      if (element.use) {
        exist = true;
      }
    }
  });
  if (words.length > 0) {
    if (!exist) {
      words.push({ item: word, use: false });
    }
  }
  if (words.length <= 0) {
    words.push({ item: word, use: false });
  }
  filterData();
  // debugger;
}

async function removeWord(e) {
  const word = e.target.parentElement.textContent;
  words = words.filter((element) => {
    if (element.item !== word) {
      element.use = false;
      return element;
    }
  });
  renderFilters(words);
  resultItems = [];
  const obj = await filterData();
  renderCards(obj);
  // debugger;
  if (words.length <= 0) {
    removeAll();
  }
}
function removeAll() {
  filtersActives_div.innerHTML = "";
  filterContainer_div.classList.remove("active");
  words = [];
  resultItems = [];
  render();
}
function renderFilters(filters) {
  if (filters.length === 0) {
    filterContainer_div.classList.remove("active");
  } else {
    filtersActives_div.innerHTML = filters
      .map((word) => {
        return ` <p class="filters-actives-item">${word.item}<img src="./static/images/icon-remove.svg" alt="${word.item}" class="btn-close" id="btn-close"></p>`;
      })
      .join("");
    filterContainer_div.classList.add("active");
    filterHeight = filterContainer_div.clientHeight / 2;
    filterContainer_div.style.bottom = `-${filterHeight}px`;
    filterContainer_div
      .querySelector(".clear-btn")
      .addEventListener("click", removeAll);
    const btnRemove = filtersActives_div.querySelectorAll(".btn-close");
    btnRemove.forEach((btn) => btn.addEventListener("click", removeWord));
  }
}
async function filterData() {
  //
  const data = await getData();
  words.forEach((element) => {
    if (!element.use) {
      if (resultItems.length > 0) {
        resultItems = resultItems.filter((item) => {
          if (
            item.languages.includes(element.item) ||
            item.role === element.item ||
            item.level === element.item ||
            item.tools.includes(element.item)
          ) {
            element.use = true;
            return item;
          }
        });
      }
      if (element.use) {
      }
      if (resultItems.length === 0) {
        cont++;
        resultItems = data.filter((item) => {
          if (
            item.languages.includes(element.item) ||
            item.role === element.item ||
            item.level === element.item ||
            item.tools.includes(element.item)
          ) {
            element.use = true;
            return item;
          }
        });
      }
    }
  });
  renderCards(resultItems);
  return resultItems;
}