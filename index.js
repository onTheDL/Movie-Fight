const API_KEY = "7bce51db";

const fetchData = async (query) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: API_KEY,
      s: query,
    },
  });

  if (res.data.Error) {
    return [];
  }
  return res.data.Search;
};

createAutoComplete({
  root: document.querySelector('.autocomplete'),
})
createAutoComplete({
  root: document.querySelector('.autocomplete-two'),
})
createAutoComplete({
  root: document.querySelector('.autocomplete-three'),
})

const onMovieSelect = async (id) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: API_KEY,
      i: id,
    },
  });
  console.log(res.data);
  document.querySelector("#summary").innerHTML = movieTemplate(res.data)
};

const movieTemplate = (movieData) => {
  const { Title, Poster, Genre, Plot, Awards, BoxOffice, Metascore, imdbRating, imdbVotes, } = movieData;
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${Poster ? Poster : ''}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${Title}</h1>
          <h4>${Genre}</h4>
          <p>${Plot}</p>
        </div>
      </div>
    </article>

    <article class="notification is-primary">
      <p class="title">${Awards}</p>
      <p class="subtitle">Awards</p>
    </article>

    <article class="notification is-primary">
      <p class="title">${BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
    
    

  `;
};
