import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Interfaz } from "./componentes/interfaz";
import { NewPost } from "./componentes/newPost";
import { Panel } from "./componentes/panel";
import { Post } from "./componentes/post";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Interfaz>
        <NewPost />

        <Routes>
          <Route path="/" element={<Panel />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>

      </Interfaz>
    </BrowserRouter>
  );
}

export default App;