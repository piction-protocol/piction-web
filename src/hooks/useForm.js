import { useState } from 'react';

function useForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  return [formData, { handleChange }];
}

export default useForm;
