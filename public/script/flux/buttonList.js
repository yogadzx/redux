"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function ButtonList(props) {
    var itemHtml = props.items.map(function (listItem, i) {
        return React.createElement("li", { key: i }, listItem);
    });
    return (React.createElement("div", null,
        React.createElement("ul", null, itemHtml),
        React.createElement("button", { onClick: props.onClick }, "add item")));
}
exports.ButtonList = ButtonList;
//# sourceMappingURL=buttonList.js.map