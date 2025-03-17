import { View, Text, StyleSheet, FlatList, Modal, Button, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Entry } from '@/types/entry';
import { CreateEntryDTO } from '@/types/CreateEntryDTO';
import { Category } from '@/types/category';

const EntriesScreen = () => {
    const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    const [modalVisible, setModalVisible] = useState(false);

    const [entries, setEntries] = useState<Entry[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [newEntry, setNewEntry] = useState<CreateEntryDTO>({
        name: '',
        amount: 0,
        category: 0,
    });


    useEffect(() => {
        fetchEntries();
        fetchCategories();
    }, []);
  
  
    const fetchEntries = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/entries`); // Replace with your backend URL
            const data = await response.json();
            
            setEntries(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchCategories = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/categories`);
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
    };

    const handleAddEntry = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/entries`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEntry),
          });
          console.log(newEntry);
          
          if (response.ok) {
            fetchEntries(); // Refresh the list after adding a new entry
            setNewEntry({ name: '', amount: 0, category: 0 }); // Clear the form
            setModalVisible(false); // Close the modal
          }
        } catch (error) {
          console.error('Error adding entry:', error);
        }
    };

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
                    {categories.map((category) => (
                        <Picker.Item key={category.id} label={category.title} value={category.id} />
                    ))}
                    </Picker>
                    <Button title="Add Entry" onPress={handleAddEntry} />
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