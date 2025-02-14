import { StateCreator } from "zustand"

export type UtilitiesSliceType ={
    
    spinner: boolean,
    changeSpinner: (flag: boolean) => void,
}

export const createUtilitiesSlice : StateCreator<UtilitiesSliceType> = (set) => ({
    spinner: false,
    
    changeSpinner: (flag) => {
        set({
            
            spinner: flag
        })
    },
    
})