import Header from "../Header/Header.jsx";
import PDFViewer from "../PDFViewer/PDFViewer.jsx";
import './SortError.css'
import DropdownMenu from "./dropdownMenu/DropdownMenu.jsx";
import { Button, Input, Radio } from "antd";
import { useState, useRef } from "react";

const SortError = () => {
    const [isDefaultOption, setIsDefaultOption] = useState(true);
    const [currentErr, setCurrentErr] = useState(0);
    const [totalErr, setTotalErr] = useState(0);
    const pdfPageRef = useRef();

    const onChange = (e) => {
        setIsDefaultOption(e.target.value);
    };

    return (
        <div>
            <Header />
            <div className="errorBlockContainer">
                <div className="errorBlockTitleContainer">
                    <div className="errorBlockTitle">При сортировке документов была обнаружена ошибка!</div>
                </div>
                <div className="contentContainer">
                    <PDFViewer ref={pdfPageRef} />
                    <div className="errorBlockMenuCol">
                        <div className="errorMessageBlock">
                            <div className="errorMessageMain">
                                <span>
                                    {`Ошибка ${currentErr}/${totalErr}`}
                                </span>
                            </div>
                            <div className="errorMessageHighlighted">
                                <span>
                                    {"QR-код на странице не был\nраспознан!"}
                                </span>
                            </div>
                        </div>
                        <div className="errorHandlerBlock">
                            <Radio.Group onChange={onChange} value={isDefaultOption} className="errorHandlerRadioGroup">
                                <div className="errorMessageMain" id='optionAdd'>
                                    <Radio value={true} />
                                    <span>
                                        {"Добавить страницу к отсортированному\nдокументу"}
                                    </span>
                                </div>
                                <div className="dropdownContainer">
                                    <DropdownMenu isDisabled={!isDefaultOption} />
                                </div>
                                <div className="errorMessageMain" id='optionCreate'>
                                    <Radio value={false} />
                                    <span>
                                        или создать новый документ
                                    </span>
                                </div>
                            </Radio.Group>

                            <div className="docPropertiesContainer">
                                <div className="selectProp">
                                    <label>Код ККС:
                                    </label>
                                    <Input name="KKSCode" className="selectInput" placeholder="Text" disabled={isDefaultOption} />
                                </div>
                                <div className="selectProp">
                                    <label>Вид работ:
                                    </label>
                                    <Input name="workType" className="selectInput" placeholder="Text" disabled={isDefaultOption} />
                                </div>
                                <div className="selectProp">
                                    <label>Вид документа:
                                    </label>
                                    <Input name="docType" className="selectInput" placeholder="Text" disabled={isDefaultOption} />
                                </div>
                                <div className="selectProp">
                                    <label>Версия документа:
                                    </label>
                                    <Input name="docVersion" className="selectInput" placeholder="Text" disabled={isDefaultOption} />
                                </div>
                            </div>

                            <div style={{ padding: '10px 10px' }}>
                                <Button className="baseButton"><span>Сохранить</span></Button>
                            </div>
                            <div className="navBlock">
                                <Button className="baseButton"><span>Предыдущая ошибка</span></Button>
                                <Button className="baseButton" id='highlighted'><span>Следующая ошибка</span></Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div >
    );
};

export default SortError;