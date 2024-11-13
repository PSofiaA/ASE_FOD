import '../assets/Header.css';


export default function Header() {
    return (
        <div className='Header'>

            <img src="./logoApp.png" alt="logo"/>

            <div className="title">Фабрика оцифровки документов</div>

            <div className="exit"> Выйти</div>
        </div>
    )
}