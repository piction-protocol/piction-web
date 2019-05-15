import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ ...props }) {
  function handleChange(content) {
    console.log(content);
  }

  return (
    <ReactQuill
      theme="snow"
      onChange={content => handleChange(content)}
      {...props}
    />
  );
}

Editor.defaultProps = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', { align: [] }],
      ['image', 'link'],
    ],
  },
};

export default Editor;
