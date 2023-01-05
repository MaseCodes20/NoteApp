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
