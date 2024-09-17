import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./usercontext";
import NewBooking from "./newbookingmodal";
import { Grid } from "semantic-ui-react";

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
      <div>
        <h1>{photographer.first_name}</h1>
        <NewBooking photographerId={photographerId} />
        <Grid className="photo-slate">
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
            <h2>No photographers</h2>
          )}
        </Grid>

      </div>
    )
}

export default PhotographerDetails


