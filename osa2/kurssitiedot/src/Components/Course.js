 
const Header = ({ course }) => <h2>{course}</h2>
 
const Total = ({ parts }) => {
   const total = parts.reduce((s, p) => {
     return s + p.exercises
   },0)
 
   return (
     <div>
       <b>Total of {total} exercises</b>
     </div>
   )
 }
 
const Part = ({ part }) => 
   <p>
     {part.name} {part.exercises}
   </p>
 
const Content = ({ parts }) => 
   <>
     {parts.map(part =>
       <Part key={part.id} part={part} />
       )}
   </>

const Course = ({ course }) => {
   return (
     <>
       <Header course={course.name} />
       <Content parts={course.parts} />
       <Total parts={course.parts} />
     </>
   )
 }

export default Course