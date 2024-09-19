
import { Button, Modal, Container, Form as SemanticForm, Message, Grid, Input } from 'semantic-ui-react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useContext } from 'react';
import toast from "react-hot-toast";
import { UserContext } from './usercontext';
import './App.css'


const schema = yup.object().shape({
    session_length: yup.number()
      .required('Session length is required')
      .positive('Session length must be a positive number')
      .moreThan(0, 'Session length must be greater than zero'),
    booking_date: yup.date()
      .required('Booking date is required')
      .min(new Date(), 'Booking date cannot be in the past'),
    location: yup.string()
      .required('Location is required')
      .min(3, 'Location must be at least 3 characters long')
  });
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };
  

const NewBooking = ({ photographerId, name }) =>{
    const [open, setOpen] = React.useState(false);
    const { user } = useContext(UserContext)
    const handleFormSubmit = (formData, { setSubmitting }) => {
        fetch("/api/v1/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customer_id: user.id,
                photographer_id: photographerId,
                session_length: formData.session_length,
                location: formData.location, 
                booking_date: formData.booking_date,
                booking_time: formData.booking_time
            })
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json().then((data) => {
                        toast.success("Session Booked!")
                        setOpen(false); 
                    });
                } else {
                    return resp.json().then((errorObj) => {
                        toast.error(errorObj.error);
                    });
                }
            })
            .catch((errorObj) => {
                toast.error(errorObj.error);
            })
            .finally(() => setSubmitting(false));
    };
  return( 
   <div>
    <Button onClick={() => setOpen(true)} primary className='top-button'>Book a session with {name}    </Button>

    <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        dimmer='blurring'
        size='large'
        className='sign-up-modal'

    >
        <Modal.Header className='sign-up-header'>Book a Session</Modal.Header>

        <Modal.Content>
            <Container text>
            <Formik
    initialValues={initialValues}
    validationSchema={schema}
    onSubmit={async (values, actions) => {
        await handleFormSubmit(values, actions);
    }}
>
    {({ isSubmitting }) => (
        <Form>
            <Grid columns={1} stackable>
                <Grid.Row>
                    <Grid.Column>
                        <SemanticForm.Field>
                            <label htmlFor="session_length">Session Length (hours)</label>
                            <Field
                                as={Input}
                                name="session_length"
                                type="number"
                                placeholder="Session Length"
                                fluid
                                step="0.5"
                            />
                            <ErrorMessage name="session_length" component={Message} negative />
                        </SemanticForm.Field>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <SemanticForm.Field>
                            <label htmlFor="location">Location</label>
                            <Field
                                as={Input}
                                name="location"
                                type="text"
                                placeholder="Location"
                                fluid
                            />
                            <ErrorMessage name="location" component={Message} negative />
                        </SemanticForm.Field>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <SemanticForm.Field>
                            <label htmlFor="booking_time">Booking Time</label>
                            <Field
                                as={Input}
                                name="booking_time"
                                type="time"
                                placeholder="Booking Time"
                                fluid
                                min="08:00"  
                                max="20:00" 
                            />
                            <ErrorMessage name="booking_time" component={Message} negative />
                        </SemanticForm.Field>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <SemanticForm.Field>
                            <label htmlFor="booking_date">Booking Date</label>
                            <Field
                                as={Input}
                                name="booking_date"
                                type="date"
                                placeholder="Booking Date"
                                fluid
                            />
                            <ErrorMessage name="booking_date" component={Message} negative />
                        </SemanticForm.Field>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Button type='submit' fluid primary loading={isSubmitting} disabled={isSubmitting} className='SU-modal-button'>
                            Book Now
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    )}
</Formik>
            </Container>
        </Modal.Content>
        <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)} className='SU-modal-button'>
                Cancel
            </Button>
        </Modal.Actions>
    </Modal>
</div>
);
}

export default NewBooking

// location, date, time, photographer(params), type of booking, booking length, customer(session id)

// add what types of bookings photographer offers to the model.