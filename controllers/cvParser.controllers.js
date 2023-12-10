const parsePdf = require("pdf-parse");
const parseCv = require("../services/parseCv");

const pdf2TextParser = async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({
      success: false,
      error: "No file was uploaded. Please ensure a PDF file is attached.",
    });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({
      success: false,
      error: "Invalid file format. Please upload a PDF file.",
    });
  }

  try {
    let fileBuffer = new Uint8Array(req.file.buffer);

    const { text } = await parsePdf(fileBuffer);

    res.status(200).json({
      success: true,
      data: text,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: { message: "Internal server error" },
    });
  }
};

const pdfCv2JsonParser = async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({
      success: false,
      error: "No file was uploaded. Please ensure a PDF file is attached.",
    });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({
      success: false,
      error: "Invalid file format. Please upload a PDF file.",
    });
  }

  try {
    let fileBuffer = new Uint8Array(req.file.buffer);

    const { text } = await parsePdf(fileBuffer);

    const data = await parseCv(text);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: { message: "Internal server error" },
    });
  }
};

module.exports = {
  pdf2TextParser,
  pdfCv2JsonParser,
};
