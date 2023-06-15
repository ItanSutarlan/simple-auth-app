import LabeledInput from "../components/LabeledInput"
import useForm from '../hooks/useForm'
import { NavLink, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { login } from "../services/user";

export default function LoginPage() {
  const navigate = useNavigate()

  const { formData, handleInputChange, handleSubmit, setFormData } = useForm({
    username: '',
    password: ''
  }, onSubmit)

  async function onSubmit (formData) {
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
      const response = await login(formData);
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.ok) {
        localStorage.setItem("access_token", responseJson.access_token);
        Swal.fire({
          title: "Login succeed",
          text: "Successfully login",
          icon: "success",
        });
        navigate('/')
        setFormData({
          username: '',
          password: '',
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
      username, password
    }) {
      if (!username) {
        return 'Email is required'
      }
      if (!password) {
        return 'Password is required'
      }
      return null
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
        <div className="mx-4 md:w-1/2 md:mx-auto h-screen flex flex-col justify-center">
          <h1 className="font-bold text-3xl text-center mb-8">Login</h1>
          <form className="form-control" onSubmit={handleSubmit}>
            <LabeledInput id="username" label="Username" name="username" inputType="email" value={formData.email} setValue={handleInputChange} />
            <LabeledInput id="password" label="Password" name="password" inputType="password" value={formData.password} setValue={handleInputChange} />
            <button className="btn btn-primary my-5">Login</button>
          </form >
        <span>dont have an account yet? <NavLink className='text-sm hover:text-blue-700' to='/register'> register</NavLink></span>
        </div>
    </div>
  )
}