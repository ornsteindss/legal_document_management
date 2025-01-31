import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, selectedDoc, onFileUpload }) => {
    if (!isOpen) return null;
    const [fileName, setFileName] = useState('');
    const [fileSelected, setFileSelected] = useState(false);
    const [file, setFile] = useState(0);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileSelected(true);
            setFile(file);
        } else {
            setFileName('');
            setFileSelected(false);
            setFile(null);
        }
    };

    const handleSubmit = () => {
        onFileUpload(file, selectedDoc);
        onClose();
    };


    return (
        <div className={`modal ${isOpen && 'is-open'}`}>
            <div className="modal-content">
                <div className="modal-header">
                    Modal Window ({selectedDoc && selectedDoc.title})
                </div>
                <div className="upload-form">
                    <label htmlFor="file-upload" className={`upload-button ${fileSelected ? 'file-selected' : ''}`}>
                        <div>
                            {fileSelected ? fileName : 'Choose File'}
                            <p>Available formats: PDF</p>
                        </div>
                    </label>

                    <input
                        id="file-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />

                    <div className="modal-buttons">
                        <button
                            className="submit-btn"
                            onClick={handleSubmit}
                            disabled={!fileSelected}
                        >
                            Submit
                        </button>
                        <button className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;