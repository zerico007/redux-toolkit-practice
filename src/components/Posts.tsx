import { useAppSelector } from "../redux/hooks";

export default function Posts() {
  const posts = useAppSelector((state) => state.catalogue.posts);
  return (
    <div>
      <h1>Posts</h1>
      {posts &&
        posts.map((post, i) => (
          <div key={i}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
}
