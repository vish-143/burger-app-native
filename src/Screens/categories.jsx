import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log('data: ', data);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <View>
                <Text style={{color:"black",textAlign:"center",fontSize:20,fontWeight:"bold"}}>Categories Screen</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {categories.map(category => (
                    <Text key={category.id}>{category.name}</Text>
                ))}
            </View>
        </>
    );
};

export default Categories;
