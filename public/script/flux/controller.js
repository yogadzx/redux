"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var buttonList_1 = require("./buttonList");
var listStore_1 = require("./listStore");
var buttonAction_1 = require("./buttonAction");
// interface ControllerState {
//     items: any
// }
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        var _this = _super.call(this) || this;
        _this.state = {
            items: listStore_1.MyStore.getAll()
        };
        _this.state.items = listStore_1.MyStore.getAll();
        _this._onChange = _this._onChange.bind(_this);
        return _this;
    }
    Controller.prototype.componentDidMount = function () {
        listStore_1.MyStore.addChangeListener(this._onChange);
    };
    Controller.prototype.componentWillUnmount = function () {
        listStore_1.MyStore.removeChangeListener(this._onChange);
    };
    Controller.prototype._onChange = function () {
        this.setState({ items: listStore_1.MyStore.getAll() });
    };
    Controller.prototype.createNewItem = function () {
        buttonAction_1.ButtonActions.addNewItem('new item');
    };
    Controller.prototype.render = function () {
        return (React.createElement(buttonList_1.ButtonList, { items: this.state.items, onClick: this.createNewItem }));
    };
    return Controller;
}(React.Component));
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map