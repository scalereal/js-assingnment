const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3085793d7e6567a4efd497a4b8f80a2b";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=3085793d7e6567a4efd497a4b8f80a2b&query=";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const page_Notfound = document.querySelector(".app");
let count = 0;

const displayMovie = (collection) => {
  main.innerHTML = "";
  collection.forEach((item, index) => {
    if (index < 15) {
      const { title, poster_path } = item;
      const imageDiv = document.createElement("article");
      imageDiv.classList.add("card");
      imageDiv.style.backgroundImage = `url(${IMAGE_PATH + poster_path})`;
      const h3 = document.createElement("h3");
      h3.classList.add("title");
      h3.innerText = title;
      const button = document.createElement("button");
      button.classList.add("button");
      button.innerText = "Book Now";
      imageDiv.appendChild(h3);
      imageDiv.appendChild(button);

      main.appendChild(imageDiv);
    }
  });
};
const fetchMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  const result = data.results;

  if (result) {
    displayMovie(result);
    page_Notfound.style.display = "none";
  }
  if (result.length === 0) {
    page_Notfound.style.display = "block";
    const newDiv = document.createElement("div");
    newDiv.classList.add("not-found");
    const h2 = document.createElement("h2");
    h2.classList.add("error-message");
    h2.innerText = "Sorry,there is no result for keyword you searched";
    const img = document.createElement("img");
    img.src = "background.png";
    img.alt = "background";
    img.classList.add("error-image");
    newDiv.appendChild(h2);
    newDiv.appendChild(img);
    if (count === 0) {
      page_Notfound.appendChild(newDiv);
      count = 1;
    }
  }
};

fetchMovies(API_URL);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = search.value;

  if (value) {
    fetchMovies(SEARCH_URL + value);
  } else {
    fetchMovies(API_URL);
    search.value = "";
  }
});
