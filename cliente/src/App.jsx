import React, { useState } from 'react';
import FintocWidget from './FintocWidget';

const App = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('CLP');
  const [customerEmail, setCustomerEmail] = useState('');
  const [widgetTokenPago, setWidgetTokenPago] = useState(null); 
  const [showWidget, setShowWidget] = useState(false);

  const publicKey = "pk_test_sf1wCNNKKpftW9BAK3a3XC4R5yVvvtny";


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Información del payment intent
    const paymentIntentData = {
      amount: amount, // Convertir a unidades más pequeñas
      currency: "clp",
      customer_email: "yerkolatex68@gmail.com"
    };

    // Enviar al backend para crear el payment intent
    const response = await fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentIntentData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      // Almacenar el widgetToken y mostrar el widget
      setWidgetTokenPago(data.widget_token);
      setShowWidget(!false);

    } else {
      console.error('Error creando el payment intent:', response.status);
    }
  };

  const handleWidgetSuccess = () => {
    console.log("Pago exitoso");
    // Lógica para cuando el pago es exitoso
  };

  const handleWidgetExit = () => {
    console.log("Widget cerrado");
    // Lógica para cuando se cierra el widget
  };

  return (
    <div>
      <iframe
        src="https://lumalabs.ai/embed/59197ab1-6a90-4f65-9721-e647fc6c87cd?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false"
        width="281"
        height="400"
        title="luma embed"
        style={{ borderRadius: "15px", boxShadow: "2px 2px 10px black" }}
      />

      <h2>Realizar un pago</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Monto (en CLP):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Correo electrónico del cliente:</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </div>
        <button type="submit">Pagar</button>
      </form>

      {showWidget && (
        <FintocWidget
          widgetTokenPago={widgetTokenPago} // Token para inicializar el widget                                                             
          publicKey={publicKey} // Clave pública
          onSuccess={handleWidgetSuccess} // Callback para éxito
          onExit={handleWidgetExit} // Callback para salida
        />
      )}
    </div>
  );
};

export default App;
