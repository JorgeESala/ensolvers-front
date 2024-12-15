import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container } from 'react-bootstrap';
import Main from './components/main/Main';

function App() {
  document.body.classList.add('bg-dark');

  return (
    <>
    <Container>
      <Header/>
      <Main/>
    </Container>
      
    </>
  )
}

export default App
