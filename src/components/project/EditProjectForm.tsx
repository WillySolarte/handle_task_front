import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Project, ProjectFormData } from "../../schemas";
import { updateProject } from "../../services/projectService";

type EditProjectFormProps = {
    data: ProjectFormData,
    projectID: Project['_id']
}

export default function EditProjectForm({data, projectID} : EditProjectFormProps) {
    
    const initialValues : ProjectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectID]})
            toast.success(response)
            reset()
            navigate('/project/dashboard')
            
        }
    })

    const handleForm = (formData: ProjectFormData) => {
        const finalData = {
            formData,
            projectID
        }
        mutate(finalData)
    }

    return (
        <>
            <div className=" max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Editar Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el formulario para editar un proyecto </p>
    
                <nav className="my-5">
                    <Link to='/project/dashboard' className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors" >Volver a Proyectos</Link>
    
                </nav>
                <form onSubmit={handleSubmit(handleForm)} className="mt-10 bg-white shadow-lg p-10 rounded-lg" noValidate>
    
                    <ProjectForm register={register} errors={errors} />
    
                    <input value='Guardar cambios' type="submit" className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors" />
    
                </form>
    
            </div>
            
        
        </>
      )
}
