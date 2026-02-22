import { useEffect, useState } from "react";
import "./App.css";

import { Texto } from "./componentes/text";
import { Interfaz } from "./componentes/interfaz";
import {NewPost} from "./componentes/newPost"
import { Panel } from "./componentes/panel";
import { Post } from "./componentes/post";


  
export const API_URL = "https://posted-9ped.onrender.com";

function App() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <Interfaz>

      <NewPost />

      {!selectedPost && (
        <Panel setSelectedPost={setSelectedPost} />
      )}

      {selectedPost && (
        <Post
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

    </Interfaz>
  );
}


export default App;
