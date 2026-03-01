import { useEffect, useState } from "react";
import { Post } from "./post"
import { API_URL } from "../../config";
import { io } from "socket.io-client";


const socket = io(API_URL);

import "./styles/panel.css"
import Spinner from 'react-bootstrap/Spinner';



export const Panel = ({ setSelectedPost }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState([])
    const [isNewPost, setIsNewPost] = useState(false)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
    socket.on("connect", () => {
    });

    socket.on("nuevo_post", (nuevoPost) => {
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
            .then(data => {
            setPosts(data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);






    return (

        <div>
            <div className="cargarPost-contenedor">
            {isNewPost ? <p className="cargarPost" onClick={() =>  {setIsNewPost(false);
                                            setPosts(prev => [...prev, ...newPost]);
                                            setNewPost([]);}
            }>Cargar nuevos Post</p> : null}
            </div>


            {loading ?           <div className="spinner-div"> 
                                        <Spinner animation="border" className="spinner" role="status" variant="light">
                                        </Spinner> 
                                    </div>
                                     : null}

        <div className="panel">
            
  

            {
            posts.map(post => (

                <div className="image_panel" onClick={() => setSelectedPost(post)} key={post.id}>

                    {post.image && (
                        <img className="imagen_post"
                            src={post.image}
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
