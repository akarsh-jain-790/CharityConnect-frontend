import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = `https://charity-connect.up.railway.app/`;

/**
 * @asyncThunk Ngo fetch function.
 * @param  int page - page number
 * @return returns the ngos.
 */
export const fetchAllNgos = createAsyncThunk(
  "org/get/all",
  async () => {
    const response = await fetch(
      `${baseUrl}/org/get/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    console.log(json);
    if (response.ok) {
      return json;
    } else {
      throw new Error(json.message);
    }
  }
);

/**
 * @asyncThunk Search Ngo function.
 * @param  string $user - user state
 * @return returns user data in case of success and in case of error return error message.
 */
export const searchBooks = createAsyncThunk("/org/get/dsda", async (q) => {
  const response = await fetch(`${baseUrl}//org/get/all/?${q}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  if (response.ok) {
    return json;
  } else {
    throw new Error(json.message);
  }
});

export const ngoSlice = createSlice({
  name: "ngo",
  initialState: {
    ngos: [],
    searchBook: [],
    totalPages: 0,
    currentPage: 0,
    pending: false,
    success_message: "",
    error: false,
    error_message: "",
  },
  reducers: {},
  extraReducers: {
    //? States for books.
    [fetchAllNgos.pending]: (state) => {
      state.pending = true;
    },
    [fetchAllNgos.fulfilled]: (state, action) => {
      state.pending = false;
      console.log(action.payload);
      state.ngos = action.payload.ngos;
      state.success_message = action.payload.message;
    },
    [fetchAllNgos.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      state.error_message = action.error.message;
    },
    //? States for search.
    [searchBooks.pending]: (state) => {
      state.pending = true;
    },
    [searchBooks.fulfilled]: (state, action) => {
      state.pending = false;
      state.searchBook = action.payload.books;
      state.success_message = action.payload.message;
    },
    [searchBooks.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      state.error_message = action.error.message;
    },
  },
});

export default ngoSlice.reducer;
