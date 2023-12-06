import { EntityId } from "@reduxjs/toolkit"

export interface INote {
    id: EntityId
    title: string
    body: string
    categoryId: string
    clientId: string
}

export interface INoteSliceInitialState {
    loading: boolean

}
