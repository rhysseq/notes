import { EntityId } from "@reduxjs/toolkit";
import { FC, useCallback, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { StandardButton } from "../../components/buttons/StandardButton";
import { categories } from "../../data/categories.json";
import { updateNote } from "../../store/features/note/slice";
import { useAppDispatch } from "../../store/store";
import { StandardLayout } from "../../components/layouts/StandardLayout";

export const SelectCategory: FC<{ selectedCategory?: string, noteId: EntityId }> = ({ selectedCategory, noteId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useAppDispatch();

    const handleCategoryPress = useCallback((categoryId: string) => {
        dispatch(updateNote({
            id: noteId,
            changes: {
                categoryId,
            }
        }));
        setModalVisible(false);
    }, [dispatch, selectedCategory]);

    return (
        <View>
            <Text style={styles.categoryTitle}>Category</Text>
            <StandardButton
                label={categories.find((cat) => cat.id === selectedCategory)?.name ?? 'Select a Category...'}
                onPress={() => setModalVisible(true)}
            />
            <Modal
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)} visible={modalVisible}>
                <View style={styles.overlay}>
                    <StandardLayout style={styles.modalContainer}>
                        <StandardButton
                            style={{ alignSelf: 'flex-end' }}
                            label={'Close'}
                            onPress={() => setModalVisible(false)}
                        />
                        {categories.map((category: any) => (
                            <Pressable
                                key={category.id}
                                onPress={() => handleCategoryPress(category.id)}
                                style={({ pressed }) => ([styles.noteContainer, { opacity: pressed ? 0.3 : 1 }])}  >
                                <Text style={styles.categoryName}>{category.name}</Text>
                                <Text style={styles.categoryDescription}>{category.description}</Text>
                            </Pressable>
                        ))
                        }
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
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryDescription: {
        fontSize: 12,
        fontWeight: '300',
    },
    modalContainer: {
        padding: 20,
        minWidth: '90%',
        // backgroundColor: 'white',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.5)'
    }
});