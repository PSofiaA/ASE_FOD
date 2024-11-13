import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const FileProcessingPage = () => {
    const history = useHistory();

    useEffect(() => {
        const timer = setTimeout(() => {
            history.push("/result");
        }, 3000); // Замена на реальную логику обработки

        return () => clearTimeout(timer);
    }, [history]);

    return (
        <div className="main-content">
            <div className="title">Обработка файла...</div>
            <div className="description">Пожалуйста, подождите.</div>
        </div>
    );
};

export default FileProcessingPage;
