import './assets/main.css';
import Header from "./components/Header/Header.jsx";
import ChooseFile from "./components/ChooseFile/ChooseFile.jsx";
import SortError from './components/SortError/SortError.jsx';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import UploadButton, { asUploadButton } from "@rpldy/upload-button";
import ResultPage from "./components/ResultPage/ResultPage.jsx";
import AuthPage from "./components/Auth/AuthPage.jsx";
import { useState } from "react";
import { ProtectedRoute } from "./hooks/ProtectedRoute.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
// const hours = 1
// let start
// let end
// let setupTime = localStorage.getItem('setupTime');
// if (setupTime == null) {
//     start = new Date().getMilliseconds()
//     localStorage.setItem('setupTime', start)
//     console.log(start)
// }
//
// let timerId = setInterval(() =>
// {
//     goOut()
// }, 1);
// function goOut() {
//     end += new Date().getMilliseconds()
//     if (end - setupTime > hours * 2 * 1000) {
//         localStorage.clear()
//         // localStorage.setItem('setupTime', now);
//         useNavigate('/login')
//         setTimeout(() => { clearInterval(timerId); alert('Произошел выход из системы'); }, 1);
//     }
// }
//
//

let page, setPage, errorInfo, setErrorInfo;

const delay = 3600000;
function clearLocalStorageAndRedirect() {
    localStorage.clear();
    window.location.href = '/login';
}

function checkTimeElapsed() {
    const timeElapsed = localStorage.getItem('timeElapsed');
    const currentTime = Date.now();

    if (!timeElapsed) {
        localStorage.setItem('timeElapsed', currentTime);
    } else if (currentTime - timeElapsed >= delay) {
        clearLocalStorageAndRedirect();
    }
}

window.onload = () => {
    checkTimeElapsed();
};

setInterval(() => {
    const timeElapsed = localStorage.getItem('timeElapsed');
    const currentTime = Date.now();

    if (timeElapsed) {
        if (currentTime - timeElapsed >= delay) {
            clearLocalStorageAndRedirect();
        }
    }
}, 120000);


export default function App() {
    const [pageState, setPageState] = useState("choose");
    const [errorInfoState, setErrorInfoState] = useState(null);

    page = pageState;
    setPage = setPageState;
    errorInfo = errorInfoState;
    setErrorInfo = setErrorInfoState;
    return (
        <div className='root'>
            <AuthProvider>
                <Routes>

                    <Route path="/login" element={<AuthPage />} ></Route>
                    <Route path="/" element={
                        <ProtectedRoute>
                            {page === "choose" && <ChooseFile onError={(errorData) => {
                                setErrorInfo(errorData);
                                setPage("error");
                            }} />}

                            {page === "error" && <SortError errorInfo={errorInfo} />}
                        </ProtectedRoute>
                    } />
                </Routes>
            </AuthProvider>

        </div>
    )
}


