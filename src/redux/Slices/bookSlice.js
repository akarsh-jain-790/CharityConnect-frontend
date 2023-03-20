import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseUrl = `http://localhost:4000/api/v1`;

/**
 * @asyncThunk Search Books function.
 * @param  string $user - user state
 * @return returns user data in case of success and in case of error return error message.
 */
export const searchBooks = createAsyncThunk("books/searchBooks", async (q) => {
  const response = await fetch(`${baseUrl}/books/searchBooks/?${q}`, {
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

/**
 * @asyncThunk Book fetch function.
 * @param  int page - page number
 * @return returns the books.
 */
export const fetchAllBooks = createAsyncThunk(
  "books/getBooks",
  async (page) => {
    const response = await fetch(
      `${baseUrl}/books/getBooks/?page=${page}&limit=6`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      throw new Error(json.message);
    }
  }
);

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    book: [],
    searchBook: [],
    totalPages: 0,
    currentPage: 0,
    pendinng: false,
    success_message: "",
    error: false,
    error_message: "",
  },
  reducers: {},
  extraReducers: {
    //? States for books.
    [fetchAllBooks.pending]: (state) => {
      state.pending = true;
    },
    [fetchAllBooks.fulfilled]: (state, action) => {
      state.pending = false;
      state.book = action.payload.books;
      state.totalPages = action.payload.totalPages;
      state.currentPage = Number(action.payload.currentPage);
      state.success_message = action.payload.message;
    },
    [fetchAllBooks.rejected]: (state, action) => {
      state.pending = false;
      state.error = true;
      console.log("error", action.error.message);

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
      console.log("error", action.error.message);

      state.error_message = action.error.message;
    },
  },
});

export default bookSlice.reducer;
