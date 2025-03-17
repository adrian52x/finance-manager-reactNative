import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Entry } from '@/types/entry';

const Home = () => {
    const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        fetchEntries();
           
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

    const screenWidth = Dimensions.get('window').width;

    // Calculate the total amount
  const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);

    // Function to generate random colors for PieChart
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Prepare data for PieChart
    const pieChartData = entries.map(entry => ({
        name: entry.name,
        amount: entry.amount,
        color: getRandomColor(),
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    }));

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Total Amount: {totalAmount}</Text>
            <Text style={styles.subtitle}>Pie Chart</Text>
            <PieChart
                data={pieChartData}
                width={screenWidth - 16}
                height={220}
                chartConfig={chartConfig}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </SafeAreaView>
    )
}

export default Home


const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 25,
      textAlign: 'center',
      marginVertical: 20,
    },
    subtitle: {
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 10,
    },
});