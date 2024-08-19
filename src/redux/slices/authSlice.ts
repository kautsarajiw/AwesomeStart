import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

// Definisikan tipe state untuk autentikasi
interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
  loading: boolean;
  error: string | null;
}

// State awal untuk autentikasi
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

// Buat slice untuk autentikasi
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer untuk memulai login atau register
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Reducer untuk login atau register yang berhasil
    authSuccess(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.loading = false;
    },
    // Reducer untuk login atau register yang gagal
    authFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducer untuk logout
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Ekspor actions yang dihasilkan oleh slice
export const { authStart, authSuccess, authFailure, logout } = authSlice.actions;

// Thunk action untuk login dengan hardcoded values
export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(authStart());
  try {
    // Simulasi login dengan hardcoded credentials
    if (username === 'Admin' && password === 'password') {
      dispatch(authSuccess(username));
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error: any) {
    dispatch(authFailure(error.message));
  }
};

// Thunk action untuk register dengan hardcoded values
export const register = (username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(authStart());
  try {
    // Simulasi register dengan hardcoded behavior
    if (username && password) {
      dispatch(authSuccess(username)); // Anggap pendaftaran selalu berhasil
    } else {
      throw new Error('Registration failed');
    }
  } catch (error: any) {
    dispatch(authFailure(error.message));
  }
};

// Ekspor reducer dari slice
export default authSlice.reducer;
