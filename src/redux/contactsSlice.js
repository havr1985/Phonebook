import { createSlice } from "@reduxjs/toolkit";
import { requestContacts, requestAddContacts, requestDeleteContacts,requestUpdateFavorite, requestFavoriteContacts } from "services/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const contacts = await requestContacts();
            return contacts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContacts = createAsyncThunk(
    'contacts/addContact',
    async (newContact, thunkAPI) => {
        try {
            const contacts = await requestAddContacts(newContact);
            return contacts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContacts = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkAPI) => {
        try {
            const contacts = await requestDeleteContacts(contactId);
            return contacts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateFavorite = createAsyncThunk(
  'contacts/updateFavorite',
  async (formData, thunkAPI) => {
    const [_id, newFavorite] = formData;
    try {
      const contacts = await requestUpdateFavorite(_id, newFavorite);
      return contacts;
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const favoriteContacts = createAsyncThunk(
  'contacts/favoriteContacts',
  async (_, thunkAPI) => {
    try {
            const contacts = await requestFavoriteContacts();
            return contacts;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
  }
)

const initialState = {
    items: [],
    isLoading: false,
    error: null,
}

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    
    extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    
    .addCase(addContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          item => item._id !== action.payload._id
        );
      })
      .addCase(deleteContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
        .addCase(updateFavorite.fulfilled, (state, action) => {
          
          const idx = state.items.findIndex(item => item._id === action.payload._id);
          state.items[idx] = action.payload;
        
        })
        .addCase(updateFavorite.rejected, (state, action) => {
      state.error = action.payload
        })
    .addCase(favoriteContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(favoriteContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(favoriteContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
});

export const contactsReducer = contactsSlice.reducer;