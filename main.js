import axios from "axios";
const key = "f9d119ddc9f2ae7c8b2c34f1d5910a87";
const api = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${key}`;
const imgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}`;
const app = document.querySelector("#app");
const movieData = document.querySelector(".movie-card");
const movieSearch = document.querySelector(".search-bar");
const errorDiv = document.querySelector(".no-movie-found");
let query = "";

async function getMovieFromApi(query) {
  const url = query === "" ? api : searchUrl + "&query=" + query;
  const response = await axios.get(url);
  const movieData = response.data.results.slice(0, 15);
  if (movieData.length) {
    app.style.display = "block";
    showMovieData(movieData);
    errorDiv.style.display = "none";
  } else {
    app.style.display = "none";
    errorDiv.style.display = "block";
  }
}

getMovieFromApi(query);

movieSearch.addEventListener("keyup", (event) => {
  event.preventDefault();
  query = event.target.value;
  getMovieFromApi(query);
});

const showMovieData = (data) => {
  let count = 0;
  data.forEach((movie) => {
    const { poster_path, title } = movie;
    const div = document.createElement("div");
    div.classList.add("card");

    if (poster_path != null) {
      let imgData = document.createElement(`img`);
      imgData.src = imgUrl + poster_path;
      imgData.alt = title;

      let h3Data = document.createElement(`h3`);
      h3Data.classList.add("card-item");

      if (title.length > 16) {
        h3Data.innerText = title.substring(0, 17) + "...";
      } else {
        h3Data.innerText = title;
      }
      let buttonData = document.createElement(`button`);
      buttonData.classList.add("btn");
      buttonData.innerText = "Read More";
      div.appendChild(imgData);
      div.appendChild(h3Data);
      div.appendChild(buttonData);
    } else {
      let imgData = document.createElement(`img`);
      imgData.src = "http://via.placeholder.com/1080x1580";
      imgData.alt = title;

      let h3Data = document.createElement(`h3`);
      h3Data.classList.add("card-item");
      if (title.length > 16) {
        h3Data.innerText = title.substring(0, 17) + "...";
      } else {
        h3Data.innerText = title;
      }
      let buttonData = document.createElement(`button`);
      buttonData.classList.add("btn");
      buttonData.innerText = "Read More";

      div.appendChild(imgData);
      div.appendChild(h3Data);
      div.appendChild(buttonData);
    }

    movieData.appendChild(div);
  });
};
