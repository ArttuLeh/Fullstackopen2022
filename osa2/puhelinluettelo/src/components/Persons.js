
const Persons = ({ filterPerson, deletePerson }) => {
   return (
     <div>
       {filterPerson.map(person =>
         <li key={person.name} person={person}>
         {person.name} {person.number} <button onClick={() => deletePerson(person.id)} >Delete</button>
         </li>
         )}
     </div>
   )
 }
 export default Persons