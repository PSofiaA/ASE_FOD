import './assets/main.css';
import Header from "./components/Header/Header.jsx";
import ChooseFile from "./components/ChooseFile/ChooseFile.jsx";
import {Routes, Route, Link} from "react-router-dom";
import Uploady, {useItemProgressListener} from "@rpldy/uploady";
import UploadButton, { asUploadButton } from "@rpldy/upload-button";
import ResultPage from "./components/ResultPage/ResultPage.jsx";
import AuthPage from "./components/Auth/AuthPage.jsx";
import {useState} from "react";
import {ProtectedRoute} from "./hooks/ProtectedRoute.jsx";
import {AuthProvider} from "./hooks/useAuth.jsx";


export default function App() {

    // const LogProgress = () => {
    //     useItemProgressListener((item) => {
    //         console.log(`>>>>> (hook) File ${item.file.name} completed: ${item.completed}`);
    //     });
    //
    //     return null;
    // }



    return (
        <div className='root'>
            <AuthProvider>
            <Routes>
               <Route path="/login" element={<AuthPage/>} ></Route>
                <Route path="/" element={
                    <ProtectedRoute>
                        <ChooseFile></ChooseFile>
                    </ProtectedRoute>
                } />
            </Routes>
            </AuthProvider>

        </div>
    )
}


