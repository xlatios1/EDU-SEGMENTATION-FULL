import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  border: 1px solid #ddd;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
`;

const FormTextarea = styled.textarea`
  border: 1px solid #ddd;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
`;

const FormButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  background-color: #4e73df;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #375ab5;
  }
`;

const FormComponent = () => {
  return (
    <Form>
      {/* <FormGroup>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormInput type="text" id="name" name="name" required />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput type="email" id="email" name="email" required />
      </FormGroup> */}
      <FormGroup>
        <FormLabel htmlFor="message">Message</FormLabel>
        <FormTextarea id="message" name="message" required></FormTextarea>
      </FormGroup>
      <FormButton type="submit">Submit</FormButton>
    </Form>
  );
};

export default FormComponent;
