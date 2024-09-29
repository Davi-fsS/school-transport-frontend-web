import NavBar from "../navBar/NavBar";
import logo from "../../assets/image.png";
import styles from "./style.module.scss";

const Homepage = () => {
    
    return <>
        <NavBar optionSelected={1}/>
        <div className={styles.container}>
            <div className={styles.content}>
                <h3>Bem vindo ao</h3>
                <img className={styles.logo} src={logo}/>
            </div>
        </div>
    </>
};

export default Homepage;