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
    return movie.Title;
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
};

// Left Side
createAutoComplete({
  ...autoCompleteConfig,

  root: document.querySelector("#left-autocomplete"),

  onOptionSelect(movie) {
    onMovieSelect(
      movie.imdbID,
      document.querySelector("#left-summary"),
      "left"
    );

    document.querySelector(".tutorial").classList.add("is-hidden");
  },
});

// Right Side
createAutoComplete({
  ...autoCompleteConfig,

  root: document.querySelector("#right-autocomplete"),

  onOptionSelect(movie) {
    onMovieSelect(
      movie.imdbID,
      document.querySelector("#right-summary"),
      "right"
    );
    document.querySelector(".tutorial").classList.add("is-hidden");
  },
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movieID, synopsisTarget, side) => {
  try {
    const res = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: API_KEY,
        i: movieID,
      },
    });
    console.log(res.data);

    synopsisTarget.innerHTML = movieTemplate(res.data);

    if (side === "left") {
      leftMovie = res.data;
    } else {
      rightMovie = res.data;
    }

    if (leftMovie && rightMovie) {
      runComparison();
    }
  }
  catch(err){
    synopsisTarget.innerHTML = `Error fetching data. Please try another movie.`
    console.error('Error in onMovieSelect() in index.js: ', err)
  }
};

const runComparison = () => {
  // ls = left side
  const lsStats = document.querySelectorAll("#left-summary .notification");

  // rs = right side
  const rsStats = document.querySelectorAll("#right-summary .notification");

  lsStats.forEach((leftStat, idx) => {
    const rightStat = rsStats[idx];

    const lsVal = parseInt(leftStat.dataset.value);
    const rsVal = parseInt(rightStat.dataset.value);

    if (rsVal > lsVal) {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    } else if (rsVal < lsVal) {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    } else {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");

      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    }
  });
};

const movieTemplate = (movieData) => {
  const {
    Title,
    Poster,
    Genre,
    Plot,
    Awards,
    BoxOffice,
    Metascore,
    imdbRating,
    imdbVotes,
  } = movieData;

  // Comparision values
  const dollars = parseInt(BoxOffice.replace(/\$/g, "").replace(/,/g, ""));

  const metascoreVal = parseInt(Metascore);
  const imdbRatingVal = parseFloat(imdbRating);
  const imdbVotesVal = parseInt(imdbVotes.replace(/,/g, ""));

  const awardsVal = Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
        ${Poster !== "N/A" || !Poster ? `<img src=${Poster} />` : ""}
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

    <article data-value=${awardsVal} class="notification is-primary">
      <p class="title">${Awards}</p>
      <p class="subtitle">Awards</p>
    </article>

    <article data-value=${dollars} class="notification is-primary">
      <p class="title">${BoxOffice ? BoxOffice : "N/A"}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metascoreVal} class="notification is-primary">
      <p class="title">${Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRatingVal} class="notification is-primary">
      <p class="title">${imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotesVal} class="notification is-primary">
      <p class="title">${imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
