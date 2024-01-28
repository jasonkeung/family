import { createContext, useContext, useEffect, useState } from 'react'
import Box from '@mui/joy/Box'
import './App.css'
import { Person } from './Person';
import { PersonForm } from './PersonForm';

export const PeopleContext = createContext();

function App() {

  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    fetch("https://firestore.googleapis.com/v1/projects/family-81dc0/databases/(default)/documents/people/")
      .then(response => response.json())
      .then(data => {
        setPeopleList(data.documents)
      })

  }, []);

  console.log(peopleList)


  return (
    <>
        <Box sx={{ padding: "50px", bgcolor: "primary.600", borderRadius: "20px"}}>
            Add a new person
            <PeopleContext.Provider value={{peopleList, setPeopleList}}>
                <PersonForm/>
            </PeopleContext.Provider>
        </Box>
        <br/>
        {peopleList.map(person => <Person key={person.name} fields={person.fields}/>)}
    </>
  )
}

export default App
