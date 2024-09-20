import { Button, Modal, Container, Form as SemanticForm, Message, Grid, Input } from 'semantic-ui-react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useContext } from 'react';
import toast from "react-hot-toast";
import { UserContext } from './usercontext';
import './App.css'

const schema = yup.object().shape({
    image_url: yup.string().url('Must be a valid URL').required('Image URL is required'),
    title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters long'),
    description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters long')
});

const initialValues = {
    image_url: '',
    title: '',
    description: ''
};

const NewPhotoModal = ({ photographerId }) => {
    const [open, setOpen] = React.useState(false);
    const { user } = useContext(UserContext);

    const handleFormSubmit = (formData, { setSubmitting }) => {
        fetch("/api/v1/photographs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                photographer_id: user.id,
                image_url: formData.image_url,
                title: formData.title,
                description: formData.description,
            })
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json().then((data) => {
                        toast.success("Photo Uploaded!");
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

    return (
        <div>
            <Button onClick={() => setOpen(true)} primary className="SU-modal-button">Upload a Photo</Button>

            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                dimmer='blurring'
                size='large'
                className='photo-upload-modal'
            >
                <Modal.Header className='modal-header'>Upload Photo</Modal.Header>
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
                                                    <label htmlFor="image_url">Image URL</label>
                                                    <Field
                                                        as={Input}
                                                        name="image_url"
                                                        type="text"
                                                        placeholder="Image URL"
                                                        fluid
                                                    />
                                                    <ErrorMessage name="image_url" component={Message} negative />
                                                </SemanticForm.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <SemanticForm.Field>
                                                    <label htmlFor="title">Title</label>
                                                    <Field
                                                        as={Input}
                                                        name="title"
                                                        type="text"
                                                        placeholder="Title"
                                                        fluid
                                                    />
                                                    <ErrorMessage name="title" component={Message} negative />
                                                </SemanticForm.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <SemanticForm.Field>
                                                    <label htmlFor="description">Description</label>
                                                    <Field
                                                        as={Input}
                                                        name="description"
                                                        type="text"
                                                        placeholder="Description"
                                                        fluid
                                                    />
                                                    <ErrorMessage name="description" component={Message} negative />
                                                </SemanticForm.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Button
                                                    type='submit'
                                                    fluid
                                                    primary
                                                    loading={isSubmitting}
                                                    disabled={isSubmitting}
                                                    className='modal-button'
                                                >
                                                    Upload Photo
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
                    <Button color="black" onClick={() => setOpen(false)} className='modal-button'>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default NewPhotoModal;
