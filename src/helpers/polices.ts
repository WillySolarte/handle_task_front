import { Project, TeamMember } from "../schemas";

export function isManager(managerId: Project['manager'], userId: TeamMember['_id']){
    return managerId === userId
}