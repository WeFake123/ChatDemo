import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Interfaz } from "./componentes/interfaz";
import { NewPost } from "./componentes/newPost";
import { Panel } from "./componentes/panel";
import { Post } from "./componentes/post";

import 'bootstrap/dist/css/bootstrap.min.css';

import { API_URL } from "./config";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const socket = io(API_URL); // 👈 SOCKET FUERA DEL COMPONENTE

function App() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

  socket.on("connect", () => {
    console.log("Conectado al socket:", socket.id);
  });

  const hash = localStorage.getItem("authorHash");
  console.log("JOIN ROOM:", hash);

  // solo entrar a la room si existe hash
  if (hash) {
    socket.emit("join_hash_room", hash);
    console.log("JOIN ROOM:", hash);
  }

  socket.on("new_notification", (notif) => {
        console.log("NOTIFICACION RECIBIDA:", notif);


    setNotifications(prev => {
      const updated = [notif, ...prev];
      console.log("NOTIFICACIONES:", updated);
      return updated;
    });

    toast("🔔 Nueva notificación");

  });

  return () => {
    socket.off("new_notification");
  };

}, []);

  return (
    <BrowserRouter>
      <Interfaz notifications={notifications}>
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