
import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert, Modal, Pressable,TextInput } from "react-native";



export default function Todo({ title, description, status, startTime, endTime }) {

    const [isExpandable, setExpandable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setEdit] = useState(false) ;

    return <View style={styles.container}>
        <TouchableOpacity style={styles.todo} onPress={() => setExpandable(!isExpandable)} onLongPress={() => {
            // user has 2 option either delete or update the todo, if the status is pending we can show both
            // if status is not pending then we need to show only delete

            setShowModal(true)


        }} >
            <Text style={styles.todoText}> {title} </Text>
            <Text style={status === 'doing' ? { color: '#f1f5f9' } : { color: '#94a3b8' }}> {status}</Text>


        {
            // this is the modal that occurs when showModal was true
        }

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => {
                        setEdit(false)                        
                        setShowModal(false)
                    }}
                >
                    {
                        !isEdit ? <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Choose an action</Text>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                console.log("Edit pressed");
                                setEdit(true);
                            }}
                        >
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, styles.deleteButton]}
                            onPress={() => {
                                console.log("Delete pressed");
                                setShowModal(false);
                            }}
                        >
                            <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        
                    </View> : <View style={styles.modalContent}>
                            
                            <Text style={styles.modalTitle}> Edit Todo </Text>
                            <Text style={[styles.deleteText, {fontSize: 10}]}> if you dont want to update any one leave empty</Text>
                            <TextInput placeholder="title" placeholderTextColor={'#94a3b8'} style={styles.input}/>
                            <TextInput placeholder="description" placeholderTextColor={'#94a3b8'} style={styles.input}/>
                            <TouchableOpacity onPress={() => {
                                setEdit(false);
                                setShowModal(false) ;
                            }} style={styles.modalButton}>
                                <Text style={styles.buttonText}> update todo </Text>
                            </TouchableOpacity>
                    </View>
                    }
                </Pressable>
            </Modal>





        </TouchableOpacity>
        {
            isExpandable && <View style={styles.expand}>
                <Text style={{}} > {description}</Text>
                {startTime && <Text style={styles.time}>start time: {startTime} </Text>}
                {endTime && <Text style={styles.time}>end time: {endTime} </Text>}
                {
                    status === 'not yet started' ? <TouchableOpacity style={styles.btn}>
                        <Text style={styles.txt}> start </Text>
                    </TouchableOpacity> : status === 'Doing' && <TouchableOpacity style={styles.btn}>
                        <Text style={styles.txt}> mark as done </Text>
                    </TouchableOpacity>
                }
            </View>
        }
    </View>
}



const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#1e293b',
        width: '90%',
        marginVertical: 6,
    },
    todo: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        padding: 16,
    },
    todoText: {
        color: '#f1f5f9'
    },
    expand: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: '#f1f5f9',
        marginTop: 15,
        borderRadius: 8,
        padding: 12,
        minWidth: '100%',
    },
    time: {
        color: 'rgb(100, 116, 139)'
    },
    btn: {
        backgroundColor: '#3b82f6',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    txt: {
        fontWeight: 'bold',
        color: '#f1f5f9'
    },
    modalOverlay: { // how background should appear
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#0f172a',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#f1f5f9'
    },
    modalButton: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#3b82f6',
    },
    deleteButton: {
        backgroundColor: '#e11d48',
    },
    cancelButton: {
        marginTop: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#f1f5f9'
    },
    deleteText: {
        color: '#f1f5f9',
    },
    input:{
        color: '#f1f5f9',
        backgroundColor: '#1e293b',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#334155',
        width: '100%',
        marginTop: 12,
    },
});