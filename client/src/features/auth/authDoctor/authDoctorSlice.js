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
      const response = await axios.post(
        "/api/v1/doctors/registerdoctor",
        formData
      );

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

// loginDoctor operation
export const loginDoctor = createAsyncThunk(
  "loginDoctor",
  async (doctorData, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/v1/doctors/login",
        doctorData,
        config
      );

      // store user's token in local storage
      localStorage.setItem("doctorToken", response.data.data.accessToken);
      // console.log("user Token",response.data.data.accessToken)

      console.log("login response", response.data);
      return response.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// logoutDoctor operation
export const logoutDoctor = createAsyncThunk(
  "logoutDoctor",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/doctors/logout");
      console.log("Logout response : ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
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
      .addCase(loginDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.data.accessToken;
        console.log("accessToken", state.userToken);
      })
      .addCase(loginDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      .addCase(logoutDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutDoctor.fulfilled, (state, action) => {
        localStorage.removeItem("doctorToken"); // delete token from storage
        state.loading = false;
        state.userInfo = null;
        state.userToken = null;
        state.error = null;
        console.log("logout response");
      })
      .addCase(logoutDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials } = userDoctor.actions;

export default userDoctor.reducer;
