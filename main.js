const APIKEY="api_key=f4fa6a2d7a3bb9c2777369817722c765" ;
const BASE_URL="https://api.themoviedb.org/3";
const API_URL=`${BASE_URL}/discover/movie?sort_by=popularity.desc&${APIKEY}`;
const IMG="https://image.tmdb.org/t/p/w1280";
const SEARCH =`${BASE_URL}/search/movie?&${APIKEY}`;

const noresult=document.querySelector('.noresult');
const main =document.querySelector('.main');
const movielist= document.querySelector('.movielist');
const form= document.querySelector(".form");
const search= document.querySelector(".search");

async function getMovie(url){

    const res=await fetch(url);
    const data=await res.json();
   
    if(data.results.length>0){
        showMovie(data.results.slice(0,15));
        noresult.style.display="none";
        movielist.style.display="block";
    }
    else{
       
        
        noresult.style.display="block";
        movielist.style.display="none";
    }
    //fetch(url).then(response => response.json).then(data=> console.log(data))
}

getMovie(API_URL);

function showMovie(data){
    console.log(data)
    main.innerHTML=" ";
    data.forEach(
        function(result){
            const imagePath =  IMG + result.poster_path;
            
        const {title}= result; 
        const box=document.createElement('div');
    box.classList.add("card");
    box.innerHTML=`<img src="${imagePath}"  />
    <h3 class="card-item"> ${title} </h3>
    <button class ="btn"> Book Now</button>`
    
    main.appendChild(box); 
    }
    )
}

form.addEventListener("submit",function(event){
    event.preventDefault();
    const movieName=search.value;
    if(movieName){
        getMovie((SEARCH)+'&query=' +(movieName));
    }
    else{
        getMovie(API_URL);
    }
})