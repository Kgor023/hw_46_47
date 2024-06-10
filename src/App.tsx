import { useEffect, useState } from "react";

import { getPostThunk, addPost, deletePost } from "./store/post.slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store";

export default function App() {
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const posts = useSelector((state: any) => state.post.posts);
  const loading = useSelector((state: any) => state.post.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostThunk());
  }, [dispatch]);

  const handlerAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: titleText,
      body: bodyText,
    };
    dispatch(addPost(newPost));
    setTitleText("");
    setBodyText("");
  };

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id));
  };

  return (
    <>
      <div style={{display:'flex', flexDirection:'column',gap:'10px', width:'140px',marginBottom: "20px", border: "2px solid black", padding:'10px' }}>
        <input
          type="text"
          onChange={(event) => setTitleText(event.target.value)}
          placeholder="Type title"
          value={titleText}
        />
        <input
          type="text"
          onChange={(event) => setBodyText(event.target.value)}
          placeholder="Type body"
          value={bodyText}
        />

        <button onClick={handlerAddPost}>Add task</button>
      </div>
      {loading && <h1>Loading...post</h1>}
      {!loading &&
        posts.map((post: any) => (
          <div
            style={{ border: "2px solid black", marginBottom: "20px" }}
            key={post.id}
          >
            <h1>{post.title}</h1>
            <h3>{post.body}</h3>
            {}
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </div>
        ))}
    </>
  );
}
