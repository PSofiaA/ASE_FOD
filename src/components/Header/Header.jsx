import './Header.css';
import {useAuth} from "../../hooks/useAuth.jsx";




export default function Header() {
    const {logout} = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <div className='Header'>

            <img src="./logoApp.png" alt="logo"/>

            <div className="title">Фабрика оцифровки документов</div>

            <div className="exit" onClick={handleLogout}> Выйти</div>
        </div>
    )
}