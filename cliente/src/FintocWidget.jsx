import { useEffect } from "react";

const FintocWidget = ({ widgetTokenPago, publicKey, onSuccess, onExit }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.fintoc.com/v1/";
    script.onload = () => {
      const widget = Fintoc.create({
        holderType: 'individual',
        widgetToken: widgetTokenPago,
        product: 'payments',
        country: 'cl',
        publicKey: 'pk_test_sf1wCNNKKpftW9BAK3a3XC4R5yVvvtny',
        onSuccess: onSuccess,
      });

      widget.open(); // Abrir el widget
    };

    document.body.appendChild(script); // Añadir el script al DOM
    return () => {
      document.body.removeChild(script); // Limpiar el script al desmontar
    };
  }, [widgetTokenPago, publicKey, onSuccess, onExit]);

  return null; // El componente no necesita contenido visual
};

export default FintocWidget;
