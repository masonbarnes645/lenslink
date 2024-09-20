import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./usercontext";
import NewBooking from "./NewBookingModal";
import { Container, Grid } from "semantic-ui-react";
import './App.css'


const Portfolio = () => {


  const { user } = useContext(UserContext)

  const userHTML = (
    <Container className="photographer-details">
      <Grid className="photographer-detail-grid">
        {user.photos.length > 0 ? (
          user.photos.map((photo) => (
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

  return (
    <div>
        {user ? userHTML : (
            <>
            </>
        )}
    </div>
);
}

export default Portfolio


