import React, { useState } from "react";
import Modal from "./../components/Modal";

const Dashboard = ({ documents, handleFileUpload }) => {
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [showModal, setShowModal] = useState(false);


    return (
        <div className="dashboard">
            <div className="documents-container">
                {documents.map((doc, index) => (
                    <div 
                        key={index} 
                        onClick={() => {
                            setSelectedDoc(doc ? doc : null);
                            setShowModal(true);
                        }}
                        className="document"
                    >
                        <h2>{doc.title} </h2>
                        <div className="divider"></div>
                        <p><strong>Uploaded On:</strong> {doc.uploadDate}</p>
                        <p><strong>File Name:</strong> {doc.fileName}</p>
                    </div>
                ))}
            </div>
            <Modal
                isOpen={showModal}
                selectedDoc={selectedDoc}
                onClose={() => setShowModal(false)}
                onFileUpload={handleFileUpload}
            />
        </div>
    );
};

export default Dashboard;