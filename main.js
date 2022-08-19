// import './style.css'

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

const API_KEY = 'api_key=7a5601dbe021916da35854344b91aa43';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const serachURL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// console.log(API_URL);
getMovies(API_URL);

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    let checkData = data.results;
    var lengthData = checkData.length;
    if(lengthData === 0){
      
      document.getElementById("nodataimg").src = "/js-assingnment/readme-files/homescreen-no-result.png";
      
      
    }
    displayMovie(data.results);
    
  })
}


function displayMovie(data) {
  main.innerHTML = '';
  
  let count = 0;
  console.log(count);
  data.forEach(movie => {
    
    if(count < 15){
    
      const {title, poster_path} = movie;
      const movieE1 = document.createElement('div');
      movieE1.classList.add('movie');
      movieE1.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">

        <div class="overview">
          <h3>${title}</h3>
          <div class="text">Book Now</div>
          
        </div>
      `
      main.appendChild(movieE1);
     
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