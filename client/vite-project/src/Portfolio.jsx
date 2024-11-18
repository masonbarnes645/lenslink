import { Button, Container, Grid } from "semantic-ui-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./usercontext";
import './App.css';
import toast from "react-hot-toast";

const Portfolio = () => {
  const { user } = useContext(UserContext);
  const [photos, setPhotos] = useState([]);


  useEffect(() => {
    if (user && user.photos) {
      setPhotos(user.photos);
    }
  }, [user]);

  const handleDelete = (photoId) => {
    fetch(`/api/v1/photographs/${photoId}`, {
      method: 'DELETE',
    })
      .then((resp) => {
        if (resp.ok) {
          setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
          toast.success("Picture Removed ")
        } else {
          resp.json().then((error) => {
            console.error(error);
          });
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const userHTML = (
    <Container className="port-container">
      <Grid  >
        {photos.length > 0 ? (
          photos.map((photo) => (
            <Grid.Column key={photo.id}>
              <img
                className="portfolio-photo"
                src={photo.image_url}
                alt={photo.title}
              />
              <Button 
                color="red" 
                onClick={() => handleDelete(photo.id)} 
                className="SU-modal-button"
              >
                Delete Photo
              </Button>
            </Grid.Column>
          ))
        ) : (
          <Grid.Column>
            <h2>No photographs</h2>
          </Grid.Column>
        )}
      </Grid>
    </Container>
  );

  return (
    <div>
      {user ? userHTML : <p>Loading...</p>}
    </div>
  );
}

export default Portfolio;
