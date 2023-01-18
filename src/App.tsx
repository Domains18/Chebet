import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewNote from "./pages/NewNote";

export type noteData = {
  title: string;
  markdown: string;
  tag: Tag[];
}

export type Tag = {
  id: string;
  tags: string;
}
export type Note = {
  id: string;
} & noteData;


function App() {

  return (
    <Container className= "my-4">
      <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/new" element={<NewNote/>} />
      <Route path="/:id" element={<h1>id</h1>}>
        <Route index element={<h1>index</h1>} />
        <Route path="edit" element={<h1>edit</h1>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Container>
  )
}

export default App
