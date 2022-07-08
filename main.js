const key="18acb5642976765d66ed9ea326327f5c";
const  BASEURL = "https://api.themoviedb.org/3";
const APIURL =
    `${BASEURL}/discover/movie?sort_by=popularity.desc&api_key=${key}`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =`${BASEURL}/search/movie?&api_key=${key}`;

const section=document.querySelector('.section');
const main = document.querySelector(".main");
const movielist = document.querySelector(".movielist");
const form= document.querySelector(".form");
const search= document.querySelector(".search");

const getMovies=async (api)=>{
  const response=await fetch(api);
  const data=await response.json();
  // console.log(data);
  if(data.results.length>0){
  showMovies(data.results.slice(0,15));
  section.style.display="none";
  movielist.style.display="block";
     } 
   else{
    console.log(data);

        

         section.style.display="block";
         movielist.style.display="none";
 
     }
    }
getMovies(APIURL);

const showMovies=(data)=>{
  console.log(data)
  main.innerHTML=" ";
  data.forEach(
    (result)=>{const imagePath = result.poster_path === null ? "no-image-icon-13.png" : IMGPATH + result.poster_path;
    const {poster_path,title,}= result;
    const box=document.createElement('div');
    box.classList.add("card");
    box.innerHTML=`<img src="${imagePath}" alt="" />
    <h3 class="card-item"> ${title} </h3>
    <button class ="btn"> Book Now</button>
    `
    main.appendChild(box);
  }
  )
}



form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const searchTerm= search.value ;
  if(searchTerm){
    getMovies((SEARCHAPI)+ '&query=' +(searchTerm));

} else{
  getMovies(APIURL)
}
})
 

