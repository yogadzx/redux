import { flightDispatcher } from './dispatcher';

export const ButtonActions = {
    addNewItem: function (text: string) {
        flightDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        });
    }
};

