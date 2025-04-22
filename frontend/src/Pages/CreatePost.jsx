
import { PostCreateForm } from '../components/post-create-form'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from 'axios'


const CreatePost = () => {
    const navigate = useNavigate()
      const [inputs, setInputs] = useState({
        title:'',
        slug:'',
        author:'',
        shortDescription:'',
        description:'',
        status:'',
        image:'',
      })
      const [errors, setErrors] = useState({
        title:'',
        slug:'',
        author:'',
        shortDescription:'',
        description:'',
        status:'',
        image:'',
      })
      const handelChange = (e) => {
        if (typeof e === "string") {
            setInputs((prev) => ({ ...prev, status: e }));
          }else{

              const name = e.target.name;
              const value = e.target.value;
              setInputs((prev)=>({...prev, [name]:value}))
          }
      }
      const handelFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setInputs((prev) => ({ ...prev, image: e.target.files[0] }));
        }
      }
    const handelSubmit = async (e) => {
       e.preventDefault()
       setErrors({})
       console.log(inputs)
       const formData = new FormData();
       formData.append("title", inputs.title);
       formData.append("slug", inputs.slug);
       formData.append("shortDescription", inputs.shortDescription);
       formData.append("description", inputs.description);
       formData.append("author", inputs.author);
       formData.append("status", inputs.status);
       if (inputs.image) formData.append("featureImage", inputs.image);

          const token = JSON.parse(localStorage.getItem("token")) || null 
          axios.post(`${import.meta.env.VITE_API_BASE_URL}/posts/create`,formData,{
              headers:{
                Authorization:`Bearer ${token}`
              }
            }).then((response)=>{
              if (response.data.success) {
                toast.success(response?.data?.message,{autoClose:2000})
                navigate('/')
              }
            }).catch((error)=>{
              if(error?.response?.data?.validateImageError) {
                console.log(error?.response?.data?.validateImageError)
                toast.error(error?.response?.data?.validateImageError,{autoClose:2000})
              }
              if(error?.response?.data?.validateErrors) {
                console.log(error?.response?.data?.validateErrors)
                setErrors(error?.response?.data?.validateErrors)
              }
              toast.error(error?.response?.data?.message,{autoClose:2000})
          })
        }
  return (
    <div className="min-h-svh  p-6 md:p-10">
          <div className="w-full ">
            <PostCreateForm  errors={errors}  handelSubmit={handelSubmit} inputs={inputs} handelChange={handelChange} handelFileChange={handelFileChange} />
          </div>
        </div>
  )
}

export default CreatePost