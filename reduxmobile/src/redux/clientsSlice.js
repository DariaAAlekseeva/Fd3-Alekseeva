import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await fetch('https://fe.it-academy.by/Examples/mobile_company.json');
  const data = await response.json();
  return data;
});

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    companyName: '',
    clients: [],
  },
  reducers: {
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
    deleteClient: (state, action) => {
      state.clients = state.clients.filter(client => client.id !== action.payload);
    },
    updateClient: (state, action) => {
      const index = state.clients.findIndex(client => client.id === action.payload.id);
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.companyName = action.payload.companyName;
      state.clients = action.payload.clientsArr; 
    });
  },
});

export const { addClient, deleteClient, updateClient } = clientsSlice.actions;
export default clientsSlice.reducer;
