require("dotenv").config();
const express = require("express");
const multer = require("multer");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const cvParserControllers = require("./controllers/cvParser.controllers");

const upload = multer({ storage: multer.memoryStorage() });

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "CV Parser API",
      version: "1.0.0",
      description: "APIs for CV Parser",
    },
    servers: [
      {
        url: "http://localhost:5088",
      },
      {
        url: "https://cv-parser.cyclic.app",
      },
    ],
  },
  apis: ["./app.js"],
};

const port = process.env.PORT;

const app = express();
app.use(express.json());

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Home
app.get("/", (req, res) => {
  res.json({ message: `Go to '/api/v1/docs'` });
});

// Endpoint 0
app.get("/api/v1", (req, res) => {
  res.json({ message: `Go to '/cv-parser'` });
});

// Endpoint 1 (Main)
/**
 * @swagger
 * /api/v1/cv-parser:
 *   post:
 *     tags:
 *       - CV Parser
 *     summary: Converts a text-based-PDF CV to JSON
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
app.post(
  "/api/v1/cv-parser",
  upload.single("file"),
  cvParserControllers.pdfCv2JsonParser
);

// Endpoint 2
/**
 * @swagger
 * /api/v1/text-based-pdf-parser:
 *   post:
 *     tags:
 *       - Extra
 *     summary: Converts a text-based-PDF to TEXT
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
app.post(
  "/api/v1/text-based-pdf-parser",
  upload.single("file"),
  cvParserControllers.pdf2TextParser
);

// image-to-text
// app.post("/api/v0/image-parser", upload.single("file"), (req, res) => {
//   res.json({ message: "I am an image to text parser" });
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
