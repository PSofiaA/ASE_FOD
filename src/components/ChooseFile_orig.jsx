import '../assets/MainContent.css'

import React, {useEffect} from "react";
import Uploady, {useItemProgressListener} from "@rpldy/uploady";
import UploadButton, {asUploadButton} from "@rpldy/upload-button";
import { Line } from "rc-progress";
import "@rpldy/sender";



export default function chooseFile() {

    const LogProgress = () => {
        const [progress, setProgress] = React.useState(0);
        const progressData = useItemProgressListener((item) => {
            if (progressData && progressData.completed > progress) {
                setProgress(() => progressData.completed)
            }

            console.log(`>>>>> (hook) File ${item.file.name} completed: ${item.completed}`);
            setProgress(item.completed)

        });

        return (
            progressData && (
                <Line
                    style={{
                        display: "flex",
                        justifySelf: "center",
                        height: "5px",
                        marginTop: "20px",
                        width: "300px",
                        background: "#E6E6E6",
                        borderRadius: "100px",
                }}
                    strokeColor={progress === 100 ? "#0F6CBD": "#0F6CBD"}
                    percent={progress}
                />
            )
        );
    };




    return (
        <div className="main-content">

            <div className="title"> Разделить документ</div>

            <div className="description"> Выберите документ и система всё сделает</div>

            <Uploady
                destination={{ url: "http://localhost:3000/upload" }}>
                <LogProgress/>
                <UploadButton className="chooseFile">
                    Выбрать PDF файл </UploadButton>
            </Uploady>
        </div>
    )
}


