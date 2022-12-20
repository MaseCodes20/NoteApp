import React from "react";
import { Tag } from "./App";

export type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return <div>NoteCard</div>;
}

export default NoteCard;
