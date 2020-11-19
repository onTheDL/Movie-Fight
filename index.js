//file contains application specific code
const API_KEY = "7bce51db";

const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
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
}

// Left Side
createAutoComplete({
  ...autoCompleteConfig,

  root: document.querySelector('#left-autocomplete'),

  onOptionSelect(movie) {
    onMovieSelect(
      movie.imdbID,
      document.querySelector('#left-summary'),
      'left',
    );

    document.querySelector('.tutorial').classList.add('is-hidden');
  },
})

// Right Side
createAutoComplete({
  ...autoCompleteConfig,

  root: document.querySelector('#right-autocomplete'),

  onOptionSelect(movie) {
    onMovieSelect(
      movie.imdbID,
      document.querySelector('#right-summary'),
      'right',
    );
    document.querySelector('.tutorial').classList.add('is-hidden');
  },
})

let leftMovie;
let rightMovie;
const onMovieSelect = async (movieID, synopsisTarget, side) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: API_KEY,
      i: movieID,
    },
  });
  console.log(res.data);

  synopsisTarget.innerHTML = movieTemplate(res.data)

  if (side === 'left') {
    leftMovie = res.data
  } else {
    rightMovie = res.data
  }

  if (leftMovie && rightMovie) {
    runComparison()
  }
};

const runComparison = () => {
  console.log('Time for comparison');
}


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
