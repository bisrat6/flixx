const global={
    currentPage:window.location.pathname
} 


function highlightActiveLink(){
    const links=document.querySelectorAll('.nav-link');
    links.forEach((link)=>{
        if(link.getAttribute('href')===global.currentPage){
            link.classList.add('active');
        }
    })
}
async function fetchData(endpoint){
    showSpinner();
    const API_KEY='90abe2f31d346c7208b63e226ec32e75';
    const API_URL='https://api.themoviedb.org/3/';
    const response =  await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data=await response.json();
    hideSpinner();
    return data;
}


function showSpinner(){
    const spinner=document.querySelector('.spinner');
    spinner.classList.add('show');
}
function hideSpinner(){
    const spinner=document.querySelector('.spinner');
    spinner.classList.remove('show');
}

async function displayPopularMovies(){
    const {results}=await fetchData(`movie/popular`);
    const parent=document.querySelector('#popular-movies');
    results.forEach((movie)=>{
        const div=document.createElement('div');
        div.className='card';
        div.innerHTML=`<a href="movie-details.html?id=${movie.id}">
        ${
            movie.poster_path
            ?`<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
                />`
            :`<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
                />`
        }
                
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
            </div>`;
        parent.appendChild(div);
    })

}
async function displayPopularShows(){
    const {results}=await fetchData(`tv/popular`);
    const parent=document.querySelector('#popular-shows');
    results.forEach((show)=>{
        const div=document.createElement('div');
        div.className='card';
        div.innerHTML=`<a href="tv-details.html?id=${show.id}">
        ${
            show.poster_path
            ?`<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
                />`
            :`<img
                src="../images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
                />`
        }
                
            </a>
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                <small class="text-muted">Air Date: ${show.first_air_date}</small>
                </p>
            </div>`;
        parent.appendChild(div);
    });
}
async function displayMovieDetails(){
    const movieId=window.location.search.split('=')[1];
    const movie=await fetchData(`movie/${movieId}`);
    const parent=document.querySelector('#movie-details');
    parent.innerHTML=`<div class="details-top">
                        <div>
                        ${
                            movie.poster_path
                            ?`<img
                            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                            class="card-img-top"
                            alt="${movie.title}"
                            />`:
                            `<img
                            src="../images/no-image.jpg"
                            class="card-img-top"
                            alt="${movie.title}"
                            />`
                        }
                        </div>
                        <div>
                            <h2>${movie.original_title}</h2>
                            <p>
                            <i class="fas fa-star text-primary"></i>
                            ${movie.vote_average.toFixed(1)} / 10
                            </p>
                            <p class="text-muted">Release Date: ${movie.release_date}</p>
                            <p>
                            ${movie.overview}
                            </p>
                            <h5>Genres</h5>
                            <ul class="list-group">
                            ${movie.genres.map((genre)=>
                                `<li>${genre.name}</li>`).
                                join('')}
                            </ul>
                            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
                        </div>
                        </div>
                        <div class="details-bottom">
                        <h2>Movie Info</h2>
                        <ul>
                            <li><span class="text-secondary">Budget:</span> ${movie.budget}</li>
                            <li><span class="text-secondary">Revenue:</span>${movie.revenue}</li>
                            <li><span class="text-secondary">Runtime:</span>${movie.runtime}</li>
                            <li><span class="text-secondary">Status:</span>${movie.status}</li>
                        </ul>
                        <h4>Production Companies</h4>
                        <div class="list-group">
                        ${movie.production_companies
                            .map((company)=>`<span>${company.name}, </span>`)
                            .join('')}</div>
                        </div>`;

}

function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            console.log('tv details');
            break;
        case '/search.html':
            console.log('search');
            break;
        }
}

highlightActiveLink();

document.addEventListener('DOMContentLoaded',init);
