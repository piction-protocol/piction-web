import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ ...props }) {
  return (
    <ReactQuill
      theme="snow"
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
  placeholder: 'placeholder',
};

export default Editor;
