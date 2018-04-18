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
var MyReact = /** @class */ (function (_super) {
    __extends(MyReact, _super);
    function MyReact() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            text: 'hello'
        };
        return _this;
    }
    MyReact.prototype.componentDidMount = function () {
    };
    MyReact.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: 'what', onMouseDown: function () {
            } },
            React.createElement("textarea", { defaultValue: 'hello', onChange: function (evt) { _this.setState({ text: evt.target.value }); } }),
            React.createElement(Counter, { value: this.state.text.length })));
    };
    return MyReact;
}(React.Component));
var Counter = /** @class */ (function (_super) {
    __extends(Counter, _super);
    function Counter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Counter.prototype.componentDidMount = function () {
    };
    Counter.prototype.shouldComponentUpdate = function (nextProps) {
        return nextProps.value != this.props.value;
    };
    ;
    Counter.prototype.render = function () {
        return (React.createElement("h3", null, this.props.value));
    };
    return Counter;
}(React.Component));
exports.default = MyReact;
//# sourceMappingURL=my-react.js.map