import { createSlice } from "@reduxjs/toolkit";
import {Chain, Strap, Cable} from "./equipmentClasses"
import type {LiftingEquipment} from './equipmentClasses'

interface InitialStateType{
    equipments:LiftingEquipment[]
}

const initialState:InitialStateType = {
    equipments: []
}

const equipmentsSlice = createSlice({
  name: "equipments",
  initialState,
  reducers: {
    addChain:(state, action):void =>{ 
        if(!action.payload){
            const chain = new Chain()
            state.equipments.push(chain)
        }else{
            const{type , width, numOf,angle} = action.payload;
            const chain = new Chain(type, width,numOf,angle)
            state.equipments.push(chain)
        }
        
    },
    addStrap:(state, action):void =>{ 
        if(!action.payload){
            const strap = new Strap()
            state.equipments.push(strap)
        }else{
            const{type , strength, numOf,angle, knotType} = action.payload;
            const strap = new Strap(type,strength,numOf,angle, knotType)
            state.equipments.push(strap)
        }
        
    },
    addCable:(state, action):void =>{ 
        if(!action.payload){
            const cable = new Cable()
            state.equipments.push(cable)
        }else{
            const{type , strength, numOf,angle, knotType} = action.payload;
            const cable = new Cable(type,strength,numOf,angle, knotType)
            state.equipments.push(cable)
        }
        
    }
  },
});

export const {addChain, addStrap, addCable} = equipmentsSlice.actions;
export default equipmentsSlice.reducer;