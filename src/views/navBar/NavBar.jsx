import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const NavBar = ({optionSelected}) => {

    const navigate = useNavigate();

    const monitorAuthState = async() => {
        onAuthStateChanged(auth, user => {
            if(!user){
                navigate("/login");
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
                <a href="/homepage" onClick={() => navigate("/")} style={optionSelected === 1 ? {backgroundColor: "#000080", color: "#fff"} : null}>home</a>
                <a href="/drivers-register" onClick={() => navigate("/drivers-register")} style={optionSelected === 2 ? {backgroundColor: "#000080", color: "#fff"} : null}>cadastro motoristas</a>
                {/* <a href="/cart" onClick={() => navigate("/cart")} style={optionSelected === 3 ? {backgroundColor: "#000080", color: "#fff"} : null}>carrinho</a> */}
                <a href="/" onClick={handleExit}>sair</a>
            </div>
        </nav>
    </div>
};

export default NavBar;