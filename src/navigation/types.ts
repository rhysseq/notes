import { StackScreenProps } from "@react-navigation/stack";
import { EntityId } from "@reduxjs/toolkit";

export type RootStackParamList = {
    Notes: undefined;
    Note: { noteId: EntityId };
};
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}