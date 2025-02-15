import api from "../lib/axios"
import { isAxiosError } from "axios";
import { dashBoardProjectsSchema, Project, ProjectFormData, projectSchema } from "../schemas";

export async function getAllProjects(){

    const url = '/project/find-all'

    try {
        const {data} = await api.get(url)
        
        const response = dashBoardProjectsSchema.safeParse(data)
        
        if(response.success){
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function createProject(formData: ProjectFormData){

    const url = '/project/new-project'

    try {
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectById(id: Project['_id']){
    
    try {
        const {data} = await api.get(`/project/get-project/${id}`)
        console.log(data)
        const response = projectSchema.safeParse(data)
        
        if(response.success){
            return response.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
