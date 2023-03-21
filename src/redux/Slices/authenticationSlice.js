import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = `http://192.168.137.114:8080`;

/**
  * @asyncThunk Login function
  * @desc manage the user state when user log-in
  * @param  string $user - user state
  * @return returns user data in case of success and in case of error return error message.
*/
export const authenticateUser = createAsyncThunk(
  "users/authenticate",
  async (user) => {
      const response = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

    const json = await response.json(); 
    console.log(json);
    if(response.ok){
        localStorage.setItem("Authentication-token", json.token);
        return json;
    }
    else{
        throw new Error(json.error);
    }
  }
);


/**
  * @asyncThunk Login function
  * @desc manage the user state when user log-in
  * @param  string $user - user state
  * @return returns user data in case of success and in case of error return error message.
*/
export const registerUser = createAsyncThunk(
    "users/register",
    async (user) => {
        const response = await fetch(`${baseUrl}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
  
      const json = await response.json();
      if(response.ok){
          return json;
      }
      else{
          throw new Error(json.error);
      }
    }
  );

/**
  * @asyncThunk Logout function
  * @desc log-out user and make the state empty if successfull
  * @return Redirect to home page insted and show alert message in case of success and error both
*/
export const logoutUser = createAsyncThunk(
    "users/logout",
    async () => {
        localStorage.removeItem('Authentication-token');
        // TODO: Redirect to home page insted and show alert message in case of success and error both.
        return "logged out"
    }
  );

  export const registerOrg = createAsyncThunk(
    "org/register",
    async (user) => {
      console.log(user);
        const response = await fetch(`${baseUrl}/org/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
  
      const json = await response.json();
      if(response.ok){
          return json;
      }
      else{
          throw new Error(json.error);
      }
    }
  );

  export const userSlice = createSlice({
    name: "authentication",
    initialState: {
      user: {
        _id: "",
        first_name: "",
        username: "",
        last_name: "",
        email: "",
        role: "",
      },
      token: "",
      pending: false,
      success_message: '',
      error: false,
      error_message: ''
    },
    reducers: {},
    extraReducers: {
        //? States for authentication.
        [authenticateUser.pending]: (state) => {
            state.pending = true;
        },
        [authenticateUser.fulfilled]: (state, action) => {
            state.pending = false;
            state.user = action.payload.userData;
            state.token = action.payload.token;
        },
        [authenticateUser.rejected]: (state, action) => {
            state.pending = false;
            state.error = true;
            state.error_message = action.error.message;
        },
        //? States for registration.
        [registerUser.pending]: (state) => {
            state.pending = true;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.pending = false;
            state.error = false;
            state.success_message = action.payload.message;
        },
        [registerUser.rejected]: (state, action) => {
            state.pending = false;
            state.error = true;
            state.error_message = action.error.message;
        },
         //? States for Org registration.
         [registerOrg.pending]: (state) => {
          state.pending = true;
        },
        [registerOrg.fulfilled]: (state, action) => {
            state.pending = false;
            state.error = false;
            state.success_message = action.payload.message;
        },
        [registerOrg.rejected]: (state, action) => {
            state.pending = false;
            state.error = true;
            console.log(action);
            state.error_message = action.error.message;
        },
        //? States for logout.
        [logoutUser.fulfilled]: (state, action) => {
            state.user = null;
        },
        [logoutUser.rejected]: (state, action) => {
            state.error = true;
            state.error_message = action.error.message;
        },
    },
  });


export default userSlice.reducer;
