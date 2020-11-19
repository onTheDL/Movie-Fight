//file contains application specific code

const API_KEY = "7bce51db";

//helper function specific to this application
createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
  },
  onOptionSelect(movie) {
    onMovieSelect(movie.imdbID)
  },
  inputValue(movie) {
    return movie.Title
  },
  async fetchData(query) {
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
  },
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
        ${(Poster !== 'N/A' || !Poster) ? `<img src=${Poster} />`: ''}
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
      <p class="title">${BoxOffice ? BoxOffice : 'N/A'}</p>
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
