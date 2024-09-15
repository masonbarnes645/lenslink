import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { Container, Grid } from "semantic-ui-react";
import PSlate from "./photographerslate";

const Photographers = () =>{
    const [photographers, setPhotographers] = useState([])
    useEffect(() => {
        fetch(`/api/v1/photographers`)
          .then((resp) => {
            if (resp.ok) {
              resp.json().then(setPhotographers);
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
                <PSlate {...photographer} />
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