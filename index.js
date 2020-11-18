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

let timeoutId;
const onInput = (e) => {
  /*
  if(timeoutId) {
    clearTimeout(timeouteId)
  }
  */

  timeoutId && clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    fetchData(e.target.value);
  }, 500);
};
input.addEventListener("input", onInput);
