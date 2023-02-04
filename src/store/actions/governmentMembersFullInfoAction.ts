import { Dispatch } from "@reduxjs/toolkit";
import { successError, successFullfit, successLoading } from "../slices/GovernmetMembersFullInfo";
import axios from "axios";
interface ICreateMember {
    [key: string]: string
}
const URL = "http://localhost:3030";

export const fetchGovernmentMemberFullInfo = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(successLoading());
            const response = await axios.get(`${URL}/api/v1/users/fullList`);
           if (response.status===200 && response.statusText==="OK") {
            dispatch(successFullfit(response.data));
           }
        } catch (error) {
            dispatch(successError(error as Error))
        }
    }
}

export const fetchGovernmentMembersInfo = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(successLoading());
            const response = await axios.get(`${URL}/api/v1/users`);
            
           if (response.status===200 && response.statusText==="OK") {
            dispatch(successFullfit(response.data));
           }
        } catch (error) {
            
            dispatch(successError(error as Error))
        }
    }
}

//http://localhost:3030/api/v1/users