import { CategoriesAPI } from "@/api/CategoriesAPI";
import { CreateCategoryDTO } from "@/types/CreateCategoryDTO";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";


export const useCategories = () => {
    const queryClient = useQueryClient();
  
    // Fetch categories
    const { data: categories, isLoading, error, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: CategoriesAPI.getCategories,
    });
  
    // Create a new category
    const createCategory = useMutation({
        mutationFn: (category: CreateCategoryDTO) => CategoriesAPI.createCategory(category),
      onSuccess: () => {
        // Invalidate the categories query to refetch the updated list
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
    });
  
    // Delete a category
    const deleteCategory = useMutation({
        mutationFn: (categoryId: number) => CategoriesAPI.deleteCategory(categoryId),
      onSuccess: () => {
        // Invalidate the categories query to refetch the updated list
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
    });
  
    return {
      categories,
      isLoading,
      error,
      createCategory,
      deleteCategory,
      refetch, // Add refetch to manually fetch categories
    };
  };