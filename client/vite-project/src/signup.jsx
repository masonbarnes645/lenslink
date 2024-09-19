import PhotographerSignUp from "./photographer-signup-modal"
import CustomerSignUp from "./customer-signup-modal"
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import './App.css'


const Signup = () => {
    const [openModal, setOpenModal] = useState(null); 

    const openCustomerModal = () => setOpenModal('customer');
    const openPhotographerModal = () => setOpenModal('photographer');
    const closeModal = () => setOpenModal(null);
    
    return (
        <div className="signup-container">
            <h1 className="signup-heading">Become a Part of LensLink!</h1>
            <img src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=600" alt="LensLink" className="signup-image" />
            <div className="signup-buttons">
                <Button onClick={openCustomerModal} primary className="signup-button">
                    Customer Sign Up
                </Button>
                <Button onClick={openPhotographerModal} primary className="signup-button">
                    Photographer Sign Up
                </Button>
            </div>
            <CustomerSignUp open={openModal === 'customer'} onClose={closeModal} />
            <PhotographerSignUp open={openModal === 'photographer'} onClose={closeModal} />
        </div>
    );
    
    

}

export default Signup




// state for which one is open