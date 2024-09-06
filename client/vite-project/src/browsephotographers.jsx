import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Container, Grid } from "semantic-ui-react";
import Slate from "./photographerslate";

const Photographers = () =>{
    const [photographers, setPhotographers] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5555/api/v1/photographers`)
          .then((resp) => {
            if (resp.ok) {
              resp.json().then(setPhotographers);
              console.log(photographers)
            } else {
              resp.json().then((errorObj) => toast.error(errorObj.error));
            }
          })
          .catch((errorObj) => toast.error(errorObj.message));
      },[]);

    return(
    <Container>
    <h1>photographers.</h1>
    <Grid columns={5} doubling stackable>
          {photographers.length > 0 ? (
            photographers.map((photographer) => (
              <Grid.Column key={photographer.id}>
                <Slate {...photographer} />
              </Grid.Column>
            ))
          ) : (
            <h2>No photographers</h2>
          )}
        </Grid>
    </Container>
)

}
export default Photographers