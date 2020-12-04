// API FETCH CALL

const apiKEY = "a752246fb743db5b8fbfaa806cacd7b1";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKEY}&page=1`;
// poster path
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
// add single double quote as we want to concatenate a search term at end
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${apiKEY}&query="`;

// can look at all data in json
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a752246fb743db5b8fbfaa806cacd7b1&page=1

// selectors
const form = document.getElementById("form");
const searching = document.getElementById("search");
const main = document.getElementById("main");

// GET INITIAL MOVIES
getMovies(API_URL);

async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
  } catch (error) {
    console.log(error);
  }
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("article");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
   
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>

    `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "coral";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searching.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    searching.value = "";
  } else {
    window.location.reload();
  }
});

// SEARCH POP UP BUTTON
// const search = document.querySelector("#form");
// const btn = document.querySelector(".search-btn");
// const input = document.querySelector("#search");

// btn.addEventListener("click", (e) => {
//   e.preventDefault();

//   if()
//   search.classList.toggle("active");
//   input.focus();
// });
