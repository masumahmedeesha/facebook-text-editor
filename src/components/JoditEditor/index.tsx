import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ value, onChange }: any) => {
  const editor = useRef(null);
  return (
    <>
      <JoditEditor
        ref={editor}
        tabIndex={1}
        onChange={onChange}
        value={value}
      />
    </>
  );
};

export default TextEditor;
