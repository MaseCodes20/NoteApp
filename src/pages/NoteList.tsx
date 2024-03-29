import { Link } from "react-router-dom";
import { Row, Col, Stack, Button, Form } from "react-bootstrap";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";
import { SimplifiedNote, Tag } from "../types/types";
import EditTagsModal from "../components/tags/EditTagModal";
import FilteredNotes from "../components/note/FilteredNotes";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  theme: string;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
  toggleTheme: () => void;
};

function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
  toggleTheme,
  theme,
}: NoteListProps) {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>

        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Button onClick={() => toggleTheme()} variant="light">
              {theme === "dark" ? <BsFillSunFill /> : <BsFillMoonFill />}
            </Button>

            <Link to="new">
              <Button variant="primary">Create</Button>
            </Link>

            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>

      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        <FilteredNotes filteredNotes={filteredNotes} />
      </Row>

      <EditTagsModal
        availableTags={availableTags}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
}

export default NoteList;
