import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { useContext } from 'react';
import { PeopleContext } from './App';
export const FIELDS = ["fullName"];


export function Person(props) {
    const {peopleMap} = useContext(PeopleContext)
    const fields = props.fields;
    const mother = peopleMap[fields?.mother?.referenceValue]
    const father = peopleMap[fields?.father?.referenceValue]

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography level="title-md">{fields?.fullName?.stringValue}</Typography>
                <Typography>Mother: {mother?.fields.fullName.stringValue}</Typography>
                <Typography>Father: {father?.fields.fullName.stringValue}</Typography>
            </CardContent>
        </Card>
    )
}
