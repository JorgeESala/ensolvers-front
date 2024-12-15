import { Button, Table } from 'react-bootstrap';
import Note from '../note/Note';

interface NotesTableProps {
    handleDelete: (id:number) => void;
    handleArchive: (id:number, archived:boolean) => void;
    handleEdit: (id:number) => void;
    filteredNotes: Note[];

}

const NotesTable: React.FC<NotesTableProps> =  ({
    handleArchive,
    handleDelete,
    handleEdit,
    filteredNotes
}) => {
  return (
    <>
        <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {filteredNotes.map((note) => (
                    <tr key={note.id}>
                        <td>{note.id}</td>
                        <td>{note.name}</td>
                        <td>
                        <Button onClick={() => handleEdit(note.id)} variant="primary">Edit note</Button>
                        <Button onClick={() => handleArchive(note.id, note.archived)} variant={note.archived ? "success" : "warning" }>{note.archived ? "Activate" : "Archive"}</Button>
                        <Button onClick={() => handleDelete(note.id)} variant="danger">Delete</Button>
                        </td>
                    </tr>
                        
                )) }
            </tbody>
        </Table>
    </>
    
  )
}

export default NotesTable