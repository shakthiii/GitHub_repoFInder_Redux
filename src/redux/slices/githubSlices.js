import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  // REACT_APP_GITHUB_TOKEN: "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",
  headers: {
    Authorization: `Token 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`
  }
};

function sortByProperty(property) {
  return function (a, b) {
    if (a[property] < b[property]) return 1;
    else if (a[property] > b[property]) return -1;

    return 0;
  };
}

export const fetchReposAction = createAsyncThunk(
  "repos/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${user}/repos`,
        config
      );
      return data.sort(sortByProperty("size"));
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response);
    }
  }
);

const repoSlices = createSlice({
  name: "repos",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReposAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchReposAction.fulfilled, (state, action) => {
      state.loading = false;
      state.repoList = action?.payload;
      state.error = undefined;
    });
    builder.addCase(fetchReposAction.rejected, (state, action) => {
      state.loading = false;
      state.repoList = undefined;
      state.error = action?.payload;
    });
  }
});

export default repoSlices.reducer;
