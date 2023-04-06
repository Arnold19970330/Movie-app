//TMDB API

const API_KEY  = 'api_key=dd553e3318cc97cc6801ec930262d703';

const BASE_URL = 'https://api.themoviedb.org/3/';

const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const parentDiv = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');
const genreEl = document.querySelector('.genre-tags');
const tagEl = document.querySelectorAll('.tag');
const loader = document.querySelector('.modalloader');

const nextBtn = document.querySelector('.nextBtn');
const previousBtn = document.querySelector('.previousBtn');
const currentPageEl = document.querySelector('.currentPage')


var currentPage = 1;
var nextPage = 0;
var prevPage = 0;
var totalPages = 100;
var lastUrl = '';

const genres = [
    {
    "id":28,
    "name":"Action"
    },
    {
    "id":12,
    "name":"Adventure"
    },
    {
    "id":16,
    "name":"Animation"
    },
    {
    "id":35,
    "name":"Comedy"
    },
    {
    "id":80,
    "name":"Crime"
    },
    {
    "id":99,
    "name":"Documentary"
    },
    {
    "id":18,
    "name":"Drama"
    },
    {
    "id":10751,
    "name":"Family"
    },
    {
    "id":14,
    "name":"Fantasy"
    },
    {
    "id":36,
    "name":"History"
    },
    {
    "id":27,
    "name":"Horror"
    },
    {
    "id":10402,
    "name":"Music"
    },
    {
    "id":9648,
    "name":"Mystery"
    },
    {
    "id":10749,
    "name":"Romance"
    },
    {
    "id":878,
    "name":"Science Fiction"
    },
    {
    "id":10770,
    "name":"TV Movie"
    },
    {
    "id":53,
    "name":"Thriller"
    },
    {
    "id":10752,
    "name":"War"
    },
    {
    "id":37,
    "name":"Western"
    }
]

setGenre();

var selectedGenre = [];
function setGenre() {
    genres.forEach( genre => {  
        const tagsEl = document.createElement('div');
        tagsEl.classList.add('tag','rounded-full', 'bg-yellow-500', 'text-xl', 'text-blue-900', 'flex', 'justify-center', 'items-center', 'py-2', 'px-4', 'cursor-pointer');
        tagsEl.id = genre.id;
        tagsEl.innerText = genre.name;
        genreEl.appendChild(tagsEl)
        tagsEl.addEventListener('click', () => {
            if( selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            }
            else if( selectedGenre.includes(genre.id)) {
                selectedGenre.forEach((id, idx) => {
                    if(id == genre.id) {
                        selectedGenre.splice(idx, 1)
                    }
                })
            }
            else {
                selectedGenre.push(genre.id)
                //console.log(selectedGenre);
            }
            getPopularMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            setHighLight();
            truncateTitles();
        })
    })
}

function setHighLight() {
    const tags = document.querySelectorAll('.tag')
    tags.forEach(tag => {
        tag.classList.remove('bg-red-500', 'text-white', 'font-bold');
        tag.classList.remove('text-blue-900');
    })
    if(selectedGenre.length != 0) {
        selectedGenre.forEach( id => {
            const selectedTags = document.getElementById(id);
            selectedTags.classList.remove('text-blue-900');
            selectedTags.classList.add('bg-red-500', 'text-white', 'font-bold');
        })
    }
}

function setVoteColor() {
    const rates = document.querySelectorAll('.rate');
    rates.forEach( rate => {
        let num = rate.innerText;
        if(num > 5) {
            rate.classList.add('text-yellow-500');
        } else if(num > 7) {
            rate.classList.add('text-lime-700');
        } else {
            rate.classList.add('text-red-500');
        }
    })
}

function truncateTitles() {
    const titles = document.querySelectorAll('.movietitle');
    titles.forEach( title => {
        const truncate = title.textContent.split(' ');
        console.log(truncate);
        if(truncate.length > 8) {
            title.textContent = truncate.slice(0,8).join(' ') + '...'
        }
    })
}

function showLoader() {
    loader.style.display = 'flex';
    let body = document.querySelector('body');
    body.classList.add('overflow-y-hidden');
    setTimeout(function() {
      body.classList.remove('overflow-y-hidden');
      loader.style.display = 'none';
    },500);
  }

getPopularMovies(API_URL);

function getPopularMovies(url) {
    lastUrl = url
    fetch(url).then( response => response.json().then( data => {
        showLoader();
        console.log(data.results);
        currentPage = data.page;
        console.log(currentPage)
        nextPage = currentPage + 1;
        prevPage = currentPage - 1
        totalPages = data.total_pages
        currentPageEl.innerText = currentPage
        showMovies(data.results);
        setVoteColor();
        truncateTitles();
    }))
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach( movie => {
        //object destructuring
        const {title, vote_average, overview, backdrop_path, original_language, release_date} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('bg-blue-700','rounded-md', 'shadow-2xl', 'relative', 'm-5');
        movieEl.innerHTML =
        `<img class="rounded-tr rounded-tl w-[100%] cursor-pointer" src="${backdrop_path ? IMG_URL + backdrop_path : 'https://picsum.photos/350/197'}" alt="">
        <div class="group relative flex flex-col">
            <div class="movie-info p-4 flex justify-between items-center gap-2">
                <h3 title="${title}" class="movietitle text-sm text-gray-50 font-bold max-w-[60%]">${title}</h3>
                <p class="bg-gray-700 p-2 text-sm lg:text-xl text-white rounded-md font-bold">IMdb: <span class="rate">${Math.floor(vote_average)}<span></p>
            </div>
            <div class="movie-info flex justify-between px-4 text-sm">
                <p class="text-gray-50  font-bold"><span class="text-sm">Language: <span>${original_language}</p>
                <span class="date text-gray-50 rounded-md font-bold">${release_date}</span>
            </div>
            <div class="overview absolute bottom-0 w-full rounded-br rounded-bl font-bold p-4 bg-gray-50 bg-opacity-70 duration-300 transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                ${overview}
            </div>
        </div>`;
        parentDiv.appendChild(movieEl)
    });
}

nextBtn.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        callNextPAge(nextPage);
    }
});

previousBtn.addEventListener('click', () => {
    if (nextPage > prevPage + 1) {
        callNextPAge(prevPage);
    }
});

function callNextPAge(page) {
    let splittedUrl = lastUrl.split('?');
    console.log(splittedUrl)
    let queryParams = splittedUrl[1].split('&');
    console.log(queryParams)
    let lastKey = queryParams[queryParams.length -1].split('=')
    console.log(lastKey)
    if (lastKey[0] != 'page') {
        let newUrl = lastUrl + '&page='+ page
        getPopularMovies(newUrl);
    } else {
        //rebuid the url
        lastKey[1] = page.toString();
        //console.log(key[1])
        let param1 = lastKey.join('=');
        //console.log(param1)
        queryParams[queryParams.length - 1] = param1
        let param2 = queryParams.join('&');
        let url = splittedUrl[0] + '?' + param2;
        getPopularMovies(url);
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    getPopularMovies(SEARCH_URL + '&query=' + searchTerm);
})

