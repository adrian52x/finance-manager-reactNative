import { View, Text, StyleSheet, FlatList, Modal, Button, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Entry } from '@/types/entry';
import { CreateEntryDTO } from '@/types/CreateEntryDTO';
import { Category } from '@/types/category';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCategories } from '@/store/categorySlice';
import { useEntries } from '@/hooks/useEntries';

const EntriesScreen = () => {
    const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    const [modalVisible, setModalVisible] = useState(false);

    // const [entries, setEntries] = useState<Entry[]>([]);
    const { entries, isLoading, error, createEntry, deleteEntry } = useEntries();

    const dispatch = useDispatch<AppDispatch>()
    const categories = useSelector((state: RootState) => state.category.categories)

    const [newEntry, setNewEntry] = useState<CreateEntryDTO>({
        name: '',
        amount: 0,
        category: 0,
    });


    useEffect(() => {
        // fetchEntries();
        dispatch(fetchCategories())
    }, []);
  
  
    const handleAddEntry = async () => {
        createEntry.mutate(newEntry, {
          onSuccess: () => {
            console.log("entry added", newEntry);
            setNewEntry({ name: '', amount: 0, category: 0 }); // Clear the form
            setModalVisible(false); // Close the modal
          },
          onError: (error) => {
            console.error('Error adding entry:', error);
            alert('Failed to add entry. Please try again.');
          },
        });
    };

    const handleDeleteEntry = (entry: Entry) => {
        Alert.alert(
        'Delete Entry',
        `Are you sure you want to delete this entry (${entry.name})?`,
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    deleteEntry.mutate(entry, {
                        onSuccess: () => {
                            console.log("entry deleted", entry);
                        },
                        onError: (error) => {
                            console.error('Error deleting entry:', error);
                            alert('Failed to delete entry. Please try again.');
                        },
                        });
                },
            },
        ],
        { cancelable: false }
    );
    
    }


    // const handleDeleteEntryBrowser = (entry: Entry) => {
    //     console.log('Deleting entry:', entry);
    
    //     const confirmDelete = window.confirm(`Are you sure you want to delete this category (${entry.name})?`);
    //     if (confirmDelete) {
    //        deleteEntry.mutate(entry, {
    //         onSuccess: () => {
    //             console.log("entry deleted", entry);
    //         },
    //         onError: (error) => {
    //             console.error('Error deleting entry:', error);
    //             alert('Failed to delete entry. Please try again.');
    //         },
    //         })
    //     };
    // }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={entries}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1 }}>
                    <Text>{item.name}</Text>
                    <Text>{item.amount}</Text>
                    <Text>{item.category.title}</Text>
                    <Button title="X" onPress={() => handleDeleteEntry(item)} />
                </View>
                )}
            />

            <Button title="Add Entry" onPress={() => setModalVisible(true)} />
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TextInput
                    placeholder="Name"
                    value={newEntry.name}
                    onChangeText={(text) => setNewEntry({ ...newEntry, name: text })}
                    style={styles.input}
                    />
                    <TextInput
                    placeholder="Amount"
                    value={newEntry.amount.toString()}
                    onChangeText={(text) => setNewEntry({ ...newEntry, amount: parseFloat(text) })}
                    style={styles.input}
                    keyboardType="numeric"
                    />
                    <Picker
                    selectedValue={newEntry.category}
                    onValueChange={(categoryId) =>
                        setNewEntry({ ...newEntry, category: Number(categoryId) })
                    }
                    >
                    <Picker.Item label="Select ..." value={undefined} />
                    {categories.map((category) => (
                        <Picker.Item key={category.id} label={category.title} value={category.id} />
                    ))}
                    </Picker>
                    <Button
                    title="Add Entry"
                    onPress={handleAddEntry}
                    disabled={!newEntry.category || !newEntry.name || newEntry.amount <= 0} // Disable button if category is not selected
                    />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 20,
    },
    entry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
});

export default EntriesScreen;