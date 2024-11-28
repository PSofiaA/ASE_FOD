import './ChooseFile.css'

import React, {useCallback, useEffect, useRef, useState} from "react";
import Uploady, {useItemProgressListener} from "@rpldy/uploady";
import UploadButton, {asUploadButton} from "@rpldy/upload-button";
import { Line } from "rc-progress";
import "@rpldy/sender";
import axios from "axios";
import Header from "../Header/Header.jsx";

export default function chooseFile() {

    const [upload, setUpload] = useState(0);
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState(0)
    const [sizeUnit, setSizeUnit] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const resetUpload = useCallback(() => {
        setUpload(0)
    }, [setUpload])

    const downloadFile = async () => {
        try {
            const response = await axios.get('http://localhost:8080/download/stream', {
                responseType: 'blob', // Указываем, что ожидаем ответ в формате blob
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
            alert('Ошибка при скачивании файла');
        }
    };


    const processing = () => {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await
                        axios.post('http://localhost:3000/splitFile');
                    // setDocuments(response.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false)
                }
            };
            fetchData();

        }, []);

        if (loading) {
            return <div className="title">Выполняется обработка...</div>
        }

        if (error) {
            return <div className="title">Ошибка: {error}</div>
        }

        return (
            <div className="main-content">
                <div className="title">Документ разделен!</div>
                <div className="documents-area">
                    <div className="document-info">
                        <div className="document-header">
                            <span> Название дока</span>
                            <div className="download">Скачать</div>
                        </div>
                        <p>Код KKS: <span>kks_code</span></p>
                        <p>Тип работ: <span>type_work</span></p>
                        <p>Тип документа: <span>type_document</span></p>
                        <p>Версия документа: <span> version_document</span></p>
                    </div>
                </div>
            </div>
        )
    }
    const LogProgress = () => {

        const [progress, setProgress] = React.useState(0);
        const progressData = useItemProgressListener((item) => {

            if (item.file.type !== "application/pdf") {
                console.error('PDF ONLY');
                alert('Принимаются только PDF файлы');
            }

            if (item.file.type == "application/pdf") {

                if (progressData && progressData.completed > progress) {
                    setProgress(() => progressData.completed)
                }

                console.log(`>>>>> (hook) File ${item.file.name} completed: ${item.completed}`);
                setProgress(item.completed);

                if (item.completed > 0) {
                    setUpload(1);
                }

                setFileName(item?.file.name);
                setFileSize((item?.file.size / 1024).toFixed(2));
                setSizeUnit('KB');

                if (item.completed == 100) {
                    setUpload(2)
                }
            }

            return (
                progressData && (
                    <Line
                        style={{
                            justifySelf: "center",
                            height: "5px",
                            marginTop: "20px",
                            background: "#E6E6E6",
                            display: "flex",
                            width: "300px",
                            borderRadius: "100px",
                        }}
                        strokeColor={progress === 100 ? "#0F6CBD" : "#0F6CBD"}
                        percent={progress}
                    />
                )
            );
        });
    }

        return (
<>

    <Header></Header>
        <div className="main-content">

            <div className="title"> Разделить документ</div>

            {upload == 0 ?
                <>
                    <div className="description"> Выберите отсканированый документ и
                        система разделит его по QR-коду!
                    </div>
                </> : null}


            {upload == 1 ? <>
                <div className="state"> Загрузка...</div>
                <div className="description"> {fileName} ({fileSize} {sizeUnit})</div>
            </> : null}


            <Uploady
                destination={{url: "http://localhost:3000/upload"}}>
                <LogProgress/>
                {upload == 0 ?
                    <>

                        <UploadButton  className="chooseFile" >Выбрать PDF файл</UploadButton>

                    </> : <></>}
            </Uploady>


            {upload == 2 ?
                <>
                    <div className="description"> {fileName} ({fileSize} {sizeUnit})</div>
                    <div className="button-container">
                        <button onClick={resetUpload} className="backButton">←
                        </button>
                        <button onClick={downloadFile} className="splitFile">Разделить</button>
                    </div>
                </> : null
            }

        </div>
</>
    );
}



