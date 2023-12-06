import { EntityId } from "@reduxjs/toolkit";
import { FC, useCallback, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { StandardButton } from "../../components/buttons/StandardButton";
import clients from "../../data/fake_clients.json";
import { updateNote } from "../../store/features/note/slice";
import { useAppDispatch } from "../../store/store";
import { StandardLayout } from "../../components/layouts/StandardLayout";
import { ScrollView } from "react-native-gesture-handler";

export const SelectClient: FC<{ selectedClient?: string, noteId: EntityId }> = ({ selectedClient, noteId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useAppDispatch();

    const handleClientPress = useCallback((clientId: string) => {
        dispatch(updateNote({
            id: noteId,
            changes: {
                clientId,
            }
        }));
        setModalVisible(false);
    }, [dispatch, selectedClient]);

    return (
        <View>
            <Text style={styles.clientTitle}>Client</Text>
            <StandardButton
                label={clients.find((client) => client.id === selectedClient)?.name ?? 'Select a Client...'}
                onPress={() => setModalVisible(true)}
            />
            <Modal
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)} visible={modalVisible}>
                <View style={styles.overlay}>
                    <StandardLayout style={styles.modalContainer}>
                        <ScrollView >
                            <StandardButton
                                style={{ alignSelf: 'flex-end' }}
                                label={'Close'}
                                onPress={() => setModalVisible(false)}
                            />
                            {clients.map((client) => (
                                <Pressable
                                    key={client.id}
                                    onPress={() => handleClientPress(client.id)}
                                    style={({ pressed }) => ([styles.noteContainer, { opacity: pressed ? 0.3 : 1 }])}  >
                                    <Text style={styles.clientName}>{client.name}</Text>
                                </Pressable>
                            ))
                            }
                        </ScrollView>
                    </StandardLayout>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    noteContainer: {
        marginBottom: 20
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    noteText: {
        fontSize: 16
    },
    clientTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    clientName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    clientDescription: {
        fontSize: 12,
        fontWeight: '300',
    },
    modalContainer: {
        padding: 20,
        minWidth: '90%',
        maxHeight: '90%',
        flexShrink: 1,
        // backgroundColor: 'white',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    }
});