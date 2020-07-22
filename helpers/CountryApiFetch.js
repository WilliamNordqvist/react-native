 const countryApiFetch = async () =>  {
    try {
     const response = await fetch('https://restcountries.eu/rest/v2/all');
     const json = await response.json();
     let names = json.map((i) => i.name);
     return names;
   }
   catch (error) {
     console.error(error);
   }
};

export default countryApiFetch