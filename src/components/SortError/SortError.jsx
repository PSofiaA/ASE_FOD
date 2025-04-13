import Header from "../Header/Header.jsx";
import PDFViewer from "../PDFViewer/PDFViewer.jsx";
import './SortError.css'
import DropdownMenu from "./dropdownMenu/DropdownMenu.jsx";
import { Input, Radio } from "antd";
import { useState } from "react";

const SortError = () => {
    const [isDefaultOption, setIsDefaultOption] = useState(true);

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
                    <div className="errorBlockPageCol">
                        <div className="pdfContainer">
                            <PDFViewer />
                        </div>
                    </div>
                    <div className="errorBlockMenuCol">
                        <div className="errorMessageBlock">
                            <div className="errorMessageMain">
                                <span>
                                    Ошибка 1 / 52
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
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default SortError;