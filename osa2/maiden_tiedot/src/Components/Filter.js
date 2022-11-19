import Country from './Country'

const Filter = ({ countries, setCountry }) => {

   if (countries.length > 10) {
      return ((<p>Too many matches, specify another filter</p>))
   } else if (countries.length === 1) {
      return (
         <Country country={countries} />
      )
   } else {
      return (
      <div>
         {countries.map((country, index) =>
         <p key={index}>
         {country.name.common} <button onClick={() => setCountry([country])}>show</button>
         </p>
         )}
      </div>
      )
   }
}
export default Filter