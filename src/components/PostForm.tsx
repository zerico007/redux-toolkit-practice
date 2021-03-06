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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  width: 15rem;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 18rem;
  background: white;
  border-radius: 0.2rem;
  padding: 1rem;
`;

const CloseButton = styled.button`
  width: 5rem;
  height: 1.5rem;
  border-radius: 0.2rem;
  outline: none;
  border: none;
  cursor: pointer;
  background: #c70039;
  color: white;
  transition: all 0.3s;
  :hover {
    background: #900c3f;
    transform: scale(1.1);
  }
`;

export default function PostForm({ makePost, editPost }) {
  const [body, setBody] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>("");

  const dispatch = useAppDispatch();

  const handleUpdateBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleUpdateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUpdateId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
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

  const handleUpdatePostForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      id,
      title,
      body,
      userId: 1356,
    };
    const { data: updatedPost } = await editPost(params);
    dispatch(addPost(updatedPost));
    console.log(updatedPost);
    setTitle("");
    setBody("");
  };

  const openAddFormModal = () => {
    setIsEdit(false);
    setIsOpen(true);
  };

  const openEditFormModal = () => {
    setIsEdit(true);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function updatePostForm() {
    return (
      <FormDiv>
        <h1>Update Post</h1>
        <form onSubmit={handleUpdatePostForm}>
          <StyledInput
            type="text"
            placeholder="Id"
            value={id}
            onChange={handleUpdateId}
          />
          <StyledInput
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleUpdateTitle}
          />
          <StyledTextArea
            placeholder="Body"
            value={body}
            onChange={handleUpdateBody}
          />
          <ButtonsDiv>
            <SubmitButton type="submit">Submit</SubmitButton>
            <CloseButton onClick={closeModal}>Close</CloseButton>
          </ButtonsDiv>
        </form>
      </FormDiv>
    );
  }

  function makePostForm() {
    return (
      <FormDiv>
        <h1>Add Post</h1>
        <form onSubmit={handleSubmitPostForm}>
          <StyledInput
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleUpdateTitle}
          />
          <StyledTextArea
            placeholder="Body"
            value={body}
            onChange={handleUpdateBody}
          />
          <ButtonsDiv>
            <SubmitButton type="submit">Submit</SubmitButton>
            <CloseButton onClick={closeModal}>Close</CloseButton>
          </ButtonsDiv>
        </form>
      </FormDiv>
    );
  }

  return (
    <div>
      <ButtonsDiv>
        <button onClick={openAddFormModal}>Add Post</button>
        <button onClick={openEditFormModal}>Edit Post</button>
      </ButtonsDiv>
      {isOpen && <Modal>{isEdit ? updatePostForm() : makePostForm()}</Modal>}
    </div>
  );
}
