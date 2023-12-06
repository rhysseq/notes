import { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { categories } from "../../data/categories.json";

export const SelectedCategory: FC<{ categoryId: string }> = ({ categoryId }) => {
    const category = categories.find((category) => category.id === categoryId);
    return (
        <View>
            <Text style={styles.categoryName}>
                Category: {category?.name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryName: {
        fontSize: 12,
        fontWeight: 'bold',
    }
})