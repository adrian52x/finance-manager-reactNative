install tanstack query.
create custome hook.

export const useCategories = () => {
  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories, isLoading, error } = useQuery(['categories'], CategoriesAPI.getCategories);

  // Create a new category
  const createCategory = useMutation(CategoriesAPI.createCategory, {
    onSuccess: () => {
      // Invalidate the categories query to refetch the updated list
      queryClient.invalidateQueries(['categories']);
    },
  });

  // Delete a category
  const deleteCategory = useMutation(CategoriesAPI.deleteCategory, {
    onSuccess: () => {
      // Invalidate the categories query to refetch the updated list
      queryClient.invalidateQueries(['categories']);
    },
  });

  return {
    categories,
    isLoading,
    error,
    createCategory,
    deleteCategory,
  };
};


Use inside react component.
  const { categories, isLoading, error, createCategory, deleteCategory } = useCategories();

//create
    createCategory.mutate({ title: newCategoryName });

//delete
    deleteCategory.mutate(id);