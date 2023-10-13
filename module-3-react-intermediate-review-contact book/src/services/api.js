const callToApi = () => {
  return fetch(
    'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/contacts-v1/contacts.json'
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
      //SI HAY QUE LIMPIAR LOS DATOS
      // const result = data.map((serie) => {
      // return {
      // id: serie.show.id,
      // name: serie.show.name,
      // };
      // });
      // return result;
    });
};

export default callToApi;
