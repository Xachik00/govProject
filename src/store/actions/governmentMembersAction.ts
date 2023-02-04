import { Dispatch } from '@reduxjs/toolkit';
import { fetching, fetchFullfit, fetchError } from "../slices/GovernmentMembers";
import axios from 'axios';

export const fetchGovernmentMember = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetching())
            const response = await axios.get("http://localhost:3030/api/v1/users");
            dispatch(fetchFullfit(response.data))
        }
        catch (error) {
            dispatch(fetchError(error as Error))
        }
    }
}