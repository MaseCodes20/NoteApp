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

export const deleteNote = (id: string, prevNotes: RawNote[]): RawNote[] => {
  return prevNotes.filter((note) => note.id !== id);
};

export const tagUpdate = (
  prevTags: Tag[],
  id: string,
  label: string
): Tag[] => {
  return prevTags.map((tag) => {
    if (tag.id === id) {
      return { ...tag, label };
    } else {
      return tag;
    }
  });
};
