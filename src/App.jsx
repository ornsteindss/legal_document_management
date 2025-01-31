import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import axios from "axios";

const App = () => {
    const docs = [];
    for (let i = 0; i < 10; i++) {
        docs.push({
            title: 'Legal Document ' + i,
            uploadDate: '2025-01-30',
            fileName: 'document1.pdf',
        })
    }
    const [documents, setDocuments] = useState(docs);

    useEffect(() => {
        const storedDocs = JSON.parse(localStorage.getItem("documents")) || [];
        if(storedDocs.length) {
            setDocuments(storedDocs);
        }
    }, []);

    const handleFileUpload = async (file, document) => {
        if (file && file.type === "application/pdf") {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axios.post("http://localhost:8000/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            });
            const newDocs = [...documents];
            const indexOfDocument = documents.indexOf(document);
            console.log(indexOfDocument)
            newDocs[indexOfDocument].fileName = response.data.file.name;
            newDocs[indexOfDocument].uploadDate = response.data.file.date;
            setDocuments(newDocs);
            localStorage.setItem("documents", JSON.stringify(newDocs));
        } catch (error) {
            console.log(error)
            alert("Error uploading file", error);
        }
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    return <Dashboard documents={documents} handleFileUpload={handleFileUpload} />;
};

export default App;