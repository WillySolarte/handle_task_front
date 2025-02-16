import api from "../lib/axios"
import { isAxiosError } from "axios";
import { dashBoardProjectsSchema, Project, ProjectFormData } from "../schemas";

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
    
    const url = `/project/get-project/${id}`;
    try {
        const {data} = await api.get(url)
        
        if(data.state === 'ok'){
            return data.data
        }
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type ProjectEditApiType = {
    projectID: Project['_id']
    formData:  ProjectFormData
}
export async function updateProject({projectID, formData} : ProjectEditApiType){

    const url = `/project/update-project/${projectID}`

    try {
        const {data} = await api.patch(url, formData)
        
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(id: Project['_id']){

    try {
        const {data} = await api.delete(`/project/delete-project/${id}`)
        
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
