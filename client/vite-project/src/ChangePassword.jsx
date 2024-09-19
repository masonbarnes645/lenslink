import React, { useContext } from 'react';
import { Modal, Button, Container, Grid, Form as SemanticForm, Input, Message } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import { toast } from 'react-hot-toast'
import { UserContext } from './usercontext';

const initialValues = {
    current_password: "",
    password: ""
};

const schema = yup.object().shape({
    current_password: yup.string().required("Current password is required"),
    password: yup.string().required("New password is required")
});

const ChangePassword = ({ user }) => {
    const [open, setOpen] = React.useState(false);



    const handleCustomerChange = (formData) => {
        fetch(`/api/v1/customers/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                current_password: formData.current_password,
                password: formData.password,
            })
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((userObj) => {
                        console.log(userObj);
                        setOpen(false);
                        toast.success("Password updated successfully");
                    });
                } else {
                    return res.json().then((errorObj) => {
                        toast.error(errorObj.error);
                    });
                }
            })
            .catch((error) => toast.error(error.message));
    };

    const handlePhotographerChange = (formData) => {
        fetch(`/api/v1/photographers/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                current_password: formData.current_password,
                password: formData.password,
            })
        })
            .then((res) => {
                if (res.ok) {
                    res.json().then((userObj) => {
                        console.log(userObj);
                        setOpen(false);
                        toast.success("Password updated successfully");
                    });
                } else {
                    return res.json().then((errorObj) => {
                        toast.error(errorObj.error);
                    });
                }
            })
            .catch((error) => toast.error(error.message));
    };

    const handleChangePassword = (formData, { setSubmitting }) => {
        if (user.role === "customer") {
            handleCustomerChange(formData);
        }
        else if (user.role === "photographer") {
            handlePhotographerChange(formData);
        }
        else {
            toast.error("Unknown role, unable to change password.");
        }
        setSubmitting(false);
    };

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
                        onSubmit={handleChangePassword}
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
                                                <ErrorMessage name="current_password" component="div" className="ui error message" />
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
                                                <ErrorMessage name="password" component="div" className="ui error message" />
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
