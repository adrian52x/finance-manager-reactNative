import { View, Text, FlatList, Button, Alert, TextInput , StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Category } from '@/types/category';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateCategoryDTO } from '@/types/CreateCategoryDTO';
import { CategoriesAPI } from '@/api/CategoriesAPI';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { createCategory, fetchCategories, deleteCategory, clearError } from '@/store/categorySlice';


const CategoriesScreen = () => {
    const dispatch = useDispatch<AppDispatch>()
    const categories = useSelector((state: RootState) => state.category.categories)
    const categoryError = useSelector((state: RootState) => state.category.error)


    const [newCategoryName, setNewCategoryName] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    useEffect(() => {
        dispatch(fetchCategories())
    }, []);

    // Clear the error after 3 seconds
    useEffect(() => {
        if (categoryError) {
        const timer = setTimeout(() => {
            dispatch(clearError());
        }, 3000); // Clear error after 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [categoryError, dispatch]);


const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
        const newCategory = new CreateCategoryDTO(newCategoryName)
        dispatch(createCategory(newCategory))

        //setNewCategoryName('');
        //setIsAddingCategory(false);
    }
}


const handleDeleteCategory = async (category: Category) => {
    console.log('Deleting category:', category);
    
    Alert.alert(
        'Delete Category',
        `Are you sure you want to delete this category (${category.title})?`,
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        dispatch(deleteCategory(category.id))
                    } catch (error) {
                        console.error('Error deleting category:', error);
                    }
                },
            },
        ],
        { cancelable: false }
    );
};


    return (
        <SafeAreaView style={styles.container}>
            {isAddingCategory ? (
                <>
                    <TextInput
                        value={newCategoryName}
                        onChangeText={setNewCategoryName}
                        placeholder="Enter category name"
                        style={{ borderBottomWidth: 1, marginBottom: 10 }}
                    />
                    <Button title="Add Category" onPress={handleAddCategory} />
                    <View style={{ height: 10 }} />
                    <Button title="Cancel" onPress={() => setIsAddingCategory(false)} />
                </>
            ) : (
                <>
                    <Button title="Add New Category" onPress={() => setIsAddingCategory(true)} />
                </>
            )}

            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1 }}>
                    <Text>{item.title}</Text>
                    <Button title="X" onPress={() => handleDeleteCategory(item)} />
                </View>
                )}
            />

            {/* Display the error message */}
            {categoryError && (
                <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{categoryError}</Text>
                </View>
            )}   

        </SafeAreaView>    
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
        backgroundColor: '#fff',
    },
    errorContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default CategoriesScreen