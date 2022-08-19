const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moiveBox = document.querySelector("#movie-box");
const getMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data);
};
getMovies(APIURL);

let count = 0;

const showMovies = (data) => {
    if (data.results.length === 0) {
        document.getElementById("pic").src =
            "/readme-files/homescreen-no-result.png";
    }

    moiveBox.innerHTML = "";
    data.results.forEach((result, index) => {
        if (index < 15) {
            const imagePath =
                result.poster_path === null
                    ? "img/image-missing.png"
                    : IMGPATH + result.poster_path;

            const box = document.createElement("div");
            box.classList.add("box");
            box.innerHTML = `
                <img src="${imagePath}" alt="" />
                <div class="overlay">
                    <div class="title"> 
                        <h2> ${result.original_title}  </h2>
                        <button class="btn">Book Now</button>
                    </div>
                 </div>
            `;

            moiveBox.appendChild(box);
        }
    });
};

document.querySelector("#search").addEventListener("keyup", function (event) {
    if (event.target.value != "") {
        getMovies(SEARCHAPI + event.target.value);
    } else {
        getMovies(APIURL);
    }
});
