"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flux_1 = require("flux");
var listStore_1 = require("./listStore");
exports.flightDispatcher = new flux_1.Dispatcher();
exports.flightDispatcher.register(function (action) {
    switch (action.actionType) {
        case 'ADD_NEW_ITEM':
            listStore_1.MyStore.addNewItemHandler(action.text);
            listStore_1.MyStore.emitChange();
            break;
        default:
    }
});
//# sourceMappingURL=dispatcher.js.map