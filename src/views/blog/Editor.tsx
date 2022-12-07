import React from "react";
import ReactQuill from "react-quill";
import './blog.css';

export interface Props {
  content: string;
  handleContentChange: (params: any) => any;
}

const Editor: React.FunctionComponent<Props> = (
  props,
) => {
  const modules: any = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const formats: any[] = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
  ];


  return (
    <ReactQuill
      value={props.content}
      onChange={props.handleContentChange}
      theme="snow"
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
