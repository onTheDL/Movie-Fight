const API_KEY = "7bce51db";

const fetchData = async (query) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: API_KEY,
      s: query,
    },
  });
  console.log(res.data);
};

const input = document.querySelector("input");

const onInput = (e) => {
  fetchData(e.target.value)
};
input.addEventListener("input", debounce(onInput, 500));
