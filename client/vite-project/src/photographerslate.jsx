import { Grid } from "semantic-ui-react"


const PSlate = ({ first_name, last_name, id, photos }) => {


    return (
    <div>
        <h1>{first_name} {last_name}</h1>
        <Grid columns={5} doubling stackable>
        {photos.length > 0 ? (
        photos.map((photo) => (
            <Grid.Column key={photo.id}>
                <img src={photo.image_url} />
            </Grid.Column>
        ))
        ) : (
        <h2>No photographers</h2>
        )}
    </Grid>
  </div>


)

}
export default PSlate