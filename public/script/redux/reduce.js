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
var redux_1 = require("redux");
var react_dom_1 = require("react-dom");
var React = require("react");
function getRedux() {
    var reducer = function (state, action) {
        if (state === void 0) { state = 0; }
        switch (action.type) {
            case 'INCREMENT':
                return state + 1;
            case 'DECREMENT':
                return state - 1;
        }
    };
    var store = redux_1.createStore(reducer);
    var Counter = function (props) { return (React.createElement("div", null,
        React.createElement("h1", null, props.value),
        React.createElement("button", { onClick: props.onIncrement }, " +"),
        React.createElement("button", { onClick: props.onDecrement }, " -"))); };
    var renders = function () {
        react_dom_1.render(React.createElement(Counter, { value: store.getState(), onIncrement: function () {
                store.dispatch({
                    type: 'INCREMENT'
                });
            }, onDecrement: function () {
                store.dispatch({
                    type: 'DECREMENT'
                });
            } }), document.getElementById('container'));
    };
    renders();
    store.subscribe(renders);
}
exports.getRedux = getRedux;
function getApp() {
    //reducer
    var todo = function (state, action) {
        if (state === void 0) { state = {}; }
        switch (action.type) {
            case 'ADD_TODO':
                return {
                    id: action.id,
                    text: action.text,
                    completed: false
                };
            case 'TOGGLE_TODO':
                if (state.id !== action.id) {
                    return state;
                }
                return __assign({}, state, { completed: !state.completed });
            default:
                return state;
        }
    };
    var todos = function (state, action) {
        if (state === void 0) { state = []; }
        switch (action.type) {
            case 'ADD_TODO':
                return state.concat([
                    todo(undefined, action)
                ]);
            case 'TOGGLE_TODO':
                return state.map(function (item) {
                    return todo(item, action);
                });
            default:
                return state;
        }
    };
    var visibilityFilter = function (state, action) {
        if (state === void 0) { state = 'SHOW_ALL'; }
        switch (action.type) {
            case 'SET_VISIBILITY_FILTER':
                return action.filter;
            default:
                return state;
        }
    };
    /***
     * combineReducers 实现
     * @param reducers
     * @returns {(state: any, action: string) => {}}
     */
    // const combineReducers = (reducers: StoreState)=>{
    //     return (state: any, action: string) => {
    //         return Object.keys(reducers).reduce((nextState:any, key:string)=>{
    //             nextState[key] = (reducers as any)[key](state[key], action);
    //             return nextState;
    //         }, {todos:null, visibilityFilter:null})
    //     }
    // };
    /***
     *  属性和方法名一样可省略
     * @type {Reducer<any>}
     */
    var todoApp = redux_1.combineReducers({
        todos: todos,
        visibilityFilter: visibilityFilter
    });
    /*** rudux 官方提供合并reducer方法
     *
     */
    // const todoApp = combineReducers<StoreState>({
    //     todos: todos,
    //     visibilityFilter: visibilityFilter
    // });
    /***
     * 合并reducer
     * @type {Store<any>}
     */
    // const todoApp = (state: any = {}, action: any) => {
    //     return {
    //         todos: todos(
    //             state.todos,
    //             action
    //         ),
    //         visibilityFilter: visibilityFilter(
    //             state.visibilityFilter,
    //             action
    //         )
    //     }
    // };
    var getVisibleTodos = function (todos, filter) {
        switch (filter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_ACTIVE':
                return todos.filter(function (t) { return !t.completed; });
            case 'SHOW_COMPLETED':
                return todos.filter(function (t) { return t.completed; });
        }
    };
    var Link = function (props) {
        if (props.active) {
            return React.createElement("span", null, props.children);
        }
        return React.createElement("a", { href: "#", onClick: function (evt) {
                evt.preventDefault();
                evt.stopPropagation();
                props.onClick();
            } }, props.children);
    };
    var FilterLink = /** @class */ (function (_super) {
        __extends(FilterLink, _super);
        function FilterLink() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FilterLink.prototype.componentDidMount = function () {
            var _this = this;
            var store = this.props.store;
            this.unsubscribe = store.subscribe(function () {
                _this.forceUpdate();
            });
        };
        FilterLink.prototype.componentWillUnmount = function () {
            this.unsubscribe();
        };
        FilterLink.prototype.render = function () {
            var store = this.props.store;
            var props = this.props;
            var state = store.getState();
            return (React.createElement(Link, { active: props.filter == state.visibilityFilter, onClick: function () {
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    });
                } }, props.children));
        };
        return FilterLink;
    }(React.Component));
    var Todo = function (props) { return (React.createElement("li", { style: {
            textDecoration: props.completed ? 'line-through' : 'none'
        }, onClick: props.onClick }, props.text)); };
    var TodoList = function (props) { return (React.createElement("ul", null, props.todos.map(function (todo) {
        return React.createElement(Todo, __assign({ key: todo.id }, todo, { onClick: function () {
                props.onClick(todo.id);
            } }));
    }))); };
    var VisibleTodoList = /** @class */ (function (_super) {
        __extends(VisibleTodoList, _super);
        function VisibleTodoList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VisibleTodoList.prototype.componentDidMount = function () {
            var _this = this;
            var store = this.props.store;
            this.unsubscribe = store.subscribe(function () {
                _this.forceUpdate();
            });
        };
        VisibleTodoList.prototype.componentWillUnmount = function () {
            this.unsubscribe();
        };
        VisibleTodoList.prototype.render = function () {
            console.log(this.props.store);
            var store = this.props.store;
            var state = store.getState();
            return (React.createElement(TodoList, { todos: getVisibleTodos(state.todos, state.visibilityFilter), onClick: function (id) {
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id: id
                    });
                } }));
        };
        return VisibleTodoList;
    }(React.Component));
    var AddTodo = function (props) {
        var inputEle;
        return (React.createElement("div", null,
            React.createElement("input", { type: "text", ref: function (ele) { return inputEle = ele; } }),
            React.createElement("button", { onClick: function () {
                    props.store.dispatch({
                        type: 'ADD_TODO',
                        text: inputEle.value,
                        id: nextTodoId++
                    });
                    inputEle.value = '';
                } }, "add item")));
    };
    var Footer = function (props) { return (React.createElement("p", null,
        "show:",
        ' ',
        React.createElement(FilterLink, { filter: 'SHOW_ALL', store: props.store }, "All"),
        ' ',
        React.createElement(FilterLink, { filter: 'SHOW_ACTIVE', store: props.store }, "Active"),
        ' ',
        React.createElement(FilterLink, { filter: 'SHOW_COMPLETED', store: props.store }, "Completed"))); };
    var nextTodoId = 0;
    var TodoApp = function (props) {
        return (React.createElement("div", null,
            React.createElement(AddTodo, { store: props.store }),
            React.createElement(VisibleTodoList, { store: props.store }),
            React.createElement(Footer, { store: props.store })));
    };
    react_dom_1.render(React.createElement(TodoApp, { store: redux_1.createStore(todoApp) }), document.getElementById('container'));
    //reducer watcher
}
exports.getApp = getApp;
//# sourceMappingURL=reduce.js.map