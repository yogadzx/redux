"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flux_1 = require("flux");
exports.ButtonActions = {
    addNewItem: function (text) {
        flux_1.Dispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        });
    }
};
