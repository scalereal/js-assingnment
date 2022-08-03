const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const movieGrid = document.querySelector("#movie-grid")
const getMovies = async (api) => {
    const response = await fetch(api)
    const data = await response.json()
    let display_size = data.results.slice(0,15)
    showMovies(display_size)
}

const showMovies = (data) => {
    movieGrid.innerHTML = "";
    data.forEach(
        (item) => {
            const movieGridItem = document.createElement("div")
            movieGridItem.classList.add("movie-grid-item")
            movieGridItem.innerHTML = `
                <div class = "movie-grid-inner">
                            <img src="${IMGPATH + item.poster_path}" alt="banner-image"/>
                            <div class="movie-content">
                                <h3>${item.original_title}</h3>
                                <a href="" class="book-now-btn" title="book-now-button">Book now</a>
                            </div> 
                </div>
            `;
            movieGrid.appendChild(movieGridItem)
        }
    )
}

document.querySelector("#search").addEventListener(
    "keyup",
    function(event) {
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
        } else {
            getMovies(APIURL)
        }
    }
)
getMovies(APIURL);