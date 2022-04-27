import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    headerView: {
        justifyContent: 'space-between',
        height: 44,
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    headerButtonView: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonText: {
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.05)',
        borderRadius: 20,
        marginLeft: 12
    },
    colorView: {
        marginVertical: 8,
        marginHorizontal: 8,
        padding: 4,
        borderRadius: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.05)',
        flex:1
    },
    buttonText: {
        fontSize: 30,
    },
    textInput: {
        height: 40,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        borderColor: 'rgba(52, 52, 52, 0.5)',
        justifyContent: 'space-between', 
        flexDirection: 'row',
        alignItems: 'center'
    },
    formTitle: {
        fontSize: 16,
        height: 40,
        marginTop: 12,
        marginLeft: 14
    },
    statusBarStyle: {
        // flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.1)",
    },
    buttonStyle: {
        marginVertical: 16,
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
        borderRadius: 8,
    },
    imageIcon: {
        width: 22,
        height: 22
    }
});