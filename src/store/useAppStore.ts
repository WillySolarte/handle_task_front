import { create } from "zustand";
import { UtilitiesSliceType, createUtilitiesSlice } from "./utilitiesSlice.ts";


export const useAppStore = create<UtilitiesSliceType>((...a) => ({

    ...createUtilitiesSlice(...a)
    

    

}))