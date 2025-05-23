
import * as PDFJS from "pdfjs-dist";
import './PDFViewer.css'
import { useCallback, useRef, useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Button, Tag } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

const PdfJs = forwardRef(function PdfJs(_props, ref) {
    const [isLandscape, setIsLandscape] = useState(false);
    const canvasRef = useRef(null);
    const [pdfDoc, setPdfDoc] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    PDFJS.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

    const src = "../public/testPDF.pdf";
    let renderTask;

    useImperativeHandle(ref, () => ({
        currentPage, // чтобы прокинуть текущую страницу в родительский компонент
    }));

    const renderPage = useCallback(
        (pageNum, pdf = pdfDoc) => {
            const canvas = canvasRef.current;
            if (!canvas || !pdf) return;
            canvas.height = 0;
            canvas.width = 0;
            // canvas.hidden = true;
            pdf
                .getPage(pageNum)
                .then((page) => {
                    const viewport = page.getViewport({ scale: 3.5 });
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    setIsLandscape(viewport.width > viewport.height);
                    const renderContext = {
                        canvasContext: canvas.getContext("2d"),
                        viewport: viewport,
                    };
                    try {
                        if (renderTask) {
                            renderTask.cancel();
                        }
                        renderTask = page.render(renderContext);
                        return renderTask.promise;
                        // eslint-disable-next-line no-unused-vars, no-empty
                    } catch (error) { }
                })
                .catch((error) => console.log(error));
        },
        [pdfDoc]
    );

    useEffect(() => {
        renderPage(currentPage, pdfDoc);
    }, [pdfDoc, currentPage, renderPage]);

    useEffect(() => {
        const loadingTask = PDFJS.getDocument(src);
        loadingTask.promise.then(
            (loadedDoc) => {
                setPdfDoc(loadedDoc);
            },
            (error) => {
                console.error(error);
            }
        );
    }, [src]);

    const nextPage = () =>
        pdfDoc && currentPage < pdfDoc.numPages && setCurrentPage(currentPage + 1);

    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    return (
        <div className={`pdfContainer ${isLandscape ? 'landscape' : 'portrait'}`} >
            <canvas ref={canvasRef}></canvas>
            <div className="nav-buttons">
                <Button
                    type="primary"
                    icon={<CaretLeftOutlined />}
                    onClick={prevPage}
                    className="navButton"
                />
                <Tag className="navTag">{currentPage} из {pdfDoc?.numPages ?? 0}</Tag>
                <Button
                    type="primary"
                    icon={<CaretRightOutlined />}
                    onClick={nextPage}
                    className="navButton"
                />

            </div>
        </ div >
    );
})

export default PdfJs;