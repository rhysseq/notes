import { useCallback } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { StandardLayout } from "../../components/layouts/StandardLayout";
import { RootStackScreenProps } from "../../navigation/types";
import { removeNote, selectNoteById, updateNote } from "../../store/features/note/slice";
import { RootState, useAppDispatch } from "../../store/store";
import { SelectCategory } from "./SelectCategory";
import { SelectClient } from "./SelectClient";
import { StandardButton } from "../../components/buttons/StandardButton";
import { ScrollView } from "react-native-gesture-handler";

export const Note: React.FC<RootStackScreenProps<'Note'>> = ({ navigation, route }) => {
    const { noteId } = route.params;
    const note = useSelector((state: RootState) => selectNoteById(state, noteId));
    const dispatch = useAppDispatch();

    const handleTitleUpdate = useCallback((title: string) => {
        dispatch(updateNote({
            id: noteId,
            changes: {
                title,
            }
        }));
    }, [dispatch, noteId]);

    const handleDeletePress = () => {
        dispatch(removeNote(noteId));
        navigation.goBack();
    }

    const handleBodyUpdate = useCallback((body: string) => {
        dispatch(updateNote({
            id: noteId,
            changes: {
                body,
            }
        }));
    }, [dispatch, noteId]);

    return (
        <StandardLayout style={styles.container} >
            <ScrollView
                contentContainerStyle={{
                    // flex: 1
                }}
                style={{
                    // flex: 1

                }}>

                <View style={{
                    flexGrow: 1,
                    padding: 10
                }}>

                    <StandardButton
                        style={styles.deleteButton}
                        variant="danger"
                        label="Delete"
                        onPress={handleDeletePress}
                    />
                    <TextInput
                        multiline={true}
                        style={styles.title}
                        placeholder="Title..."
                        value={note?.title}
                        onChangeText={handleTitleUpdate}
                    />
                    <SelectCategory
                        noteId={noteId}
                        selectedCategory={note?.categoryId}
                    />
                    <SelectClient
                        noteId={noteId}
                        selectedClient={note?.clientId}
                    />
                    <TextInput
                        multiline={true}
                        style={styles.noteText}
                        placeholder="Note Body..."
                        value={note?.body}
                        onChangeText={handleBodyUpdate}
                    />

                </View>

            </ScrollView>

        </StandardLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        flex: 1
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
        fontSize: 16,
        flexShrink: 1,
    },
    deleteButton: {
        marginTop: 10,
        alignSelf: 'flex-end',
    }
});