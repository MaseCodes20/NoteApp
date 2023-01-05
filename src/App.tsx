import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./pages/NewNote";
import { useLocalStorage } from "./useLocalStore";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./pages/NoteList";
import NoteLayout from "./pages/NoteLayout";
import Note from "./components/note/Note";
import EditNote from "./components/note/EditNote";
import { NoteData, RawNote, Tag } from "./types/types";
import "./app.css";
import { createNote, updateNote } from "./components/utils/businessLogic";

function App() {
  const [theme, setTheme] = useState("light");

  const [notes, setNotes] = useLocalStorage<RawNote[]>("Notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("Tags", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note?.tagIds.includes(tag?.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = (data: NoteData) => {
    setNotes((prevNotes) => createNote(prevNotes, data, tags));
  };

  const onUpdateNote = (id: string, data: NoteData) => {
    setNotes((prevNotes) => updateNote(prevNotes, id, data));
  };

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const updateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  };

  const deleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Container className={`App my-4 ${theme}`}>
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />
        <Route
          path="new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />

        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
