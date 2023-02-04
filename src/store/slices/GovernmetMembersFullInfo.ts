import { createAsyncThunk, createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { IMemberFullInfo } from "../../types/models";

interface IFullInfo {
    loading: boolean,
    error: string,
    membersFullInfo: IMemberFullInfo,
    uploadedImage: any
}

const initialState = {
    loading: false,
    error: "",
    membersFullInfo: <IMemberFullInfo[]>[],
    uploadedImage: {
        "originalname": "",
        "filename": "",
        "path": "",
        "success": false
    }
}

export const governmentMembersFullInfo = createSlice({
    name: "membersFullInfo",
    initialState,
    reducers: {
        successLoading: (state) => {
            state.loading = true;
        },
        successFullfit: (state, action: PayloadAction<[]>) => {
            state.loading = false;
            state.membersFullInfo = action.payload;
        },
        successError: (state, action: PayloadAction<Error>) => {
            state.error = action.payload.message;
        },
        addMember: (state, action) => {
            state.membersFullInfo.push(action.payload);
        },
        deleteMember: (state, action) => {
            state.membersFullInfo = state.membersFullInfo.filter((item) => {
                return item.id !== action.payload;
            })
        },
        editeMember: (state, action) => {
            state.membersFullInfo = state.membersFullInfo.map((member) => {
                if (member.id== action.payload[0].id) {
                    member=action.payload[0];
                }
                return member;
            })
        },
        activeMember: (state, action) => {
            state.membersFullInfo = state.membersFullInfo.map((member) => {
                if (member.id == action.payload) {
                    if (member.status === "active") {
                        member.status = "passive"
                    }
                }
                return member;
            });
        },
        setImage: (state, action) => {
            state.uploadedImage = action.payload || {};
        }
    }

});
export const { successError, successFullfit, addMember, deleteMember, successLoading, editeMember,activeMember, setImage } = governmentMembersFullInfo.actions;
export default governmentMembersFullInfo.reducer;