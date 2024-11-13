import '../../assets/MainContent.css';

import React, { useEffect } from "react";
import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { Line } from "rc-progress";
import "@rpldy/sender";


function resetProgress() {
    let progress;
    progress = 0
    let percent;
    percent = 0
}
export default function ChooseFile() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        if (progress > 0 && progress < 100) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [progress]);

    const LogProgress = () => {
        useItemProgressListener((item) => {
            if (item.completed > progress) {
                setProgress(item.completed);
            }

            console.log(`>>>>> (hook) File ${item.file.name} completed: ${item.completed}`);
        });

        return (
            (progress > 0 &&
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
                    strokeColor={progress === 100 ? "#0F6CBD": "#E6E6E6" } // Дублирование но без изменений
                    percent={progress}
                />
            )
        )
    };

    return (
        <div className="main-content">
            <div className="title">Разделить документ</div>
            <div className="description">Выберите документ и система всё сделает</div>
            <Uploady destination={{ url: "http://localhost:3000/upload" }}>
                <LogProgress />
                <UploadButton className="chooseFile">
                    Выбрать PDF файл
                </UploadButton>
            </Uploady>
        </div>
    );
}

