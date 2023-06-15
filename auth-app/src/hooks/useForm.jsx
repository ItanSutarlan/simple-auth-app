import { useState } from "react";


const useForm = (initialState = {}, onSubmit) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  }

  return { formData, handleInputChange, handleSubmit, setFormData };
}

export default useForm