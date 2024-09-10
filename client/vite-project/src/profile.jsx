import { useContext } from "react";
import { UserContext } from './usercontext';
import Signup from "./signup";
import Bslate from "./bookingslate";
import { Container, Grid, Button } from "semantic-ui-react";

const Profile = () => {
    const { user } = useContext(UserContext);

    const handleDeleteCustomer = () => {
        fetch(`/api/v1/customers/${user.id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (res.ok) {
                toast.success("Account Deleted");
                navigate('/');
            } else {
                return res.json().then((errorObj) => {
                    toast.error(errorObj.error);
                });
            }
        })
        .catch((errorObj) => toast.error(errorObj.error));
    };

    const handleDeletePhotographer = () => {
        fetch(`/api/v1/photographers/${user.id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (res.ok) {
                toast.success("Account Deleted");
                navigate('/');
            } else {
                return res.json().then((errorObj) => {
                    toast.error(errorObj.error);
                });
            }
        })
        .catch((errorObj) => toast.error(errorObj.error));
    };

    const handleDeleteAccount = () => {
        if (user.role === "customer") {
            handleDeleteCustomer();
        } else if (user.role === "photographer") {
            handleDeletePhotographer();
        } else {
            toast.error("Unknown role, unable to delete account.");
        }
    };

    const userHTML = (
        <Container>
            <h1>My Bookings</h1>
            <Grid columns={5} doubling stackable>
                {user && user.bookings && user.bookings.length > 0 ? (
                    user.bookings.map((booking) => (
                        <Grid.Column key={booking.id}>
                            <Bslate {...booking} />
                        </Grid.Column>
                    ))
                ) : (
                    <h2>No bookings found</h2>
                )}
            </Grid>
            <Button color="red" onClick={handleDeleteAccount}>
                Delete Account
            </Button>
        </Container>
    );

    return (
        <div>
            {user ? userHTML : (
                <>
                    <h2>Not a Member yet? Sign up:</h2>
                    <Signup />
                </>
            )}
        </div>
    );
};

export default Profile;