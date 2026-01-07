import { useEffect, useState } from "react";
import { API_URL } from "../App";

import "./panel.css"

export const Panel = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    return (

        
        <div className="panel">
            {posts.map(post => (

                <div className="image_panel" key={post.id}>

                    {post.image && (
                        <img
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
    );
};
