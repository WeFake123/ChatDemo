import { useEffect, useState } from "react";
import "./App.css";
import { Texto } from "./componentes/text";

function App() {
  const [text, setText] = useState([]);
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const enviarMensaje = async (e) => {
    e.preventDefault(); // ⬅️ CLAVE

    if (!nombre || !mensaje) {
      alert("No se permiten campos vacíos");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          text: mensaje,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      const data = await res.json();
      console.log("Mensaje enviado:", data);

      setNombre("");
      setMensaje("");

      // opcional: refrescar mensajes
      setText((prev) => [...prev, data]);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const cargarMensajes = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Error al obtener mensajes");
        }

        const data = await res.json();
        setText(data);
      } catch (error) {
        console.error(error);
      }
    };

    cargarMensajes();
  }, [API_URL]);

  return (
    <>
      <div className="titulo">
        <h1>Linea directa con la/el gordi@</h1>
        <p>nadie puede leer esto (excepto los hackers rusos)</p>
      </div>

      {text.map((item, index) => (
        <Texto key={index} data={item} />
      ))}

      <form onSubmit={enviarMensaje} className="formulario">
        <input
          type="text"
          placeholder="Ingrese el nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Ingrese el mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
