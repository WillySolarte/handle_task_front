import { isAxiosError } from "axios"
import api from "../lib/axios"
import { Project, TeamMember, TeamMemberForm, teamMembersSchema } from "../schemas"


export async function findUserByEmail( formData: TeamMemberForm){

    try {
        
        const url = `/project/find-member-by-email`
        const {data} = await api.post(url, formData)
        
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}

export async function addUserToProject({projectId, id} : {projectId: Project['_id'], id: TeamMember['_id']}){

    try {
        const url = `/project/add-member-by-id/${projectId}`
        const {data} = await api.post(url, {id})
        return data
        
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error.response.data)
            throw new Error(error.response.data.message)
        }
    }
}

export async function getProjectTeam(projectId: Project['_id']){

    try {
        const url = `/project/get-project-team/${projectId}`
        const {data} = await api.get(url)
        const response = teamMembersSchema.safeParse(data)
        if(response.success){
            return response.data
        }
        
        
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}

export async function removeUserToProject({projectId, userId} : {projectId: Project['_id'], userId: TeamMember['_id']}){

    try {
        const url = `/project/remove-member-by-id/${projectId}/${userId}`
        const {data} = await api.delete(url)
        console.log(data)
        return data
        
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            console.log(error.response)
            throw new Error(error.response.data.message)
        }
    }
}