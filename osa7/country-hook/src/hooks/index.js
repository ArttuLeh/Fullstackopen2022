import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
   const [value, setValue] = useState('')
 
   const onChange = (event) => {
      setValue(event.target.value)
   }
   return {
      type,
      value,
      onChange
   }
}

export const useCountry = (name) => {
   const [country, setCountry] = useState(null)
 
   useEffect(() => {
      const url = `https://restcountries.com/v2/name/${name}?fullText=true`
      if (name) {
         axios.get(url)
            .then(response => {
               const found = true
               setCountry({ ...response, found })
         })
         .catch(error => {
            console.log(error)
            const found = false
            setCountry({ found })
         })
      }
   }, [name])
   return country
}