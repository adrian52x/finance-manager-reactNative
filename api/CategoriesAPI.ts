import { Category } from "@/types/category";
import { CreateCategoryDTO } from "@/types/CreateCategoryDTO";

const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export class CategoriesAPI {
    static async getCategories(): Promise<Category[]> {
        const response = await fetch(`${apiUrl}/api/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return await response.json();
    }

    static async createCategory(category: CreateCategoryDTO): Promise<Category> {
        const response = await fetch(`${apiUrl}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create category');
        }
        return await response.json();
    }

    static async deleteCategory(categoryId: number): Promise<Category> {
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete category');
        }
        return await response.json();
    }
}
