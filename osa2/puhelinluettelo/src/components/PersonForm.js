
const PersonForm = ({ newName, newNumber, handleName, handleNumber, addName }) => {
   return(
     <form onSubmit={addName}>
     <div>
       Name: <input value={newName} onChange={handleName} />
     </div>
     <div>
       Number: <input value={newNumber} onChange={handleNumber}/>
     </div>
     <div>
       <button type="submit">Add</button>
     </div>
   </form>
   )
 }
 export default PersonForm