import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Project, Task, TaskFormData } from "../schemas";


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

export async function updateStatus({taskId, projectId, status} :  Pick<TaskProps,  'taskId' | 'projectId' | 'status' >){
    
    try {
        const url = `/projects/tasks/status/${projectId}/${taskId}`
        const {data} = await api.post<string>(url, {status})
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}