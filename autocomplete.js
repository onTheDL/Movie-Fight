// file contains reusable code

const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {
  root.innerHTML = `
    <label><b>Search</b></label>
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
    const items = await fetchData(e.target.value);

    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");

    for (let item of items) {
      const option = document.createElement("a");
      const imgSrc = item.Poster === "N/A" ? "" : item.Poster;

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);

      option.addEventListener("click", () => {
        //match input value with selection
        input.value = inputValue(item);

        //close dropdown widget
        dropdown.classList.remove("is-active");

        //fetch object id
        onOptionSelect(item);
      });
      //render data
      resultsWrapper.appendChild(option);
    }
    if (!items.length) {
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
