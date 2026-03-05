import { useEffect, useState } from 'react';
import SearchInput from '../../components/SearchInput/SearchInput';
import { notesService } from '../../services/notes.service';
import type { Note } from '../../types/note';

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    notesService.getAll().then(setNotes).catch(console.error);
  }, []);

  return (
    <div>
      <SearchInput />
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
