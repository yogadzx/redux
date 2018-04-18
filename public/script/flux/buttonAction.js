"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispatcher_1 = require("./dispatcher");
exports.ButtonActions = {
    addNewItem: function (text) {
        dispatcher_1.flightDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        });
    }
};
//# sourceMappingURL=buttonAction.js.map