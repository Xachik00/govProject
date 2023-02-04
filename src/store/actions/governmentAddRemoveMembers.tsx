import { createAsyncThunk } from "@reduxjs/toolkit";
import { addMember, deleteMember, editeMember,activeMember, setImage } from "../slices/GovernmetMembersFullInfo";
import {store} from "../index";
import axios from "axios";
const PATH_URL="http://localhost:3030"

interface IDelete {
    id: number | null | undefined
}

type MyEdite = Record<string | number, string | string>;
interface IMember {
    [key: string]: any 
}
export const addProduct = createAsyncThunk(
    "add",
    async (item: IMember, { dispatch }) => {
            const member = {
                fullname:item.fullname,
                position:item.position,
                picture: item.picture
            }
            try {
                const response = await axios.post(`${PATH_URL}/api/v1/users`, member)
                if (response.status===200 && response.statusText==="OK") {
                    dispatch(addMember(response.data));
                }     
            }
            catch(error:any) {
                return "Servere request is failed";
            }
    }
);




export const deleteProduct =  createAsyncThunk(
    "delete/Product",

    async (id: IDelete, { dispatch }) => {
        

       try{
        const response = await axios.delete(`${PATH_URL}/api/v1/users/delete/${id}`, { headers: { 
            "content-type": "application/json", 
        }, });
       
        if (response.status===200 && response.statusText==="OK") {
            dispatch(deleteMember(id))
        }
        else{
            throw new Error("error");
            
        }
       }
       catch(error){
        return "Server request is failed";
       }

    }
)

export const editeAProduct = createAsyncThunk(
    "edite/Product",
    async (item: MyEdite, { rejectWithValue, dispatch }) => {
            const member = {
                picture:item.picture,
                fullname:item.fullname,
                position: item.position,
            }

            try {
                const response = await axios.put(`${PATH_URL}/api/v1/users/${item.id}`, member );
                if (response.status===200 && response.statusText==="OK") {
                    dispatch(editeMember(response.data));
                }
            }
            catch (error:any) {
                
                rejectWithValue(error.message)
            }    
    }
);



export  const activeProduct=createAsyncThunk(
    "active/product",
    async (id:number,{dispatch,getState})=>{
       
        const state=store.getState();
        const item=state. membersFullInfo.  membersFullInfo.find((child:any)=>{
            return id==child.id;
        })

        try{
            if (item){
                let status = item.status==="active"?"passive":"active";
                const response = await axios.patch(`${PATH_URL}/api/v1/users/${id}`,
                {
                 status
                }
                )
                if (response.status===200 && response.statusText==="OK"){
                    dispatch(activeMember(id));
                }
            }
        }
        catch(error){
            return "Server request is failed";
        }
    }
)

export const uploadImage =  createAsyncThunk(
    "upload/Image",

    async (file: any, { dispatch }) => {
        const formData  = new FormData();
        formData.append('image', file);
        try {
            const response = await axios.post(`${PATH_URL}/api/v1/users/upload`, formData, { 
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
             });
            dispatch(setImage(response.data));
        } catch(error:any) {
            return "Server request is failed";
        }
        
    }
)
