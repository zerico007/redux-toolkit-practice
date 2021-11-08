import { useAppSelector } from "../redux/hooks";

export default function Posts() {
  const posts = useAppSelector((state) => state.catalogue.posts);

  function Post({ post, index }) {
    return (
      <div key={index}>
        <h2>{post.title}</h2>
        <h3>{post.id}</h3>
        <p>{post.body}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Posts</h1>
      {posts && posts.map((post, i) => <Post key={i} index={i} post={post} />)}
    </div>
  );
}
