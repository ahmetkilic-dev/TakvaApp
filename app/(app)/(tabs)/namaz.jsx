import { View, Text, StyleSheet } from 'react-native';

export default function NamazScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Namaz Vakitleri</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#04100D',
    },
    text: {
        color: '#D4AF37',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
