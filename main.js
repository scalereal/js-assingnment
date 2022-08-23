
const API_KEY = 'api_key=7a5601dbe021916da35854344b91aa43';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const serachURL = BASE_URL + '/search/movie?'+API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    let checkData = data.results;
    let lengthData = checkData.length;
    document.getElementById('nodata').textContent = '';
    document.getElementById("nodataimg").src = "" ;
    if(lengthData === 0){ 
      document.getElementById('nodata').textContent = 'Sorry, there is no result for keyword you searched.';
      document.getElementById("nodataimg").src = "/js-assingnment/readme-files/noresult.png";
    }
    displayMovie(data.results);  
  })
}
getMovies(API_URL);


function displayMovie(data) {
  main.innerHTML = '';
  let count = 0;
  data.forEach(movie => {
    if(count < 15){
      const {title, poster_path} = movie;
      const movieE1 = document.createElement('div');
      movieE1.classList.add('movie');
      const image = document.createElement('img');
      image.setAttribute('src',IMG_URL+poster_path);
      const div = document.createElement('div');
      div.classList.add('overview');
      const h3 = document.createElement('h3');h3.classList.add('mtitle');
      h3.textContent = title;
      const btn = document.createElement('div');
      btn.classList.add('btn');
      btn.textContent = 'Book Now';
      div.append(h3,btn);
      movieE1.append(image,div);
      main.append(movieE1);
      count += 1;
    }
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if(searchTerm) {
    getMovies(serachURL+'&query='+searchTerm)
  }
  else{
    getMovies(API_URL)
    
  }
})