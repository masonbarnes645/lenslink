import PhotographerSignUp from "./photographer-signup-modal"
import CustomerSignUp from "./customer-signup-modal"
import { useState } from "react";
import { Button } from "semantic-ui-react";

const Signup = () => {
    const [openModal, setOpenModal] = useState(null); 

    const openCustomerModal = () => setOpenModal('customer');
    const openPhotographerModal = () => setOpenModal('photographer');
    const closeModal = () => setOpenModal(null);
    
    
    return (
        <div>
            <Button onClick={openCustomerModal} primary>
                Customer Sign Up
            </Button>
            <Button onClick={openPhotographerModal} primary>
                Photographer Sign Up
            </Button>
            <CustomerSignUp open={openModal === 'customer'} onClose={closeModal} />
            <PhotographerSignUp open={openModal === 'photographer'} onClose={closeModal} />
        </div>
    )

}

export default Signup




// state for which one is open