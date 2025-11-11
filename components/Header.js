import React, { useState } from "react";
import { 
    StyleSheet,
    View,
    TouchableOpacity, 
    Text,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default function Header ({ title, navigation }) {    
    return (
        <View style={styles.header}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={24} color="#343232" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        shadowOpacity: 5,
        backgroundColor: '#D4F4E7',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    backButton: {
        position: 'absolute',
        left: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343232',
    },    
});
