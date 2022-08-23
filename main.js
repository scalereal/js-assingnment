const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moiveBox = document.querySelector("#movie-box");
const getMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data);
};

getMovies(API_URL);

const showMovies = (data) => {
    moiveBox.innerHTML = "";
    document.getElementById("nodata").textContent = "";
    document.getElementById("pic").src = "";

    if (data.results.length === 0) {
        document.getElementById("nodata").textContent =
            "Sorry, there is no result for keyword you searched.";
        document.getElementById("pic").src = "/readme-files/noresult_found.png";
    }

    data.results.forEach((result, index) => {
        if (index < 15) {
            const { title, poster_path } = result;
            console.log(title);
            const box = document.createElement("div");
            box.classList.add("box");

            const image = document.createElement("img");
            image.setAttribute("src", IMG_PATH + poster_path);

            const div = document.createElement("div");
            div.classList.add("overlay");

            const h3 = document.createElement("h3");
            h3.classList.add("mname");
            h3.textContent = title;

            const div2 = document.createElement("div");
            div2.classList.add("text");
            div2.textContent = "Book Now";

            div.append(h3, div2);
            box.append(image, div);
            moiveBox.append(box);
        }
    });
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCH_API + "&query=" + searchTerm);
    } else {
        getMovies(API_URL);
    }
});
