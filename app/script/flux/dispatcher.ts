import { Dispatcher } from 'flux';
import { MyStore } from './listStore'

export const flightDispatcher = new Dispatcher();

flightDispatcher.register(function (action: any) {
    switch(action.actionType) {
        case 'ADD_NEW_ITEM':
            MyStore.addNewItemHandler(action.text);
            MyStore.emitChange();
            break;
        default:
        // no op
    }
})