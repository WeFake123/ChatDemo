import { useEffect, useState } from "react";
import "./App.css";
import { Texto } from "./componentes/text";
import { Interfaz } from "./componentes/interfaz";
import {NewPost} from "./componentes/newPost"

import {enviarMensaje, cargarMensajes} from "./appFunctions"

function App() {
  const [text, setText] = useState([]);
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  // const API_URL = import.meta.env.VITE_API_URL;
  const API_URL = "http://localhost:3000"


  useEffect(() => {
    cargarMensajes();
  }, [API_URL]);

  return (
    <>
        <Interfaz>
          
              <NewPost/>

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
              
        </Interfaz>
  </>)
}

export default App;
