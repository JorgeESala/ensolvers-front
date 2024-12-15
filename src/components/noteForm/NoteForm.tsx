import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
interface NoteFormProps {
  formVisibility:boolean;
  createHandler: () => void;
  submitHandler: (event: React.FormEvent) => void;
  formData: {
    id:number | null,
    name:string,
    text:string
  }
  formHandler: (event: React.ChangeEvent<HTMLIFrameElement & HTMLTextAreaElement>) => void;
}
const NoteForm: React.FC<NoteFormProps> = ( {
  createHandler,
  formVisibility,
  submitHandler,
  formHandler,
  formData
}) => {
  return (
    <>
    <Button onClick={() => createHandler()} className='d-block mb-3' variant='success'>Create note</Button>
    <Form onSubmit={submitHandler} className={formVisibility? "" : "collapse"}>
      <Form.Group>
        <Form.Label>Note name</Form.Label>
        <Form.Control 
        type='text' 
        className='text-center' 
        placeholder='Note name'
        name='name'
        value={formData.name}
        onChange={formHandler}/>
      </Form.Group>
        <Form.Group>
        <Form.Label>Note text</Form.Label>
        <Form.Control as="textarea" rows={15}
        name='text'
        value={formData.text}
        onChange={formHandler}
        />
        </Form.Group>
        
        <Button variant='success' className='mb-3' type='submit'>Save</Button>
    </Form>
    </>
    
  )
}

export default NoteForm