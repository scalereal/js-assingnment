const APIKEY = "api_key=f4fa6a2d7a3bb9c2777369817722c765";
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_MOVIES_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${APIKEY}`;
const IMG = "https://image.tmdb.org/t/p/w1280";
const SEARCH_MOVIE_URL = `${BASE_URL}/search/movie?&${APIKEY}`;
const noresult = document.querySelector(".noresult");
const main = document.querySelector(".main");
const movielist = document.querySelector(".movielist");
const form = document.querySelector(".form");
const search = document.querySelector(".search");

const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (data.results.length > 0) {
        showMovie(data.results.slice(0, 15));
        noresult.style.display = "none";
        movielist.style.display = "block";
    } else {
        noresult.style.display = "block";
        movielist.style.display = "none";
    }
};
getMovie(POPULAR_MOVIES_URL);

const showMovie = (data) => {
    data.forEach((result) => {
        const imagePath = IMG + result.poster_path;
        const { title } = result;
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

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const movieName = search.value;
    if (movieName) {
        getMovie(SEARCH_MOVIE_URL + "&query=" + movieName);
    } else {
        getMovie(POPULAR_MOVIES_URL);
    }
});
