import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createPatient operation
export const createPatient = createAsyncThunk(
  "createPatient",
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
      const response = await axios.post("/api/v1/patients/register", formData);

      console.log("Response:", response.data);
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

// loginPatient operation
export const loginPatient = createAsyncThunk(
  "loginPatient",
  async (patientData, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/v1/patients/login",
        patientData,
        config
      );

      // store user's token in local storage
      localStorage.setItem("userToken", response.data.data.accessToken);
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

// logoutPatient operation
export const logoutPatient = createAsyncThunk(
  "logoutPatient",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/patients/logout");
      console.log("Logout response : ", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

export const userPatient = createSlice({
  name: "userPatient",
  initialState: {
    loading: false,
    userInfo: null,
    userToken,
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
      .addCase(loginPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.data.accessToken;
        console.log("accessToken",state.userToken)
      })
      .addCase(loginPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutPatient.fulfilled, (state, action) => {
        localStorage.removeItem("userToken"); // delete token from storage
        state.loading = false;
        state.userInfo = null;
        state.userToken = null;
        state.error = null;
        console.log("logout response");
      })
      .addCase(logoutPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setCredentials } = userPatient.actions;

export default userPatient.reducer;
