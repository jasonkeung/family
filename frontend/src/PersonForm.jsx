import { useContext, useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ListDivider from '@mui/joy/ListDivider';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import { PeopleContext } from './App';


export function PersonForm() {
    const { peopleMap, setPeopleMap } = useContext(PeopleContext);

    const [fullName, setFullName] = useState("");
    const [mother, setMother] = useState("");
    const [father, setFather] = useState("");

    const addPerson = () => {
        var body = {
            "fields": {
                "fullName": {
                    "stringValue": fullName,
                },
            }
        }
        if (mother != "") {
            body["fields"]["mother"] = {
                "referenceValue": mother
            }
        }
        if (father != "") {
            body["fields"]["father"] = {
                "referenceValue": father
            }
        }
        fetch("https://firestore.googleapis.com/v1/projects/family-81dc0/databases/(default)/documents/people/",
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            var newPeopleMap = {...peopleMap}
            setPeopleMap(Object.assign(newPeopleMap, {[data.name]: data}));
        });
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Input
                size="md"
                placeholder="Full Name"
                onChange={(event) => setFullName(event.target.value)}
                value={fullName}
            />
            <Select 
                size="md"
                placeholder="Mother" 
                onChange={(event, newValue) => {
                    setMother(newValue)
                }}>
                {Object.values(peopleMap).map((person) => {
                    return <Option value={person.name}>
                        {person.fields?.fullName?.stringValue}
                    </Option>
                })}
            </Select>   
            <Select 
                size="md" 
                placeholder="Father"
                onChange={(event, newValue) => {
                    setFather(newValue)
                }}>
                {Object.values(peopleMap).map((person) => {
                    return <Option value={person.name}>
                        {person.fields?.fullName?.stringValue}
                    </Option>
                })}
            </Select> 

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