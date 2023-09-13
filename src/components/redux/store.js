import { configureStore } from '@reduxjs/toolkit'

const reducerApp = (prevState = [], action) => {
    const { type, payload } = action;
    const newState = [...prevState]

    switch (type) {
        case 'ADD':
            return [...newState, payload];

        case 'DELETE':
            if (newState.length <= 1) return [];
            else {
                newState.splice(payload, 1);
                return [...newState];
            }

        case 'EDIT':
            newState.splice(payload.id, 1, payload.value);
            return [...newState];

        default:
            return newState;
    }
}

export default configureStore({ reducer: reducerApp });
