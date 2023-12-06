import { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import clients from "../../data/fake_clients.json"

export const SelectedClient: FC<{ clientId: string }> = ({ clientId }) => {
    const client = clients.find((client) => client.id === clientId);
    return (
        <View>
            <Text style={styles.clientName}>
                Client: {client?.name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    clientName: {
        fontSize: 12,
        fontWeight: 'bold',
    }
})