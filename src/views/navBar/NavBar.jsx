import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Home, Logout, PersonAdd, School } from "@mui/icons-material";

const NavBar = ({optionSelected}) => {

    const navigate = useNavigate();

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
                logo
            </div>
            <div className={styles.navItemsContainer}>
                <Home onClick={() => navigate("/homepage")} className={styles.icon} style={optionSelected === 1 ? {backgroundColor: "#000080", color: "#fff"} : null} titleAccess="Home"/>
                <PersonAdd onClick={() => navigate("/drivers-register")} className={styles.icon} style={optionSelected === 2 ? {backgroundColor: "#000080", color: "#fff"} : null} titleAccess="Cadastro motoristas"/>
                <School onClick={() => navigate("/school")} className={styles.icon} style={optionSelected === 3 ? {backgroundColor: "#000080", color: "#fff"} : null} titleAccess="Escolas"/>
                <Logout onClick={handleExit} className={styles.icon} titleAccess="Sair"/>
            </div>
        </nav>
    </div>
};

export default NavBar;