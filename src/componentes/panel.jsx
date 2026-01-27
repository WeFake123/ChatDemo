import { useEffect, useState } from "react";
import { API_URL } from "../App";
import { Post } from "./post"


import "./styles/panel.css"

export const Panel = ({ setSelectedPost }) => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        fetch(API_URL)
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
    );
};
