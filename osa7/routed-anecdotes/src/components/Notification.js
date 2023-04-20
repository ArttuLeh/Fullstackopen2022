const Notification = ({ notification }) => {
   /*const style = {
     border: 'solid',
     padding: 10,
     borderWidth: 1,
     marginBottom: 5
   }*/
 
   if (notification === ''){
     return null
   }
   return (
     <div>
       <strong>{notification}</strong>
     </div>
   )
 }
 export default Notification