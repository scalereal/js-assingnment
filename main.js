

const API_URL= "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3085793d7e6567a4efd497a4b8f80a2b"

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500"
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=3085793d7e6567a4efd497a4b8f80a2b&query=";
const form  = document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')
const page_Notfound = document.querySelector('.app')
const count =0;

 const displayMovie=(collection)=> {
  main.innerHTML = "";
  collection.forEach((item,index) => {
    if(index<15){

    
    const { title, poster_path } = item;
    const imageDiv = document.createElement("article");
    imageDiv.classList.add("card");
    imageDiv.style.backgroundImage = `url(${IMAGE_PATH + poster_path})`;
    imageDiv.innerHTML = `
    <h3  class="title" >${title}</h3>
    <button class="button" > Book Now </button>
    `;
    main.appendChild(imageDiv);
  }});
}
 const fetchMovies=async(url)=> {
  const res = await fetch(url);
  const data = await res.json();
  const result = data.results;

  
  
  if (result) {
    displayMovie(result);
    page_Notfound.style.display = "none";
  }
  if (result.length === 0) {
    
    page_Notfound.style.display = "block"
    const newDiv = document.createElement("article");
    newDiv.classList.add("container");
    newDiv.innerHTML = `
    <h2>Sorry,there is no result for keyword you searched</h2>
    <img src="background.png" alt="background">
    `;
    if(count === 0){
      page_Notfound.appendChild(newDiv);  
      count = 1;
    }
  }
  
}

fetchMovies(API_URL);



form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = search.value;

  if (value) {
    fetchMovies(SEARCH_URL + value); 
    
  } else {
    fetchMovies(API_URL);
    search.value = '' ;
  }
});



