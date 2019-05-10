import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ ...props }) {
  function handleChange(c, d) {
    console.log(c);
    console.log(JSON.stringify(d, null, 2));
  }

  return (
    <ReactQuill
      theme="snow"
      onChange={(content, delta, source, editor) => handleChange(content, editor.getContents())}
      {...props}
    />
  );
}

export default Editor;
