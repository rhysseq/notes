import { useNavigation } from "@react-navigation/native";
import { EntityId } from "@reduxjs/toolkit";
import React, { FC, useCallback } from "react";
import { Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { StandardButton } from "../../components/buttons/StandardButton";
import { removeNote, selectNoteById } from "../../store/features/note/slice";
import { RootState, useAppDispatch } from "../../store/store";
import { SelectedCategory } from "./SelectedCategory";
import { SelectedClient } from "./SelectedClient";
import { StandardLayout } from "../../components/layouts/StandardLayout";

interface NoteParams {
    noteId: EntityId;
}

export const NoteItem: FC<NoteParams> = ({ noteId }) => {
    const isDarkMode = useColorScheme() === 'dark';
    const note = useSelector((state: RootState) => selectNoteById(state, noteId));
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    // const handleDeletePress = () => {
    //     dispatch(removeNote(noteId));
    // }

    const handleNotePressed = useCallback(() => navigation.navigate('Note', { noteId }), [noteId, navigation])

    return (
        <Pressable
            onPress={handleNotePressed}
            style={({ pressed }) => ([styles.noteContainer, { opacity: pressed ? 0.3 : 1 }])}>
            <StandardLayout style={styles.container}>
                <View
                    style={styles.textContainer}>
                    {note?.title &&
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={[styles.noteTitle, {
                                fontWeight: isDarkMode ? '600' : 'bold',
                            }]}>
                            {note?.title}
                        </Text>}
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.noteText}>
                        {note?.body}
                    </Text>
                    <SelectedClient clientId={note.clientId} />
                    <SelectedCategory categoryId={note.categoryId} />
                </View>
                {/* <StandardButton
                    style={styles.deleteButton}
                    variant="danger"
                    label="Delete"
                    onPress={handleDeletePress}
                /> */}
            </StandardLayout>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    noteContainer: {
        justifyContent: 'space-between',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'grey',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 5,
        overflow: 'hidden',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noteText: {
        fontSize: 12,
    },
    // deleteButton: {
    //     marginTop: 10,
    //     alignSelf: 'flex-end',
    // }

});