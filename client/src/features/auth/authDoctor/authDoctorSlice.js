import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createDoctor operation
export const createDoctor = createAsyncThunk(
    "createDoctor",
    async (userData, { rejectWithValue }) => {
      try {
        // Create a new FormData object
        const formData = new FormData();
  
        // Append the file to the FormData with the key 'avatar'
        formData.append("avatar", userData.avatar);
  
        // Append other JSON data fields to the FormData
        Object.keys(userData).forEach((key) => {
          if (key !== "avatar") {
            // Exclude the file from JSON data
            formData.append(key, userData[key]);
          }
        });
  
        // Send a POST request with FormData
        const response = await axios.post("/api/v1/doctors/registerdoctor", formData);
  
        console.log("doctor register Response:", response.data);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  const userDoctorToken = localStorage.getItem("userDoctorToken")
  ? localStorage.getItem("userDoctorToken")
  : null;

export const userDoctor = createSlice({
  name: "userDoctor",
  initialState: {
    loading: false,
    userInfo: null,
    userDoctorToken,
    error: null,
    success: false,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { setCredentials } = userDoctor.actions;

export default userDoctor.reducer;
