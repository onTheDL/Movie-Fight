
const createAutoComplete = ({ root }) => {
  root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

  const input = root.querySelector(".input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

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

      option.addEventListener("click", () => {
        //match input value with selection
        input.value = movie.Title;

        //close dropdown widget
        dropdown.classList.remove("is-active");

        //fetch movie id
        onMovieSelect(movie.imdbID);

        //render data
      });

      resultsWrapper.appendChild(option);
    }
    if (!movies.length) {
      dropdown.classList.remove("is-active");
      return;
    }
  };
  input.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
