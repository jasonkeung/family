import { createContext, useContext, useEffect, useState } from 'react'
import Box from '@mui/joy/Box'
import './App.css'
import { Person } from './Person';
import { PersonForm } from './PersonForm';

export const AppContext = createContext();

function App() {
  const [peopleMap, setPeopleMap] = useState({});

  useEffect(() => {
    fetch("https://firestore.googleapis.com/v1/projects/family-81dc0/databases/(default)/documents/people/")
      .then(response => response.json())
      .then(data => {
        var newPeopleMap = {}
        data.documents.forEach(document => {
            newPeopleMap[document.name] = document;
        })
        setPeopleMap(newPeopleMap);
      })

  }, []);


  return (
    <>
        <AppContext.Provider value={{peopleMap, setPeopleMap}}>
            <Box sx={{ padding: "50px", bgcolor: "primary.600", borderRadius: "20px"}}>
                Add a new person
                <PersonForm/>
            </Box>
            <br/>
            {Object.values(peopleMap).map(person => <Person key={person.name} fields={person.fields}/>)}
        </AppContext.Provider>
    </>
  )
}

export default App
