import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Helper function to load cart data from localStorage
const loadCartData = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : { products: [] };
};

// Helper function to save cart data to localStorage
const saveCartData = (cartData) => {
  localStorage.setItem("cart", JSON.stringify(cartData));
};

// Fetch cart data for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/api/cart`, {
        params: {
          guestId,
          userId,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add an item to cart for a user or guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { guestId, userId, productId, quantity, size, color },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart`, {
        guestId,
        userId,
        productId,
        quantity,
        size,
        color,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update the quantity of an item in cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (
    { guestId, userId, productId, quantity, size, color },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${backendUrl}/api/cart`, {
        guestId,
        userId,
        productId,
        quantity,
        size,
        color,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Remove an item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ guestId, userId, productId, size, color }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/cart`, {
        data: { guestId, userId, productId, size, color },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// merge guest cart into user cart
export const mergeGuestCart = createAsyncThunk(
  "cart/mergeGuestCart",
  async ({ guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/merge`,
        {
          guestId,
          userId,
        },
        {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartData(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartData(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartData(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add to cart";
      })

      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartData(action.payload);
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to update item quantity in cart";
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartData(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to remove item from cart";
      })

      .addCase(mergeGuestCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeGuestCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartData(action.payload);
      })
      .addCase(mergeGuestCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to merge cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
