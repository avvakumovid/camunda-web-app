import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  showModal: false,
  processKey: null,
  processFields: null,
  processBody: {},
  processHtmlForm: null,
};

export const getProcessFields = createAsyncThunk(
  "process/getProcessFields",
  async function (processKey) {
    const response = await axios.get(
      `http://localhost:8080/engine-rest/process-definition/key/${processKey}/deployed-start-form`
    );

    return { fields: response.data.components, key: processKey };
  }
);

export const getProcessHtmlForm = createAsyncThunk(
  "process/getProcessHtmlForm",
  async function (processKey) {
    const response = await axios.get(
      `http://localhost:8080/engine-rest/process-definition/${processKey}/deployed-start-form`
    );

    return {
      form: response.data,
      // .replaceAll("\n", "").replaceAll("\r", ""),
      key: processKey,
    };
  }
);

export const startProcess = createAsyncThunk(
  "process/startProcess",
  async function (payload) {
    const response = await axios.post(
      `http://localhost:8080/engine-rest/process-definition/${payload.processKey}/start`,
      { variables: payload.processBody }
    );
    return response.data;
  }
);

const processSlice = createSlice({
  name: "process",
  initialState,
  reducers: {
    setProcessKey: (state, action) => {
      state.processKey = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = !state.showModal;
    },
    setProcessBody: (state, action) => {
      state.processBody = { ...state.processBody, ...action.payload };
    },
  },
  extraReducers: {
    [getProcessFields.fulfilled]: (state, action) => {
      // //console.log("getProcessFields.fulfilled", action.payload);
      state.processFields = action.payload.fields;
      state.processKey = action.payload.key;
    },
    [getProcessFields.rejected]: (state, action) => {
      // //console.log("getProcessFields.rejected", action.payload);
      state.processFields = action.payload;
    },
    [getProcessFields.pending]: (state, action) => {
      // //console.log("getProcessFields.pending", action.payload);
      state.processFields = action.payload;
    },
    [getProcessHtmlForm.fulfilled]: (state, action) => {
      // //console.log("getProcessHtmlForm.fulfilled", action.payload);
      state.processHtmlForm = action.payload.form;
      state.processKey = action.payload.key;
    },
    [getProcessHtmlForm.rejected]: (state, action) => {
      // //console.log("getProcessHtmlForm.rejected", action.payload);
      // state.processFields = action.payload;
    },
    [getProcessHtmlForm.pending]: (state, action) => {
      // //console.log("getProcessHtmlForm.pending", action.payload);
      // state.processFields = action.payload;
    },
    [startProcess.fulfilled]: (state, action) => {
      // //console.log("startProcess.fulfilled", action.payload);
      // state.processFields = action.payload;
    },
    [startProcess.rejected]: (state, action) => {
      // //console.log("startProcess.rejected", action.payload);
      // state.processFields = action.payload;
    },
    [startProcess.pending]: (state, action) => {
      // //console.log("startProcess.pending", action.payload);
      // state.processFields = action.payload;
    },
  },
});

export const { setProcessKey, setShowModal, setProcessBody } =
  processSlice.actions;
export default processSlice.reducer;
