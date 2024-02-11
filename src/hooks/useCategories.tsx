// Custom hook to use the CategoriesContext
export const useCategories = () => {
    const context = useContext(CategoriesContext);
    if (context === undefined) {
      throw new Error('useCategories must be used within a CategoriesProvider');
    }
    return context;
  };
  