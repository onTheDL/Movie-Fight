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

  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active");
  for (let movie of movies) {
    const option = document.createElement("a");
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;

    option.classList.add("dropdown-item");
    option.innerHTML = `
      <img src="${imgSrc}" />
      ${movie.Title}
    `;
      
    option.addEventListener('click', () => {
      //match input value with selection
      input.value = movie.Title

      //close dropdown widget
      dropdown.classList.remove('is-active')
    });

    resultsWrapper.appendChild(option);
  }
  if (!movies.length) {
    dropdown.classList.remove('is-active')
    return;
  }
};
input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", e => {
  if (!root.contains(e.target)) {
    dropdown.classList.remove('is-active')
  }
})
