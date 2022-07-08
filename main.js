import axios from "axios";
const key = 'f9d119ddc9f2ae7c8b2c34f1d5910a87';
const api =`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${key}`;
const imgUrl ="https://image.tmdb.org/t/p/w500" ;
const searchUrl= `https://api.themoviedb.org/3/search/movie?api_key=${key}`;

const app=document.querySelector("#app");
const movieData=document.querySelector(".movie-card");
const movieSearch=document.querySelector(".search-bar")
const errorDiv=document.querySelector(".no-movie-found");


async function getMovieFromApi(api) {
	const response= await axios.get(api);
	const movieData=response.data.results.slice(0,15);
	if(movieData.length){
		app.style.display="block";
		showMovieData(movieData)
		errorDiv.style.display="none";
	}
	else{
		app.style.display="none";
		errorDiv.style.display="block";

	}
}


getMovieFromApi(api);

movieSearch.addEventListener("keyup", (event)=>{
	event.preventDefault();
	const query=event.target.value;

	if(query.length>0){
		getMovieFromApi(searchUrl+"&query="+query);
	}else{
		getMovieFromApi(api);
	}
	
});

const showMovieData=(data)=>{
	 movieData.innerHTML ='';
	 let count=0;
    data.forEach(movie => {
    const {poster_path,title}= movie;
    const div = document.createElement('div');
    div.classList.add("card");
    let htmlData=``;
    if(poster_path!=null){
    	htmlData+=`<img src="${imgUrl +poster_path}" alt="${title}">`;
    	if(title.length>16){
    		htmlData+=`<h3 class="card-item"> ${title.substring(0,17)}...</h3>`;
    	}else{
    		htmlData+=`<h3 class="card-item"> ${title}</h3>`
    	}
    	htmlData+=`<button class ="btn"> Read More </button>`

    	div.innerHTML=htmlData
    

    	
}else{
	htmlData+=`<img src="http://via.placeholder.com/1080x1580"   alt="${title}">`;
	if(title.length>16){
		htmlData+=`<h3 class="card-item"> ${title.substring(0,17)}...</h3>`
	}else{
    		htmlData+=`<h3 class="card-item"> ${title}</h3>`
    }
    htmlData+=`<button class ="btn"> Read More </button>`

    div.innerHTML=htmlData
	
}
    
    movieData.appendChild(div);
});
}
