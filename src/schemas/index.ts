import {z} from 'zod'

export const userRegisterResponseSchema = z.object({
    msg: z.string(),
    state: z.string(),
    error: z.string()
})

export const userLoginResponseSchema = z.object({
    msg: z.string(),
    state: z.string(),
    data: z.string()
})

export const getUserAuthenticatedSchema = z.object({
    msg: z.string(),
    state: z.string(),
    data: z.object({
        name: z.string(),
        id: z.string(),
        email: z.string()
    })
})

export type TResponseUserRegister = z.infer< typeof userRegisterResponseSchema>

export type TResponseConfirmAccount = z.infer< typeof userRegisterResponseSchema>

export type TResponseLogin = z.infer< typeof userLoginResponseSchema>


/**USER SCHEMA*/

export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string()
})

/**Notes */

export const notesSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string(),
    createdAt: z.string()

})

export type TNote = z.infer<typeof notesSchema>
export type TNoteFormData =  Pick<TNote, 'content'>

/**Task */

export const taskStatusSchema = z.enum(["onHold", "pending", "inProgres", "underReview", "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    
    _id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    
    createdAt: z.string(),
    updatedAt: z.string()
})

export const taskAuxiliar = z.object({

    _id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: taskStatusSchema
    })),
    notes: z.array(notesSchema.extend({
        createdBy: userSchema
    })),
    createdAt: z.string(),
    updatedAt: z.string()

})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
export type TaskAuxiliar = z.infer< typeof taskAuxiliar>

/**Projects */

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    task: z.array(taskSchema),
    manager: z.string(userSchema.pick({_id: true}))
})


export const dashBoardProjectsSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true
    })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>

/**Team */

export const teamMemberSchema  = userSchema.pick({
    name: true,
    email: true,
    _id: true
})
export const teamMembersSchema = z.array(teamMemberSchema)

export type TeamMember = z.infer<typeof teamMemberSchema >
export type TeamMemberForm = Pick<TeamMember, 'email' >