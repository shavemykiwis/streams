import streams from '../apis/streams';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM } from './types';

export const signIn = (userId, userName) => {
  return {
    type: SIGN_IN,
    payload: { userId, userName }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth; // const userId = getState().auth.userId
  const res = await streams.post('/streams', { ...formValues, userId });
  dispatch({ type: CREATE_STREAM, payload: res.data });
  // Do programmatic navigation here!!!
  history.push('/');

};

export const fetchStreams = () => async dispatch => {
  const res = await streams.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: res.data });
};

export const fetchStream = (id) => async dispatch => {
  const res = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: res.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const res = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: res.data });
  // programmatic navigation
  history.push('/');
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/:${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
};
