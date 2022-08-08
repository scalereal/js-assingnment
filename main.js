const API_KEY = 'api_key=ba527e40ac8ca2c3848e65d14b95a2d7';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
const movieNotFound = document.getElementById('movie-not-found');
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
let navbar = document.getElementById("navbar");

const toggle =() =>{
	if(navbar.style.display == "none") {
		navbar.style.display = "block"
		navbar.style.display = "left"
	}
	else {
		navbar.style.display = "none"
	}
}

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results.slice(0,15));
    })
}

function showMovies(data) {
    main.innerHTML = '';

		if (data.length) {
			data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">
				<div class="movie-info">
					<h3>${title}</h3>
					<span class="${getColor(vote_average)}">${vote_average}</span>
				</div>

				<div class="overview">
					<h3>Overview</h3>
					${overview}
				</div>
        `
        main.appendChild(movieEl);
		movieNotFound.style.display = "none";
    });
		} else {
			movieNotFound.style.display = "block";
		}
    
}

function getColor(vote) {
    if(vote>=8) {
        return "green"
    } else if(vote >= 5) {
        return "orange"
    } else {
        return "red"
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
		getMovies(searchURL+'&query='+searchTerm);
    if(main.style.display == "none") {
			main.style.display = movieNotFound
		} else {
			getMovies(searchURL+'&query='+searchTerm)
    }
})