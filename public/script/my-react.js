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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles = require("../style/Counter.css");
var classNames = require("classnames");
var react_color_1 = require("react-color");
var MyReact = /** @class */ (function (_super) {
    __extends(MyReact, _super);
    function MyReact() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            text: 'hello',
            opacity: 100,
            mixinColor: {
                r: 152,
                g: 211,
                b: 56,
                a: 1,
            }
        };
        return _this;
    }
    MyReact.prototype.onItemClick = function () {
        console.log(this);
    };
    MyReact.prototype.changeHandle = function (color, event) {
        this.setState({
            mixinColor: {
                r: color.rgb.r,
                g: color.rgb.g,
                b: color.rgb.b,
                a: this.state.mixinColor.a
            }
        });
        console.log(color, event);
    };
    MyReact.prototype.opacityChange = function (evt) {
        this.setState({
            opacity: Number(evt.target.value),
            mixinColor: {
                r: this.state.mixinColor.r,
                g: this.state.mixinColor.g,
                b: this.state.mixinColor.b,
                a: evt.target.value / 100
            }
        });
        console.log(evt.target.value);
    };
    MyReact.prototype.render = function () {
        var _this = this;
        var SHIPS = [
            { name: 'bisimai' },
            { name: 'tierpizi' },
            { name: 'yamato' }
        ];
        var Comps = ppHOC(ListItem);
        var ReverseComps = reverseHOC(ListItem);
        return (React.createElement("div", { id: 'what', className: styles.myReact, onMouseDown: function () {
            } },
            React.createElement("textarea", { defaultValue: 'hello', onChange: function (evt) { _this.setState({ text: evt.target.value }); } }),
            React.createElement(Counter, { value: this.state.text.length }),
            React.createElement("ul", null, SHIPS.map(function (ship, index) {
                return React.createElement(Comps, { name: ship.name, key: index, clickHandle: function () { _this.onItemClick(); } });
            }))));
    };
    return MyReact;
}(React.Component));
var MyColorPicker = /** @class */ (function (_super) {
    __extends(MyColorPicker, _super);
    function MyColorPicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyColorPicker.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(react_color_1.BlockPicker, { onChange: this.props.onChange }),
            React.createElement(react_color_1.SliderPicker, null)));
    };
    return MyColorPicker;
}(React.Component));
exports.Cutom = react_color_1.CustomPicker(MyColorPicker);
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
        var hNames = classNames((_a = {},
            _a[styles.counter] = true,
            _a[styles.counterLage] = this.props.value > 10,
            _a));
        return (React.createElement("h3", { className: hNames }, this.props.value));
        var _a;
    };
    return Counter;
}(React.Component));
function ListItem(props) {
    return (React.createElement("li", { onClick: props.clickHandle },
        props.name,
        ":",
        props.age));
}
exports.ListItem = ListItem;
var ListItems = /** @class */ (function (_super) {
    __extends(ListItems, _super);
    function ListItems() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListItems.prototype.render = function () {
        return (React.createElement("li", { onClick: this.props.clickHandle },
            this.props.name,
            ":",
            this.props.age));
    };
    return ListItems;
}(React.Component));
exports.ListItems = ListItems;
// HOC 高阶组件
function ppHOC(WrappedComponent) {
    return /** @class */ (function (_super) {
        __extends(PP, _super);
        function PP() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PP.prototype.render = function () {
            return React.createElement(WrappedComponent, __assign({ age: 23 }, this.props));
        };
        return PP;
    }(React.Component));
}
var reverseHOC = function (WrappedComponent) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            console.log(123);
            React.createElement(WrappedComponent, null);
        };
        return class_1;
    }(WrappedComponent));
};
exports.default = MyReact;
//# sourceMappingURL=my-react.js.map