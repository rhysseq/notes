import { EntityId } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { FlatList, StyleSheet, Text, View, useColorScheme } from "react-native";
import uuid from 'react-native-uuid';
import { useSelector } from "react-redux";
import { StandardButton } from "../../components/buttons/StandardButton";
import { RootStackScreenProps } from "../../navigation/types";
import { addNote, selectNoteIds } from "../../store/features/note/slice";
import { useAppDispatch } from "../../store/store";
import { NoteItem } from "./NoteItem";
import { StandardLayout } from "../../components/layouts/StandardLayout";

export const Notes: React.FC<RootStackScreenProps<'Notes'>> = ({ navigation }) => {
    const isDark = useColorScheme() === 'dark';
    const noteIds = useSelector(selectNoteIds);
    const dispatch = useAppDispatch();

    const handleNotePress = useCallback(() => {
        const newId = uuid.v4() as EntityId;
        navigation.navigate('Note', { noteId: newId });
        dispatch(addNote({
            title: '',
            body: '',
            id: newId,
            categoryId: '',
            clientId: ''
        })
        );
    }, [dispatch]);

    return (
        <StandardLayout style={styles.container} >
            <FlatList
                initialNumToRender={10}
                extraData={{ isDark }}
                style={styles.flatlist}
                contentContainerStyle={styles.flatListContainer}
                data={noteIds}
                renderItem={({ item, }) => (
                    <NoteItem noteId={item} />
                )}
                ListEmptyComponent={() => (
                    <View style={styles.noteEmptyContainer}>
                        <Text style={styles.noteText}>You haven't created any notes yet!</Text>
                        <StandardButton
                            label="Add Note"
                            variant="success"
                            onPress={handleNotePress}
                        />
                    </View>
                )}
                keyExtractor={(item) => item as string}
            />
            <StandardButton
                style={styles.addButton}
                label="Add Note"
                variant="success"
                onPress={handleNotePress}
            />
        </StandardLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatlist: {
        flex: 1,
        padding: 3
    },
    flatListContainer: {
        flexGrow: 1,
        paddingBottom: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    noteEmptyContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    noteText: {
        fontSize: 16,
    },
    addButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 10
    }
});