const callToApi = () => {
  return fetch("https://dev.adalab.es/api/random/word")
    .then((response) => response.json())
    .then((data) => {
      return data.word;
    });
};

export default callToApi;
