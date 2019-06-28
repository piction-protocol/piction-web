import { useState, useCallback } from 'react';

function useForm(initial) {
  const [formData, setFormData] = useState(initial);

  const handleChange = useCallback((event) => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }, []);

  return [formData, setFormData, { handleChange }];
}

export default useForm;
