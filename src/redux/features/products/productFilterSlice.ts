import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProductFilter {
  status: boolean;
  priceRange: number;
}

const initialState: IProductFilter = {
  status: false,
  priceRange: 150,
};

const productFilterSlice = createSlice({
  name: 'productFilter',
  initialState,
  reducers: {
    toggleStatus: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleStatus, setPriceRange } = productFilterSlice.actions;
export default productFilterSlice.reducer;
