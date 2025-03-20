import { CategoriesAPI } from '@/api/CategoriesAPI';
import { Category } from '@/types/category';
import { CreateCategoryDTO } from '@/types/CreateCategoryDTO';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { act } from 'react';


// First, create the thunk
export const fetchCategories = createAsyncThunk(
	'categories/fetchAll',
	async () => {
		return await CategoriesAPI.getCategories();
	},
);

export const createCategory = createAsyncThunk(
	'categories/create',
	async (category: CreateCategoryDTO, { rejectWithValue }) => {
		try {
			return await CategoriesAPI.createCategory(category);
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
		
	},
);

export const deleteCategory = createAsyncThunk(
	'categories/delete',
	async (categoryId: number) => {
		return await CategoriesAPI.deleteCategory(categoryId);
	},
);

interface CategoryState {
  	categories: Category[];
	isLoading: boolean;
	error: string | null;
}

const initialState: CategoryState = {
  	categories: [],
	isLoading: false,
	error: null,
};

// Then, handle actions in your reducers:
const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null; 
		},
	},

  	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.categories = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.error = action.payload as string;
			})
			

		builder
			.addCase(createCategory.fulfilled, (state, action) => {		
				state.categories.push(action.payload);
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.error = action.payload as string;
			});

		builder
			.addCase(deleteCategory.fulfilled, (state, action) => {
				state.categories = state.categories.filter(category => category.title !== action.payload.title);
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				state.error = action.payload as string;
			});
  	},
});


export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;