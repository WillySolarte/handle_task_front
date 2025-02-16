import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, Task, taskAuxiliar, TaskFormData } from "../schemas";


type TaskProps = {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id'],
    status: Task['status']
}


export async function createTask({formData, projectId} : Pick<TaskProps, 'formData' | 'projectId' >  ){

    const url = `/task/new-task/${projectId}`;

    try {
    
        const data = await api.post(url, formData);
        return data
    
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }

}

//Modificar
export async function deleteTask({taskId, projectId} :  Pick<TaskProps,  'taskId' | 'projectId' >){
    
    try {
        const url = `/projects/tasks/${projectId}/${taskId}`
        const {data} = await api.delete<string>(url)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({taskId, projectId, formData} :  Pick<TaskProps,  'taskId' | 'projectId' | 'formData' >){
    
    try {
        const url = `/task/update-task/${projectId}/${taskId}`
        const {data} = await api.patch(url, formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


//ya estan
export async function updateStatus({taskId, projectId, status} :  Pick<TaskProps,  'taskId' | 'projectId' | 'status' >){
    
    try {
        const url = `/task/update-status/${projectId}/${taskId}`
        const {data} = await api.post(url, {status})
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function getTaskById({taskId, projectId} :  Pick<TaskProps,  'taskId' | 'projectId' >){
    
    try {
        const url = `/task/get-task/${projectId}/${taskId}`
        const {data} = await api.get(url)
        
        const response = taskAuxiliar.safeParse(data.data)
        
        if(response.success){
            return response.data
        }
        
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}