import React from 'react';
import { Button, Input} from 'tamagui';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.popup}>
                
                <Text style={styles.text}>Sign up</Text>
                <View style={styles.row}>
                <Input style={styles.side} placeholder="Name" />
                <Input style={styles.side} placeholder="Surname" />
                </View>
                <Input style={styles.fields} placeholder="Email" />
                <Input style={styles.fields} secureTextEntry={true} placeholder="Password" />
                <Input style={styles.fields} secureTextEntry={true} placeholder="Confirm Password" />
            </View>
            <Text style={styles.askers}> Already have an account?</Text>
            <View style={styles.buttons}>
            
            <Button onPress={() => {router.push("./LoginScreen")}} backgroundColor={'darkgray'}> login</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    askers: {
        fontSize: 12,
    },
    side: {
        width: 100,
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 200,
        marginTop: 10,
    },
    popup: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 250,
        height: 265,
    },
    text: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    fields: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        paddingBottom: 10,
    },

});
