import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  friends: [],
};

const accessToken =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const headers = {
  "Content-Type": "multipart/form-data",
  Authorization: "basic " + accessToken,
};

const Slice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET ALL USER
    getAllfriendsSuccess(state, action) {
      state.isLoading = false;
      state.friends = action.payload;
    },
  },
});

export default Slice.reducer;

// GET ALL Friends
export function getAllFriends() {
  return async (dispatch) => {
    dispatch(Slice.actions.startLoading());
    try {
      const response = await axios.get("/adminuser/all", {
        headers: headers,
      });

      dispatch(Slice.actions.getAllfriendsSuccess(response.data.users));
    } catch (error) {
      dispatch(Slice.actions.hasError(error));
    }
  };
}
