const API_KEY = "7bce51db";

const fetchData = async (query) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: API_KEY,
      s: query,
    },
  });

  if (res.data.Error) {
    return []
  }

  return res.data.Search;
};

const input = document.querySelector("input");

const onInput = async (e) => {
  const movies = await fetchData(e.target.value)
  
  for (let movie of movies) {
    const div = document.createElement('div')
    div.innerHTML = `
      <img src="${movie.Poster}" />
      <h1>${movie.Title}</h1>
    `
    document.querySelector('#target').appendChild(div)
  }
};
input.addEventListener("input", debounce(onInput, 500));
