
const API_URL= "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3085793d7e6567a4efd497a4b8f80a2b"

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500"
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=3085793d7e6567a4efd497a4b8f80a2b&query=";
const form  = document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')


getMovies(API_URL)
async function getMovies(url){
  const res= await fetch(url)
  const data= await res.json()
  displayMovies(data.results)
  console.log(data.results);
}
function displayMovies(movies){
  main.innerHTML=''
  movies.forEach((movie) => {
    const{title,poster_path,vote_average,overview} =movie
    const moviesElement=document.createElement('div')
    console.log(IMAGE_PATH+ poster_path)
    moviesElement.classList.add('movie')
    moviesElement.innerHTML=`
    <img src="${IMAGE_PATH + poster_path}" alt="${title}"/>
    <div class='movie-info'>
    <h3>${title}</h3>
    <span class ="${getClassesByRating(vote_average)}">${vote_average}</span>
   <div class='overview'>
   <h3>Overview</h3>
   ${overview}
   </div>
   
    </div>
    `

    main.appendChild(moviesElement)
  });
}
function getClassesByRating(rating){
  if(rating>=8){
    return 'green'
  }else if(rating>=5){
    return 'orange'
  }else{
    return 'red'
  }
}
form.addEventListener('submit',(e)=>{
   e.preventDefault()
  const searchValue = search.value
  console.log(searchValue)
  if(searchValue && searchValue !==''){
    getMovies(SEARCH_URL+searchValue)
    searchValue=''
  }else{
    window.location.reload()
  }
})