import React from 'react';
import { Modal, Button, Container, Grid, Form as SemanticForm, Input, Message } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";

const initialValues = {
    "current_password": "",
    "password": ""
}

const schema = yup.object().shape({
    password: yup.string().required("Password is Required"),  
    password: yup.string().required("Password is Required")
  });
const ChangePassword = ( ) => {
    const [open, setOpen] = React.useState(false);

    
    return (
        <Container>
            <Button onClick={() => setOpen(true)} primary>
                Change Password
            </Button>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                dimmer='blurring'
                size='large'
            >
                <Modal.Header>Update Password</Modal.Header>
                <Modal.Content>
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
                                                <label htmlFor="current_password">Current Password</label>
                                                <Field
                                                    name="current_password"
                                                    type='password'
                                                    placeholder="Current Password"
                                                    as={Input}
                                                    fluid
                                                />
                                                <ErrorMessage name="current_password" component={Message} negative />
                                            </SemanticForm.Field>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <SemanticForm.Field>
                                                <label htmlFor="password">New Password</label>
                                                <Field
                                                    name="password"
                                                    type='password'
                                                    placeholder="New Password"
                                                    as={Input}
                                                    fluid
                                                />
                                                <ErrorMessage name="password" component={Message} negative />
                                            </SemanticForm.Field>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Button type='submit' fluid primary loading={isSubmitting} disabled={isSubmitting}>
                                                Update Password
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="black" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </Container>
    );
};

export default ChangePassword;
