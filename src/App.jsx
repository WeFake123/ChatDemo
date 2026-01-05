
import { useEffect } from 'react'
import './App.css'
import { useState } from 'react';

import { Texto } from './componentes/text';

function App() {

  const [text, setText] = useState([]); // estado para guardar la data

  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");



  const enviarMensaje = (e) => {

    if(nombre == "" || mensaje == ""){
      return(alert("no se permiten campos vacios"))
    }

  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nombre,
      text: mensaje,
    }),
  })
    .then(res => res.json())
    .then(data => {
      console.log("Mensaje enviado:", data);
      setNombre("");
      setMensaje("");
    })
    .catch(err => console.log(err));
};


  useEffect(() => {
    fetch("http://localhost:3000/")
          .then(res => res.json())
          .then(data =>setText(data))
          .then(err => console.log(err))
  }, [])

  


  return (
    <>
    <div class="titulo">
          <h1>Linea directa con la/el gordi@</h1> <p>nadie puede leer esto (excepto los hackers rusos)</p>

    </div>
    {

        text.map((item, index) => (
          <Texto key={index} data={item}/>
        ))

    }

    <form onSubmit={enviarMensaje} class="formulario">
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
  )


}
export default App


