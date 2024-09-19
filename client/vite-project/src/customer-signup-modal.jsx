const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password_hash: ''
};

import { Button, Modal, Container, Form as SemanticForm, Message, Grid, Input } from 'semantic-ui-react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import React from 'react';
import toast from "react-hot-toast";
import { useUser } from './usercontext';
import { useNavigate } from 'react-router-dom';




const schema = yup.object().shape({
    first_name: yup.string().required("First Name is Required"),
    last_name: yup.string().required("Last Name is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required")
});

const CustomerSignUp = ({ open, onClose }) => {
    const navigate = useNavigate()
    const { setUser } = useUser();

    const handleFormSubmit = (formData, { setSubmitting }) => {
        fetch("/api/v1/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password,
                role: "customer"
            })
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json().then((data) => {
                        setUser(data)
                        toast.success("Sign Up Successful!")
                        navigate(`/`);
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


            <Modal
                onClose={onClose}
                onOpen={open}
                open={open}
                dimmer='blurring'
                size='large'
                className='sign-up-modal'
            >
                <Modal.Header className='sign-up-header'>Sign Up as Customer</Modal.Header>

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
                                                    <label htmlFor="first_name">First Name</label>
                                                    <Field
                                                        as={Input}
                                                        name="first_name"
                                                        type='text'
                                                        placeholder="First Name"
                                                        fluid
                                                    />
                                                    <ErrorMessage name="first_name" component={Message} negative />
                                                </SemanticForm.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <SemanticForm.Field>
                                                    <label htmlFor="last_name">Last Name</label>
                                                    <Field
                                                        as={Input}
                                                        name="last_name"
                                                        type='text'
                                                        placeholder="Last Name"
                                                        fluid
                                                    />
                                                    <ErrorMessage name="last_name" component={Message} negative />
                                                </SemanticForm.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <SemanticForm.Field>
                                                    <label htmlFor="email">Email</label>
                                                    <Field
                                                        as={Input}
                                                        name="email"
                                                        type='text'
                                                        placeholder="Email"
                                                        fluid
                                                    />
                                                    <ErrorMessage name="email" component={Message} negative />
                                                </SemanticForm.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <SemanticForm.Field>
                                                    <label htmlFor="password">Password</label>
                                                    <Field
                                                        as={Input}
                                                        name="password"
                                                        type='password'
                                                        placeholder="Password"
                                                        fluid
                                                    />
                                                    <ErrorMessage name="password" component={Message} negative />
                                                </SemanticForm.Field>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Button type='submit' fluid primary loading={isSubmitting} disabled={isSubmitting}>
                                                    Sign Up
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
                    <Button color="black" onClick={onClose}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default CustomerSignUp;
