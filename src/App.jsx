import { useEffect, useState } from "react";
import "./App.css";

import { Texto } from "./componentes/text";
import { Interfaz } from "./componentes/interfaz";
import {NewPost} from "./componentes/newPost"
import { Panel } from "./componentes/panel";


  
export const API_URL = "http://localhost:3000/";

function App() {
  const [text, setText] = useState([]);


  //  const API_URL = import.meta.env.VITE_API_URL;


  //--------

  return (
    <>
        <Interfaz>
        
              <NewPost/>

              <Panel/>

              
        </Interfaz>
  </>)
}

export default App;
