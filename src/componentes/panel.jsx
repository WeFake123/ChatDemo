import { useEffect, useState } from "react";
import { Post } from "./post"
import { API_URL } from "../../config";
import { io } from "socket.io-client";


const socket = io(API_URL);

import "./styles/panel.css"



export const Panel = ({ setSelectedPost }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState([])
    const [isNewPost, setIsNewPost] = useState(false)



    useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor: post", socket.id);
    });

    socket.on("nuevo_post", (nuevoPost) => {
      console.log("post recibido en front:", nuevoPost);
      setNewPost(prev => [...prev, nuevoPost]);
      setIsNewPost(true)
    });

    return () => {
      socket.off("connect");
      socket.off("nuevo_post");
    };

  }, []);

    useEffect(() => {
        fetch(`${API_URL}/inicio`)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);
    console.log(posts)
    const reversed = [];

    for (let i = posts.length - 1; i >= 0; i--) {
    reversed.push(posts[i]);
    }





    return (

        <div>
            <div className="cargarPost-contenedor">
            {isNewPost ? <p className="cargarPost" onClick={() =>  {setIsNewPost(false);
                                            setPosts(prev => [...prev, ...newPost]);
                                            console.log(newPost);
                                            setNewPost([]);}
            }>Cargar nuevos Post</p> : null}
            </div>



        <div className="panel">
            




            {
            reversed.map(post => (

                <div className="image_panel" onClick={() => setSelectedPost(post)} key={post.id}>

                    {post.image && (
                        <img className="imagen_post"
                            src={`${API_URL.replace(/\/$/, "")}/uploads/${post.image}`}
                            alt="post"
                            width={"250px"}
                            height={"250px"}
                        />
                    )}
                    <h2 className="name_post" >{post.name}</h2>
                </div>
            ))}

        </div>
        </div>
        
    );
};
