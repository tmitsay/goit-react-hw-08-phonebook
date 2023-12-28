import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix";
import { options } from "components/ContactForm/ContactForm";


axios.defaults.baseURL = 'https://connections-api.herokuapp.com/'


const fetchContacts = async (_, thunkAPI) => {

    try {
        const { data } = await axios.get('contacts');
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
    
};

const addContact = async ({name, number}, thunkAPI) => { 
    try { 
        const { data } = await axios.post('contacts', { name, number })
        Notify.success('Contact added successfully', options)
return data
    }
    catch (error) {
         return thunkAPI.rejectWithValue(error.message)
    }
}


const deleteContact = async (contactId, thunkAPI) => {
    try { 
        const { data } = await axios.delete(`contacts/${contactId}`)
        Notify.warning('Contact delete successfully', options)
        return data
    }
    catch (error) {
         return thunkAPI.rejectWithValue(error.message)
    }
}


export const fetchContactsThunk = createAsyncThunk(
    'contacts/fetchContacts',
    fetchContacts
)
export const addContactThunk = createAsyncThunk(
    'contacts/addContacts',
    addContact
)
export const deleteContactThunk = createAsyncThunk(
    'contacts/deleteContacts',
    deleteContact
)