
const Country = ({ country }) => {
   
   return (
      <div>
        {country.map((country, index) =>
        <div key={index}><h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages).map((lang, index) =>
              <li key={index}>
                {lang}
              </li>
            )}
          </ul>
          <img src={country.flags.png} alt={country.name.common} style={{height: 150, width: 200, border: '1px solid black'}} />
        </div>
        )}
      </div>
   )
}
export default Country