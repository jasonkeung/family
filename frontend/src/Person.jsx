import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
export const FIELDS = ["fullName"];


export function Person(props) {

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography level="title-md">{props.fields.name?.stringValue}</Typography>
                <Typography>{props.fields.mother?.stringValue}</Typography>
                <Typography>{props.fields.father?.stringValue}</Typography>
            </CardContent>
        </Card>
    )
}
