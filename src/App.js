import { useState } from "react";

function App() {

  const [country, setCountry] = useState([])

  const getCountries = async () => {
    const url = "http://localhost:3001/get-countries";


    try {
      const response = await fetch(url, {
        method: "POST"
      });

      const responseText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseText, "text/xml");
      console.log(xmlDoc);
      const countryElements = xmlDoc.getElementsByTagName("m:sName")
      console.log(countryElements[0].textContent)
      if (countryElements.length > 0) {
        setCountry(Array.from(countryElements).map(element => element.textContent))
      }
    } catch (error) {
      console.error("Erro na requisição SOAP", error);
    }
  };

  return (
    <div className="App">
      <button onClick={getCountries}>Obter Lista de Países</button>
      {country.map(country => (
        <p>{country}</p>
      ))}
    </div>
  );
}

export default App;
