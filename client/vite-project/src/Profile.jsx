import { useContext, useState } from "react";
import { UserContext } from './usercontext';
import Signup from "./Signup";
import Bslate from "./BookingSlate";
import { Container, Grid, Button, Confirm } from "semantic-ui-react";
import ChangePassword from "./ChangePassword";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    
    const show = () => {setOpen(true)}

    const handleDeleteCustomer = () => {
        fetch(`/api/v1/customers/${user.id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (res.ok) {
                setUser(null)
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
            navigate('/')
        } else if (user.role === "photographer") {
            handleDeletePhotographer();
            navigate('/')
        } else {
            toast.error("Unknown role, unable to delete account.");
        }
    };


    const userHTML = (
        <Container className="profile-container">
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
            <Button color="red" onClick={show} className="SU-modal-button">
                Delete Account
            </Button>
            <Confirm
                open={open}
                onCancel={() => setOpen(false)}
                onConfirm={handleDeleteAccount} />
            <ChangePassword user={ user }/>
        </Container>
    );



    return (
        <div>
            {user ? userHTML : (
                <>
                    <h2>Not a Member yet? Sign up:</h2>
                    <Signup user={ user }/>
                </>
            )}
        </div>
    );
};

export default Profile;
