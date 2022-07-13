const key = "18acb5642976765d66ed9ea326327f5c";
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = `${baseUrl}/discover/movie?sort_by=popularity.desc&api_key=${key}`;
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchApi = `${baseUrl}/search/movie?&api_key=${key}`;
const section = document.querySelector(".section");
const main = document.querySelector(".main");
const movieList = document.querySelector(".movieList");
const form = document.querySelector(".form");
const search = document.querySelector(".search");
let query = "";
const getMovies = async (query) => {
  const url = query === "" ? apiUrl : searchApi + "&query=" + query;
  const response = await fetch(url);
  const data = await response.json();
  if (data.results.length > 0) {
    showMovies(data.results.slice(0, 15));
    section.style.display = "none";
    movieList.style.display = "block";
  } else {
    section.style.display = "block";
    movieList.style.display = "none";
  }
};
getMovies(query);

const showMovies = (data) => {
  data.forEach((result) => {
    const imagePath =
      result.posterPath === null
        ? "no-image-icon-13.png"
        : imgPath + result.posterPath;
    const { posterPath, title } = result;
    const box = document.createElement("div");

    box.classList.add("card");
    const h3 = document.createElement("h3");
    h3.classList.add("card-item");
    h3.innerText = title;
    const img = document.createElement("img");
    img.src = imagePath;
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = "Book Now";
    box.appendChild(img);
    box.appendChild(h3);
    box.appendChild(button);
    main.appendChild(box);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  getMovies(searchTerm);
});
