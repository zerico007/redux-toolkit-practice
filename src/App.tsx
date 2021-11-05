import React from "react";
import Posts from "./components/Posts";
import PostForm from "./components/PostForm";
import axios from "axios";
import { insertPosts } from "./redux/resources/posts";
import { useAppDispatch } from "./redux/hooks";
import { useAddPostMutation, useGetPostsQuery } from "./redux/service";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const dispatch = useAppDispatch();

  const { data: postsList, error } = useGetPostsQuery();

  const [addPost] = useAddPostMutation();

  React.useEffect(() => {
    if (postsList && !localStorage.catalogueState) {
      dispatch(insertPosts(postsList));
    }
  });
  return (
    <div className="App" style={{ width: "90%", margin: "auto" }}>
      <PostForm makePost={addPost} />
      <hr />
      <Posts />
      {error && <div>Error in fetching posts</div>}
    </div>
  );
}

export default App;
