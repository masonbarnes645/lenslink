import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./usercontext";
import NewBooking from "./NewBookingModal";
import { Container, Grid } from "semantic-ui-react";
import './App.css'


const PhotographerDetails = () => {
  const { photographerId } = useParams();
  const [photographer, setPhotographer] = useState(null)
  const { user } = useContext(UserContext)

  useEffect(() => {

    fetch(`/api/v1/photographers/${photographerId}`)
      .then((resp) => {
        if (resp.ok) {
          return resp.json().then((data) => {
            console.log(data)
            setPhotographer(data);
          });
        } else {
          return resp.json().then(() => {
            resp.json().then((errorObj) => toast.error(errorObj.error));
          });
        }
      })
      .catch((errorObj) => toast.error(errorObj.error));
  }, [photographerId, user]);

  if (photographer)
    return (
      <Container className="photographer-details">
        <h1>{photographer.first_name}</h1>
        <NewBooking photographerId={photographerId} name={photographer.first_name} />
        <Grid className="photographer-detail-grid">
          {photographer.photos.length > 0 ? (
            photographer.photos.map((photo) => (
              <Grid.Column key={photo.id}>
                <img
                  className="slate-photo"
                  src={photo.image_url}
                  alt={photo.title}

                />
              </Grid.Column>
            ))
          ) : (
            <Grid.Column>
            <h2>No photographers</h2>
            </Grid.Column>
          )}
        </Grid>

      </Container>
    )
}

export default PhotographerDetails


