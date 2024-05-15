import React from 'react';
import { Button, Input} from 'tamagui';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.popup}>
                
                <Text style={styles.text}>Login</Text>
                <Input style={styles.fields} placeholder="Email" />
                <Input style={styles.fields} secureTextEntry={true} placeholder="Password" />
            </View>

            <View style={styles.buttons}>
            <Button onPress={() => {router.push("./Sign-up")}} backgroundColor={'darkgray'}> Sign up</Button>
            <Button onPress={() => {}} backgroundColor={'darkgray'}> Log in</Button>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 200,
        marginTop: 10,
    },
    popup: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 200,
        height: 155,
    },
    text: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold',
    },
    fields: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        paddingBottom: 10,
    },

});
