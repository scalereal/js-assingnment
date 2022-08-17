const api_url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const img_path = "https://image.tmdb.org/t/p/w500";
const search_api = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const movieGrid = document.querySelector("#movie_grid")
const getMovies = async (api) => {
    const response = await fetch(api)
    const data = await response.json()
    let display_size = data.results.slice(0,15)
    let movie_grid = document.getElementById("movie_grid");
    let no_results = document.getElementById("no_results_wrapper");
    if (display_size.length) {
        movie_grid.style.display = "flex";
        no_results.style.display = "none";
        showMovies(display_size);
      } else {
        movie_grid.style.display = "none";
        no_results.style.display = "block";
      }
}
const showMovies = (data) => {
    movieGrid.textContent = "";
    data.forEach(
        (item) => {
            const movieGridItem = document.createElement("div")
            movieGridItem.classList.add("movie-grid-item")
            let movieGridInnerTag = document.createElement("div")
            movieGridInnerTag.classList.add("movie-grid-inner")
            let imgTag = document.createElement("img")
            imgTag.src = img_path + item.poster_path 
            imgTag.alt = "banner-image"
            let movieContentTag = document.createElement("div")
            movieContentTag.classList.add("movie-content")
            let h3Tag = document.createElement("h3")
            h3Tag.classList.add("h3-tag")
            let anchorTag = document.createElement("a")
            anchorTag.classList.add("book-now-btn")
            anchorTag.title = "book-now-btn"
            anchorTag.textContent = "book now";
            h3Tag.innerHTML = item.original_title
            movieContentTag.appendChild(h3Tag)
            movieContentTag.appendChild(anchorTag)
            movieGridInnerTag.appendChild(imgTag)
            movieGridInnerTag.appendChild(movieContentTag)
            movieGridItem.appendChild(movieGridInnerTag)
            movieGrid.appendChild(movieGridItem)
        }
    )
}
getMovies(api_url);
let search_box = document.getElementById("search_bar_wrapper");
search_box.addEventListener(
    "submit",
    function(e){
        e.preventDefault();
        let search = document.getElementById("search")
        if (search.value != "") {
            getMovies(search_api + search.value)
        } else {
            getMovies(api_url)
        }
    }
);
