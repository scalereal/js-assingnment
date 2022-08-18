const API_KEY = 'api_key=ba527e40ac8ca2c3848e65d14b95a2d7';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
const form = document.getElementById('form');
const search = document.getElementById('search');
let navbar = document.getElementById('navbar');
const main = document.getElementById('main');
const movieNotFound = document.getElementById('movie-not-found');
let node = 0

const toggle =() =>{
	if(navbar.style.display == "none") {
		navbar.style.display = "inline-block"
		navbar.style.display = "left"
	}
	else {
		navbar.style.display = "none"
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

function showMovies(data) {
	main.innerHTML = '';
	if (data.length) {
		data.forEach(movie => {
			const {title, poster_path, vote_average, overview} = movie;
		
			const movieEl = document.createElement('div');
			movieEl.classList.add('movie');

			const movieInfo = document.createElement('div');
			movieInfo.classList.add('movie-info');

			const movieOverview = document.createElement('div');
			movieOverview.classList.add('overview');

			const movie_poster = document.createElement('img')
			movie_poster.src = IMG_URL+poster_path

			const movie_name = document.createElement('h3')
			movie_name.innerText = title

			const rating = document.createElement('span')
			rating.innerHTML = vote_average
			rating.classList.add(getColor(vote_average))

			const movie_overview = document.createElement('h3')
			movie_overview.innerText = overview

			movieInfo.append(movie_name, rating)
			movieOverview.appendChild(movie_overview)
			movieEl.append(movie_poster, movieInfo, movieOverview)
			main.appendChild(movieEl)
			
			main.style.display = "flex";
			movieNotFound.style.display = "none";
		});
	} else {
		main.style.display = "none";
		movieNotFound.style.display = "block";
	}
    
}

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
      showMovies(data.results.slice(0,15));			
  })
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const searchTerm = search.value;
	if(searchTerm){
		getMovies(searchURL+'&query='+searchTerm);
	} else{
		getMovies(API_URL)
		if(main.style.display == "none") {
			main.style.display = movieNotFound
		} else {
			getMovies(searchURL+'&query='+searchTerm)
		}
	}
})

getMovies(API_URL);