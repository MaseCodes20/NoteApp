import { NoteData, RawNote, Tag } from "../../types/types";

export const createNote = (
  prevNotes: RawNote[],
  data: NoteData,
  tags: Tag[]
): RawNote[] => {
  return [
    ...prevNotes,
    { ...data, id: crypto.randomUUID(), tagIds: tags.map((tag) => tag.id) },
  ];
};

export const updateNote = (
  prevNotes: RawNote[],
  id: string,
  { tags, ...data }: NoteData
): RawNote[] => {
  return prevNotes.map((note) => {
    if (note.id === id) {
      return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
    } else {
      return note;
    }
  });
};
