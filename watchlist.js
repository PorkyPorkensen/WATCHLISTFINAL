    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    document.addEventListener('DOMContentLoaded', () => {
        
        if (watchlist.length > 0) {
        watchlist.forEach(imdbID => {
        const movieUrl = `https://omdbapi.com/?i=${imdbID}&apikey=8d49ddbd`
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
                    <i onclick="remMovie('${details.imdbID}')" class="fa-solid fa-circle-minus"></i>           
                `
                main.appendChild(movieDiv)
                
                
            })
                document.getElementById('main').innerHTML = ``
                document.getElementById('clearWL').innerHTML =`
                <button class="clearbtn" onclick="clearWatchlist()">Clear Watchlist</button>`
                main.style.marginTop = 0
        })
    }
})

function remMovie(imdbID) {
      let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist = watchlist.filter(id => id !== imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        location.reload(); 
    }
    
function clearWatchlist() {
    localStorage.clear()
    watchlist = []
    main.innerHTML = `
    <h4>Your watchlist is looking a little empty...</h4>
    <div id="asm">
        <p><a href="/homepage.html">Let’s add some movies!<i class="fa-solid fa-circle-plus"></i></a></p>
    </div>`
    if(!confirm("Do you really want to clear your Watchlist?") ){
            e.preventDefault(); // ! => don't want to do this
        } else {
            //want to do this! => maybe do something about it?
            alert('Watchlist Cleared');
        }
}