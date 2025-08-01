const global={
    currentPage:window.location.pathname,
    search:{
        term:'',
        type:'',
        page:1,
        totalPages:1,
        totalResults:0
    },
    api:{
        apiKey:'90abe2f31d346c7208b63e226ec32e75',
        apiurl:'https://api.themoviedb.org/3/'
    }
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
    const API_KEY=global.api.apiKey;
    const API_URL=global.api.apiurl;
    const response =  await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data=await response.json();
    hideSpinner();
    return data;
}
async function searchAPIData(){
    showSpinner();
    const API_KEY=global.api.apiKey;
    const API_URL=global.api.apiurl;
    const response =  await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`);
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

function addCommaToNumber(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
                        </div>
                        </div>
                        <div class="details-bottom">
                        <h2>Movie Info</h2>
                        <ul>
                            <li><span class="text-secondary">Budget:</span> $${addCommaToNumber(movie.budget)}</li>
                            <li><span class="text-secondary">Revenue:</span> $${addCommaToNumber(movie.revenue)}</li>
                            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} min</li>
                            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
                        </ul>
                        <h4>Production Companies</h4>
                        <div class="list-group">
                        ${movie.production_companies
                            .map((company)=>`<span>${company.name}, </span>`)
                            .join('')}</div>
                        </div>`;
    displayBackgroundImage(movie.backdrop_path);

}

async function displayShowDetails(){
    const showId=window.location.search.split("=")[1];
    const show=await fetchData(`tv/${showId}`);
    const parent=document.querySelector('#show-details');
    parent.innerHTML=`<div class="details-top">
                        <div>
                            ${
                               show.poster_path?
                                `<img
                                  src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                                  class="card-img-top"
                                  alt="Show Name"
                                />`:
                                `<img
                                  src="../images/no-image.jpg"
                                  class="card-img-top"
                                  alt="Show Name"
                                />`
                            }    
                        </div>
                        <div>
                            <h2>${show.name}</h2>
                            <p>
                            <i class="fas fa-star text-primary"></i>
                            ${show.vote_average.toFixed(1)}/ 10
                            </p>
                            <p class="text-muted">First Air Date:${show.first_air_date}</p>
                            <p>
                                ${show.overview}
                            </p>
                            <h5>Genres</h5>
                            <ul class="list-group">
                            ${
                                show.genres.map((genre)=>`<li>${genre.name}</li>`).join("")
                            }
                            </ul>
                            <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
                        </div>
                        </div>
                        <div class="details-bottom">
                        <h2>Show Info</h2>
                        <ul>
                            <li><span class="text-secondary">Number Of Episodes:</span> ${show.episode_number}</li>
                            <li>
                            <span class="text-secondary">Last Episode To Air:</span> 
                            ${show.last_air_date}
                            </li>
                            <li><span class="text-secondary">Status:</span> ${show.status}</li>
                        </ul>
                        <h4>Production Companies</h4>
                        <div class="list-group">
                        ${
                            show.production_companies.map((company)=>`<span>${company.name}, </span>`).join('')
                        }
                        </div>
                        </div>`;
    displayBackgroundImage(show.backdrop_path);

}


async function search(){
    const queryString=window.location.search;
    const urlParams=new URLSearchParams(queryString);
    global.search.type=urlParams.get('type');
    global.search.term=urlParams.get('search-term');

    if(global.search.term!=='' && global.search.term!==null){
        const {results, total_pages,page,total_results}=await searchAPIData();
        document.querySelector('#search-term').value='';

        global.search.page=page;
        global.search.totalPages=total_pages;
        global.search.totalResults=total_results;


        if(results.length==0){
            showAlert('No result found!');
            return;
        }
        displayResults(results);
    }else{
        showAlert('please enter a search term',"error");
    }
}


function displayResults(results){
    document.querySelector('#search-results').innerHTML='';
    document.querySelector('#search-results-heading').innerHTML='';
    document.querySelector('#pagination').innerHTML='';
            results.forEach((result)=>{
                const div=document.createElement('div');
                div.className='card';
                div.innerHTML=`
                    <a href="${global.search.type}-details.html?id=${result.id}">
                    ${
                        result.poster_path?
                        `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${global.search.type=='movie'?result.title:result.name}" />`
                        :`<img src="images/no-image.jpg" class="card-img-top" alt="${global.search.type=='movie'?result.title:result.name}" />`
                    }  
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${global.search.type=='movie'?result.title:result.name}</h5>
                        <p class="card-text">
                        <small class="text-muted">Release: ${global.search.type=='movie'?result.release_date:result.first_air_date}</small>
                        </p>
                    </div>
                `;
                document.querySelector('#search-results-heading').innerHTML=
                `
                <h2>${results.length} of ${global.search.totalResults} results for ${global.search.term}</h2>
                `;
                document.querySelector('#search-results').appendChild(div);
            });

            displayPagination();
}


function displayPagination(){
    const div=document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML=`
        <button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
          `;

    document.querySelector('#pagination').appendChild(div);


    if(global.search.page==1){
        document.querySelector('#prev').disabled=true;
    }
    if(global.search.page==global.search.totalPages){
        document.querySelector('#next').disabled=true;
    }

    document.querySelector('#next').addEventListener('click',async ()=>{
            global.search.page++;
            const {results, total_pages}=await searchAPIData();
            displayResults(results);
    });
    document.querySelector('#prev').addEventListener('click',async ()=>{
            global.search.page--;
            const {results, total_pages}=await searchAPIData();
            displayResults(results);
    });
}
function showAlert(message,className='error'){
    const alertEl=document.createElement('div');
    alertEl.classList.add('alert',className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);
    setTimeout(()=>{
        alertEl.remove()
    },2000)
}
function displayBackgroundImage(backgroundPath){
    const overlayDiv=document.createElement('div');
    console.log(backgroundPath);
    overlayDiv.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${backgroundPath})`;
    overlayDiv.style.backgroundSize='cover';
    overlayDiv.style.backgroundPosition='center';
    overlayDiv.style.backgroundRepeat='no-repeat';
    overlayDiv.style.height='120vh';
    overlayDiv.style.width='100vw';
    overlayDiv.style.position='absolute';
    overlayDiv.style.top='0';
    overlayDiv.style.left='0';
    overlayDiv.style.zIndex='-1';
    overlayDiv.style.opacity='0.1';

        document.querySelector('.container').append(overlayDiv);
}

async function showSlide(){
    const {results}=await fetchData('movie/now_playing');
        results.forEach((movie)=>{
            const div=document.createElement('div');
            div.className='swiper-slide';
            div.innerHTML=`
                <a href="movie-details.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
                </a>
                <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
                </h4>
            `
            document.querySelector('.swiper-wrapper').appendChild(div);
            initSwiper();
        });
}

function initSwiper(){
const swiper=new Swiper('.swiper',{
    spaceBetween: 30,
    freeMode:true,
    loop:true,
    autoplay:{
        delay:4000,
        disableOnInteraction:true
    },
    breakpoints:{
        500:{
            slidesPerView:2
        },
        700:{
            slidesPerView:3
        },
        1200:{
            slidesPerView:4
        }
    }
})
}
function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
             showSlide();
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            search();
            break;
        }
}

highlightActiveLink();

document.addEventListener('DOMContentLoaded',init);
