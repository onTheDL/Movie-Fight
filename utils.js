const debounce = (func, delay = 1000) => {
  let timeoutId;

  return (...args) => {
    timeoutId && clearTimeout(timeoutId);
    /*
    if(timeoutId) {
      clearTimeout(timeouteId)
    }
    */
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);

    return timeoutId;
  };
};