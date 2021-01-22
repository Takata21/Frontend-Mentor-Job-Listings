const d = document;
const filterContainer_div = d.getElementById("filters-container ");
const cardContainer_div = d.querySelector(".cards-container");
const footer = d.getElementById("footer");

window.addEventListener("DOMContentLoaded", render);

// FUNCTIONS
async function getData() {
    const response = await fetch("http://localhost:3004/data");
    data = await response.json();
    return data;
}

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
    console.log(data);
}

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
  cardContainer_div.innerHTML = cards;
  const filterBtn = cardContainer_div.querySelectorAll(".filters-item");
  filterBtn.forEach((item) => {
    item.addEventListener("click", filterCategory);
  });
}

function filterCategory(e) {
  e.preventDefault();
  console.log(e.target.textContent);
}