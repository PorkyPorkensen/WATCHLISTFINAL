const searchBar = document.getElementById('searchBar')
const main = document.getElementById('main')
const movieArea = document.getElementById('movieArea')

function searchMovies(){

    
    fetch(`https://omdbapi.com/?s=${searchBar.value}&apikey=8d49ddbd`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                renderMovies(data.Search);
            } else {
                main.innerHTML = `<h1>Please search a movie</h1>`
            }
        })
    }

function renderMovies(movies) {
    main.innerHTML = ``
    
    movies.forEach(movie => {
        const movieUrl = `https://omdbapi.com/?i=${movie.imdbID}&apikey=8d49ddbd`
            fetch(movieUrl)
        .then(res => res.json())
        .then(details => {
            const movieDiv = document.createElement('div')
            movieDiv.classList.add('movDiv')
            movieDiv.innerHTML = 
            `

                <img class='poster'src=${details.Poster}>
                <div class='movInfo'>
                    <h3>${details.Title}</h3>
                    <p><strong>Released:</strong> ${details.Released} <strong>Rated:</strong> ${details.Rated} <strong>Director:</strong> ${details.Director} <strong>Runtime:</strong> ${details.Runtime}
                    <p>${details.Plot}</p
                    <h4><img id="imdb" src="/IIMDB.png"> <strong>${details.Ratings[0].Value}</strong> 🍅 <strong>${details.Ratings[1].Value}</strong> </h4>
                    <p></p>
                </div>
                <i onclick="storeMovie('${details.imdbID}')" class="fa-solid fa-circle-plus"></i>
         
            `
            main.appendChild(movieDiv)
                
         })
    })


     }
     
    let watchlist = []
     function storeMovie(imdbID) {
        watchlist.push(imdbID)
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        console.log(localStorage)
        alert('Movie saved to Watchlist');

     }
     