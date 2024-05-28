import React, {useState} from 'react';
import { Button, Input} from 'tamagui';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';


export default function LoginScreen() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMatch, setIsMatch] = useState(true);
    const handlePasswordChange = (text: string) => {
     
        setIsMatch(text ==="" || confirmPassword ==="");
        
        //setIsMatch(text === confirmPassword);
        setPassword(text);
      };
    
      const handleConfirmPasswordChange = (password:string) => {
        setConfirmPassword(password);
        setIsMatch(password === password);
      };
    return (
        <View style={styles.container}>
            <View style={styles.popup}>
                
                <Text style={styles.text}>Sign up</Text>
                <View style={styles.row}>
                <Input style={styles.side} placeholder="Name" />
                <Input style={styles.side} placeholder="Surname" />
                </View>
                <Input style={styles.fields} placeholder="Email" />
                <Input style={isMatch? styles.fields:styles.errorfields} secureTextEntry={true} onChangeText={handlePasswordChange} placeholder="Password" />
                <Input style={isMatch?styles.fields:styles.errorfields} secureTextEntry={true} onChangeText={handleConfirmPasswordChange}placeholder="Confirm Password" />
                <Text style={styles.ErrorMessages}>{isMatch? "": "Please ensure both passwords are identical."}</Text>
                <Button style={styles.signup} onPress={() => {}} backgroundColor={'darkgray'}> Sign up</Button>
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
    signup: {
        width:100,
        marginLeft: 75,
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
        height: 320,
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
    errorfields: {
        backgroundColor: 'red',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        paddingBottom: 10,
    },
    ErrorMessages: {
        color: 'red',
        fontSize: 10,
        textAlign: 'center',
    }

});

