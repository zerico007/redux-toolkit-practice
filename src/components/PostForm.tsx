import React from "react";
import styled from "styled-components";
import { addPost } from "../redux/resources/posts";
import { useAppDispatch } from "../redux/hooks";

const StyledInput = styled.input`
  display: block;
  margin: 1rem 0;
  height: 1rem;
  width: 10rem;
  padding: 0.5rem;
`;

const StyledTextArea = styled.textarea`
  display: block;
  margin: 1rem 0;
  padding: 0.5rem;
  min-height: 5rem;
  width: 18rem;
`;

const SubmitButton = styled.button`
  width: 5rem;
  height: 1.5rem;
  border-radius: 0.2rem;
  outline: none;
  border: none;
  cursor: pointer;
  background: #0000a3;
  color: white;
  transition: all 0.3s;
  :hover {
    background: #000075;
    transform: scale(1.1);
  }
`;

export default function PostForm({ makePost }) {
  const [body, setBody] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");

  const dispatch = useAppDispatch();

  const handleUpdateBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmitPostForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      title,
      body,
      userId: 1356,
    };
    const { data: newPost } = await makePost(params);
    dispatch(addPost(newPost));
    console.log(newPost);
    setTitle("");
    setBody("");
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form id="form" onSubmit={handleSubmitPostForm}>
        <label htmlFor="title">Title</label>
        <StyledInput
          type="text"
          id="title"
          value={title}
          onChange={handleUpdateTitle}
        />
        <label htmlFor="body">Body</label>
        <StyledTextArea id="body" value={body} onChange={handleUpdateBody} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </div>
  );
}
