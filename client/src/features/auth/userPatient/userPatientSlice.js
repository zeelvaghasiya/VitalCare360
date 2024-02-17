import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userInfo = createAsyncThunk(
  "userInfo",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/patients/current-user");
      console.log("response data in profile", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userPatient = createSlice({
  name: "userPatient",
  initialState: {
    user: localStorage.getItem("patientInfo")
      ? JSON.parse(localStorage.getItem("patientInfo"))
      : null,
    loading: false,
    error: null,
  },
  reducers : {
    resetStore : (state) => {
      state.user = null
      console.log("call",state.user)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(userInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = {}
        // console.log("e",typeof(action.payload.response.status))
      });
  },
});

export const {resetStore} = userPatient.actions

export default userPatient.reducer;
