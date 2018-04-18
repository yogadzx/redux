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
var events_1 = require("events");
var ListStore = /** @class */ (function (_super) {
    __extends(ListStore, _super);
    function ListStore() {
        var _this = _super.call(this) || this;
        _this.items = [];
        return _this;
    }
    ListStore.prototype.getAll = function () {
        return this.items;
    };
    ListStore.prototype.addNewItemHandler = function (text) {
        this.items.push(text);
    };
    ListStore.prototype.emitChange = function () {
        this.emit('change');
    };
    ListStore.prototype.addChangeListener = function (callback) {
        this.on('change', callback);
    };
    ListStore.prototype.removeChangeListener = function (callback) {
        this.removeListener('change', callback);
    };
    return ListStore;
}(events_1.EventEmitter));
exports.MyStore = new ListStore();
