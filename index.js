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

const root = document.querySelector(".autocomplete");
root.innerHTML = `
  <label><b>Search for a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;
const input = document.querySelector(".input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async (e) => {
  const movies = await fetchData(e.target.value);

  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const option = document.createElement("a");
    option.classList.add('dropdown-item')
    option.innerHTML = `
      <img src="${movie.Poster}" />
      ${movie.Title}
    `;
    resultsWrapper.appendChild(option);
  }
};
input.addEventListener("input", debounce(onInput, 500));

/*
<div class="dropdown is-active">
        <input />
        <div class="dropdown-menu">
          <div class="dropdown-content">
            <a class="dropdown-item">Movie 1</a>
            <a class="dropdown-item">Movie 2</a>
            <a class="dropdown-item">Movie 3</a>
          </div>
        </div>
      </div>
      <div id="target"></div>
*/
