import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix";
import { options } from "components/ContactForm/ContactForm";


export const api = axios.create({
    baseURL: 'https://connections-api.herokuapp.com/'
})


const setAuthHeader = (token) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
}

const clearAuthHeader = () => {
    api.defaults.headers.common.Authorization = '';
}

 const postUser = async(newUser, thunkAPI) => {
    
    try {
        const { data } = await api.post('users/signup', newUser);
        setAuthHeader(data.token);
        return data;
    } 
  catch(error) {
        Notify.failure('We are sorry, something went wrong', options)
          return thunkAPI.rejectWithValue(error.message)
   }
}

const postLogIn = async (logInUser, thunkAPI) => {
       try {
        const { data } = await api.post('users/login', logInUser);
        setAuthHeader(data.token);
        return data;
    } 
  catch(error) {
        Notify.failure('You entered an incorrect login or password', options)
          return thunkAPI.rejectWithValue(error.message)
   }
}

const postLogOut = (_, thunkAPI) => {
    try {
        await api.post('users/logout');
        clearAuthHeader()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
   }
    }

const getCurrentUser = async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
        return thunkAPI.rejectWithValue('Unable to fetch user');
    };

    try {
        setAuthHeader(persistedToken);
        const { data } = await api.get('users/current');
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
}
}
    
export const postUserThunk = createAsyncThunk(
    'auth/postUser',
    postUser
)

export const postLogInThunk = createAsyncThunk(
    'auth/postLogIn',
    postLogIn
)

export const postLogOutThunk = createAsyncThunk(
    'auth/postLogOut',
    postLogOut
)

export const getCurrentUserThunk = createAsyncThunk(
    'auth/getCurrentUser',
    getCurrentUser
)