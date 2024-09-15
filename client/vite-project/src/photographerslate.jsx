import { Grid } from "semantic-ui-react"
import { Link, NavLink } from "react-router-dom"
import './App.css'

const PSlate = ({ first_name, last_name, id, photos }) => {


    return (
        <div>
            <h1>{first_name} {last_name}</h1>
            <NavLink
                to={`/photographers/${id}`}
                style={({ isActive }) => ({
                    fontWeight: isActive ? 'bold' : 'normal',
                    textDecoration: 'none' // Optional: removes underline from links
                })}
            > See More</NavLink>
            <Grid columns={1} doubling stackable>
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <Grid.Column key={photo.id}>
                            <img 
                            className="slate-photo"
                            src={photo.image_url}
                            alt={photo.title}
                            
                            />
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