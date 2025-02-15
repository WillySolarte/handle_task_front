import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {toast} from 'react-toastify'
import {useForm} from "react-hook-form"
import { ProjectFormData } from "../../schemas";
import ProjectForm from "../../components/project/ProjectForm";
import { createProject } from "../../services/projectService";



export default function CreateProjectView() {

    const navigate = useNavigate()

    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
            reset()
            navigate('/')
        }
    })

    const handleForm =  (data: ProjectFormData) => {
        mutate(data)
    }

  return (
    <>
        <div className=" max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Crear Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Llena el formulario para crear un proyecto </p>

            <nav className="my-5">
                <Link to='/project/dashboard' className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors" >Volver a Proyectos</Link>

            </nav>
            <form onSubmit={handleSubmit(handleForm)} className="mt-10 bg-white shadow-lg p-10 rounded-lg" noValidate>

                <ProjectForm register={register} errors={errors} />

                <input type="submit" value='Crear Proyecto' className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors" />

            </form>

        </div>
        
    
    </>
  )
}
