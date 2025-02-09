import { StyleSheet } from "react-native"
const styles_ = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        width: '100%'
    }
})

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        width: '100%',
        paddingTop: '10%'
    },
    flat1: {
        width: '100%',
        flexGrow: 1,
        alignItems: 'flex-start',
        marginTop: '5%',
        paddingBottom: '10%',
    },
    flat2: {
        width: '100%',
        flexGrow: 1,
        alignItems: 'flex-start',
        marginTop: '5%',
        paddingBottom: '30%',
    },
    side: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '90%'
    }
})


export default styles_