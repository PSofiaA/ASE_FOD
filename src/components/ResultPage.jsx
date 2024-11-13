import React, {useEffect, useState} from "react";
import "../assets/MainContent.css"
import "../assets/ResultPage.css"
import axios from 'axios'

const ListDocuments = [
    {
        "docName": "Sas",
        "sizeDoc": "123",
        "kksCode": "213213",
        "typeWork": "321",
        "typeDoc": "Paper",
        "versionDoc": "20241010"
    },
    {
        "docName": "Anna",
        "sizeDoc": "150",
        "kksCode": "213214",
        "typeWork": "322",
        "typeDoc": "Digital",
        "versionDoc": "20241011"
    },
    {
        "docName": "Boris",
        "sizeDoc": "200",
        "kksCode": "213215",
        "typeWork": "323",
        "typeDoc": "Report",
        "versionDoc": "20241012"
    },
    {
        "docName": "Elena",
        "sizeDoc": "175",
        "kksCode": "213216",
        "typeWork": "324",
        "typeDoc": "Paper",
        "versionDoc": "20241013"
    },
    {
        "docName": "Dmitry",
        "sizeDoc": "180",
        "kksCode": "213217",
        "typeWork": "325",
        "typeDoc": "Digital",
        "versionDoc": "20241014"
    },
    {
        "docName": "Irina",
        "sizeDoc": "190",
        "kksCode": "213218",
        "typeWork": "326",
        "typeDoc": "Report",
        "versionDoc": "20241015"
    },
    {
        "docName": "Sergey",
        "sizeDoc": "160",
        "kksCode": "213219",
        "typeWork": "327",
        "typeDoc": "Paper",
        "versionDoc": "20241016"
    },
]


function ResultPage()
{
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await
                    axios.get('http://localhost:3000/result');
                setDocuments(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        };
        fetchData();

    },[]);

    if (loading) {
        return <p>Загрузка...</p>
    }

    if (error) {
        return  <p>Ошибка: {error}</p>
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
                {ListDocuments.map((props, index) => (
                    <div key={index} className="document-info">
                        <div className="document-header">
                            <span> {props.docName} ({props.sizeDoc})</span>
                            <button className="download" datasrc="{props.linkDoc}">Скачать</button>
                        </div>
                        <p>Код KKS: <span>{props.kksCode}</span></p>
                        <p>Тип работ: <span>{props.typeWork}</span></p>
                        <p>Тип документа: <span>{props.typeDoc}</span></p>
                        <p>Версия документа: <span>{props.versionDoc}</span></p>
                    </div>
                ))
                }
                {documents.map((props) => (
                    <div key={props.id} className="document-info">
                        <div className="document-header">
                            <span> {props.docName} ({props.sizeDoc})</span>
                            <button className="download" datasrc="{props.linkDoc}">Скачать</button>
                        </div>
                        <p>Код KKS: <span>{props.kksCode}</span></p>
                        <p>Тип работ: <span>{props.typeWork}</span></p>
                        <p>Тип документа: <span>{props.typeDoc}</span></p>
                        <p>Версия документа: <span>{props.versionDoc}</span></p>
                    </div>
                ))
                }
                <div className="downloadArchive"> Скачать все архивом</div>
            </div>
        </div>

    );
}

export default ResultPage;
