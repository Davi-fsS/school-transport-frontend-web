import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

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
                <a onClick={() => navigate("/homepage")} style={optionSelected === 1 ? {backgroundColor: "#000080", color: "#fff"} : null}>home</a>
                <a onClick={() => navigate("/drivers-register")} style={optionSelected === 2 ? {backgroundColor: "#000080", color: "#fff"} : null}>cadastro motoristas</a>
                <a onClick={() => navigate("/school")} style={optionSelected === 3 ? {backgroundColor: "#000080", color: "#fff"} : null}>escolas</a>
                <a onClick={handleExit}>sair</a>
            </div>
        </nav>
    </div>
};

export default NavBar;