import { Button, Container, Form as SemanticForm, Message, Grid, Input } from 'semantic-ui-react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from './usercontext';



const schema = yup.object().shape({
    email: yup.string().required("Email is Required"),
    password: yup.string().required("Password is Required")
  });

const Login = () => {
    const initialValues = {
        email: '',
        password: '' 
    };
    const {  setUser } = useContext(UserContext);

    const handleFormSubmit = (formData, { setSubmitting }) => {
        fetch("/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            })
        })
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then((data) => {
                        setUser(data)
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
                                                    Log In
                                                </Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Container>
)




}

export default Login