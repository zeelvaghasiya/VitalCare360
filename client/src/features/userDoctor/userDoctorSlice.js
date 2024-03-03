import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch doctor information
export const doctorInfo = createAsyncThunk(
  "doctorInfo",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/doctors/current-doctor");
      console.log("response data in profile", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// update doctor information
export const updateDoctorInfo = createAsyncThunk(
  "updateDoctorInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/v1/doctors/edit-doctor-personal-info",data);
      console.log("updated doctor info", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDoctor = createSlice({
    name: "userDoctor",
    initialState: {
      user: localStorage.getItem("doctorInfo")
        ? JSON.parse(localStorage.getItem("doctorInfo"))
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
      .addCase(doctorInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(doctorInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(doctorInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = {}
        // console.log("e",typeof(action.payload.response.status))
      })
      .addCase(updateDoctorInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDoctorInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateDoctorInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  
    },
  });
  
  export const {resetStore} = userDoctor.actions
  
  export default userDoctor.reducer;
  