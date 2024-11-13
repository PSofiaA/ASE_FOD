import './assets/main.css';
import Header from "./components/Header.jsx";
import ChooseFile from "./components/ChooseFile.jsx";
import {Routes, Route, Link} from "react-router-dom";
import Uploady, {useItemProgressListener} from "@rpldy/uploady";
import UploadButton, { asUploadButton } from "@rpldy/upload-button";
import ResultPage from "./components/ResultPage.jsx";


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

            <Header/>

            <ChooseFile/>

            {/*<ResultPage/>*/}

        </div>
    )
}


