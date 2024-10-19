import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { AccountCircle, DeviceHub, DirectionsCar, Home, Logout, PersonAdd, School } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const NavBar = ({optionSelected}) => {

    const navigate = useNavigate();

    const {userData} = useContext(AuthContext);

    const monitorAuthState = async() => {
        onAuthStateChanged(auth, user => {
            if(!user){
                navigate("/");
            }
        });
    };

    monitorAuthState();

    const handleExit = async() => {
        await signOut(auth);
    };

    return <div className={styles.navBarContainer}>
        <nav>
            <div className={styles.logoContainer}>
                <AccountCircle style={{fontSize: "2rem"}}/>
                {userData?.name}
            </div>
            <div className={styles.navItemsContainer}>
                <Home onClick={() => navigate("/homepage")} className={styles.icon} style={optionSelected === 1 ? {backgroundColor: "#C36005", color: "#fff"} : null} titleAccess="Home"/>
                <PersonAdd onClick={() => navigate("/driver")} className={styles.icon} style={optionSelected === 2 ? {backgroundColor: "#C36005", color: "#fff"} : null} titleAccess="Cadastro motoristas"/>
                <School onClick={() => navigate("/school")} className={styles.icon} style={optionSelected === 3 ? {backgroundColor: "#C36005", color: "#fff"} : null} titleAccess="Escolas"/>
                <DirectionsCar onClick={() => navigate("/vehicle")} className={styles.icon} style={optionSelected === 4 ? {backgroundColor: "#C36005", color: "#fff"} : null} titleAccess="Veículos"/>
                <DeviceHub onClick={() => navigate("/device")} className={styles.icon} style={optionSelected === 5 ? {backgroundColor: "#C36005", color: "#fff"} : null} titleAccess="Dispositivo"/>
                <Logout onClick={handleExit} className={styles.icon} titleAccess="Sair"/>
            </div>
        </nav>
    </div>
};

export default NavBar;