import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { name: "", email: "" },
  reducers: {
    saveProfile(_state, { payload }) {
      return { name: payload.name, email: payload.email };
    },
  },
});

export const { saveProfile } = profileSlice.actions;
export default profileSlice.reducer;