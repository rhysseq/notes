/* eslint-disable prettier/prettier */
import { createEntityAdapter, createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { INote, INoteSliceInitialState } from "./types";
import { RootState } from "../../store";

const adapter = createEntityAdapter<INote, EntityId>({
    selectId: (note) => note.id,
});

const sliceParameters: INoteSliceInitialState = {
    loading: false,
}
const initialState = adapter.getInitialState(sliceParameters);

export const slice = createSlice({
    name: "note",
    initialState: initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        addNote: adapter.addOne,
        removeNote: adapter.removeOne,
        updateNote: adapter.updateOne,
        addNotes: adapter.addMany,
    },
});

const reducer = slice.reducer
export default reducer

export const { setLoading: setNoteLoading, addNote, removeNote, updateNote } = slice.actions

export const {
    selectById: selectNoteById,
    selectIds: selectNoteIds,
    selectEntities: selectNoteEntities,
    selectAll: selectAllNotes,
} = adapter.getSelectors((state: RootState) => state.note)
