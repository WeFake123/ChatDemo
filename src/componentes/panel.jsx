import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import { io } from "socket.io-client";
import Spinner from "react-bootstrap/Spinner";
import "./styles/panel.css";

const socket = io(API_URL);

export const Panel = () => {

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState([]);
  const [isNewPost, setIsNewPost] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ========================= */
  /* SOCKET NUEVOS POSTS       */
  /* ========================= */

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket conectado");
    });

    socket.on("nuevo_post", (nuevoPost) => {
      setNewPost((prev) => [...prev, nuevoPost]);
      setIsNewPost(true);
    });

    return () => {
      socket.off("connect");
      socket.off("nuevo_post");
    };
  }, []);

  /* ========================= */
  /* TRAER POSTS               */
  /* ========================= */

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* ========================= */
  /* RENDER                    */
  /* ========================= */

  return (
    <div>

      {/* Botón cargar nuevos posts */}
      <div className="cargarPost-contenedor">
        {isNewPost && (
          <p
            className="cargarPost"
            onClick={() => {
              setIsNewPost(false);
              setPosts((prev) => [...newPost, ...prev]);
              setNewPost([]);
            }}
          >
            Cargar nuevos Post
          </p>
        )}
      </div>

      {/* Spinner */}
      {loading && (
        <div className="spinner-div">
          <Spinner
            animation="border"
            className="spinner"
            role="status"
            variant="light"
          />
        </div>
      )}

      {/* Panel de posts */}
      <div className="panel">
        {posts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            className="image_panel"
            key={post.id}
          >
            {post.image && (
              <img
                className="imagen_post"
                src={post.image}
                alt="post"
                width="250"
                height="250"
              />
            )}

            <h2 className="name_post">{post.name}</h2>
          </Link>
        ))}
      </div>

    </div>
  );
};