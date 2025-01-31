const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file || req.file.mimetype !== "application/pdf") {
        return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    const fileData = {
        name: req.file.originalname,
        date: new Date().toLocaleDateString(),
    };

    res.json({ message: "File uploaded successfully", file: fileData });
});

app.get("/api/extractions/:documentId", (req, res) => {
    const extractions = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        page: Math.floor(Math.random() * 10) + 1,
        text: `Mock Extraction ${i + 1}`,
    }));

    res.json({ documentId: req.params.documentId, extractions });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});