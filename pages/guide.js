import Header from "../components/Header"
import Footer from "../components/Footer"
import Guide from "../components/Guide"
import styles from "../styles/Guide.module.css"

export default function GuidePage() {
    return (
        <div className={styles.container}>
            <Header />
            <Guide />
            <Footer />
        </div>
    )
}