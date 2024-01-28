import { useContext, useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ListDivider from '@mui/joy/ListDivider';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

import { PeopleContext } from './App';


export function PersonForm() {
    const { peopleList, setPeopleList } = useContext(PeopleContext);

    const [fullName, setFullName] = useState("");
    const [mother, setMother] = useState("");
    const [father, setFather] = useState("");

    const addPerson = () => {
        fetch("https://firestore.googleapis.com/v1/projects/family-81dc0/databases/(default)/documents/people/",
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                "fields": {
                    "name": {
                        "stringValue": fullName,
                    },
                    "mother": {
                        "stringValue": mother,
                    },
                    "father": {
                        "stringValue": father,
                    }
                }
            })
        })
        .then(response => response.json())
        .then(data => setPeopleList([...peopleList, data]));
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Input
                size="md"
                placeholder="Full Name"
                onChange={(event) => setFullName(event.target.value)}
                value={fullName}
            />
            <Input
                size="md"
                placeholder="Mother"
                onChange={(event) => setMother(event.target.value)}
                value={mother}
            />
            <Input
                size="md"
                placeholder="Father"
                onChange={(event) => setFather(event.target.value)}
                value={father}
            />

            <Box sx={{ display: "flex", height: "200px", alignItems: "center", justifyContent: "center"}}>
                Upload pictures here (WIP)
            </Box>
            <ListDivider component="hr" />

            <Button variant="soft" size="md" onClick={() => addPerson()}>
                Add Person
            </Button>
    </Box>
    )
}