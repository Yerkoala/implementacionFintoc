import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // Usando ESModules

dotenv.config(); // Cargar las variables de entorno

const app = express();
const port = 3000;

// Aplicar middleware
app.use(cors());
app.use(express.json());

// Ruta simple para probar el servidor
app.get("/", (req, res) => {
    res.send("Soy el servidor");
});

// Ruta para crear un intento de pago
app.post("/create-payment-intent", async (req, res) => {
    try {
        const payment_intent = {
            amount: number(req.body.amount) || 1000,
            currency: 'clp',
            customer_email: req.body.customer_email || "example@gmail.com",
            recipient_account: {
              holder_id: '771433855',
              number: '1836027172',
              type: 'checking_account',
              institution_id: 'cl_banco_de_chile'
            }
          }

        const response = await fetch('https://api.fintoc.com/v1/payment_intents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'sk_test_sFEacaf1gZn9AhT_VqsnV-XYdjTsE_1s' // Clave secreta de testeo
            },
            body: JSON.stringify(payment_intent),
        });

        const data = await response.json();
        res.status(response.ok ? 200 : response.status).json(data); // Devolver la respuesta al cliente



    } catch (error) {
        console.error("Error creando el intento de pago:", error);
        res.status(500).json({ error: "Error creando el intento de pago" });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});
