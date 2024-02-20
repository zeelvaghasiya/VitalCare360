import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// fetch user information
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

// update user information
export const updateUserInfo = createAsyncThunk(
  "updateUserInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/v1/patients/update-user-info",data);
      console.log("updated user info", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// add allergy 
export const addAllergy = createAsyncThunk(
  "addAllergy",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/v1/patients/add-allergy",{allergy : data});
      console.log("after adding allergy", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// add chronicdisease 
export const addChronicdisease = createAsyncThunk(
  "chronicdisease",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/v1/patients/add-chronicdisease",{chronicDisease : data});
      console.log("after adding chronicdisease", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// add injury 
export const addInjury = createAsyncThunk(
  "injury",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/v1/patients/add-injury",{injury : data});
      console.log("after adding injury", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// add surgery 
export const addSurgery = createAsyncThunk(
  "surgery",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/v1/patients/add-surgery",{surgery : data});
      console.log("after adding surgery", response.data);
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
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAllergy.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAllergy.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addAllergy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addChronicdisease.pending, (state) => {
        state.loading = true;
      })
      .addCase(addChronicdisease.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addChronicdisease.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addInjury.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInjury.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addInjury.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSurgery.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSurgery.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addSurgery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const {resetStore} = userPatient.actions

export default userPatient.reducer;
