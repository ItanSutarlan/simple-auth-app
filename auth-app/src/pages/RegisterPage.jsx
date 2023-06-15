import Swal from "sweetalert2";

import LabeledInput from "../components/LabeledInput";
import useForm from '../hooks/useForm';
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../services/user";

export default function RegisterPage() {

  const navigate = useNavigate();
  const { formData, handleInputChange, handleSubmit, setFormData } = useForm({
    username: '',
    password: '',
    age: undefined,
  }, onSubmit)


  async function onSubmit(formData) {
    const message = validatePayload(formData)
    if (message) {
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error",
      });

      return
    }
    try {
      const response = await register(formData);
      const responseJson = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Succeed",
          text: responseJson.message,
          icon: "success",
        });

        navigate('/login');
        setFormData({
          username: '',
          password: '',
          age: undefined,
        })
      } else {
        Swal.fire({
          title: "Error",
          text: responseJson.message,
          icon: "error",
        });        
      }
    } catch (error) {
      console.log(error);
    }
    
    function validatePayload({
      username, password, age,
    }) {
      if (!username) {
        return 'Email is required'
      }
      if (!password) {
        return 'Password is required'
      }
      if (!age) {
        return 'Age is required'
      }
      const Emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!Emailregex.test(username)) {
        return 'Email format is invalid'
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).{6,}$/;
      if (!passwordRegex.test(password)) {
        return 'Password should have six characters which contain at least One capital letter and the combination of letter and number'
      }
      if (age < 18) {
        return 'Password must be greater than or equal to 18 years old'
      }
      return null
    }
  }

  return (
    <div className="mx-4 md:w-1/2 md:mx-auto mt-8 text-xs text-center lg:block px-5 mb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Register New Admin</h1>
        <button className="text-lg font-bold">Personal Information</button>
      </div>

      <form className="form-control" onSubmit={handleSubmit}>
        <LabeledInput id="username" label="Username" name="username" inputType="text" value={formData.username} setValue={handleInputChange} />
        <LabeledInput id="password" label="Password" name="password" inputType="password" value={formData.password} setValue={handleInputChange} />
        <LabeledInput id="age" label="Age" name="age" inputType="number" value={formData.age} setValue={handleInputChange} />
        <div className="flex justify-end gap-3">
          <NavLink to="/" className="btn btn-primary my-5 w-fit">Login</NavLink>
          <button className="btn btn-primary my-5 w-fit">Register</button>
        </div>
      </form >
    </div>
  )
}