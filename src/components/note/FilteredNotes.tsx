import { Col } from "react-bootstrap";
import { SimplifiedNote } from "../../types/types";
import NoteCard from "./NoteCard";

type FilteredNotesProps = {
  filteredNotes: SimplifiedNote[];
};

function FilteredNotes({ filteredNotes }: FilteredNotesProps) {
  return (
    <>
      {filteredNotes.map((note) => (
        <Col key={note.id}>
          <NoteCard id={note.id} title={note.title} tags={note.tags} />
        </Col>
      ))}
    </>
  );
}

export default FilteredNotes;
