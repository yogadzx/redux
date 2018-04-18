import {createStore, combineReducers} from "redux";
import {render} from 'react-dom';
import * as React from 'react';

export function getRedux() {
    const reducer = (state: number = 0, action: any) => {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1;
            case 'DECREMENT':
                return state - 1;
        }
    };

    const store = createStore(reducer);

    interface CounterProps {
        value: Number,
        onIncrement: () => void,
        onDecrement: () => void,
    }

    const Counter = (props: CounterProps) => (
        <div>
            <h1>{props.value}</h1>
            <button onClick={props.onIncrement}> +</button>
            <button onClick={props.onDecrement}> -</button>
        </div>
    );

    const renders = () => {
        render(
            <Counter
                value={store.getState()}
                onIncrement={() => {
                    store.dispatch({
                        type: 'INCREMENT'
                    })
                }}
                onDecrement={() => {
                    store.dispatch({
                        type: 'DECREMENT'
                    })
                }}
            />
            , document.getElementById('container'));
    };

    renders();

    store.subscribe(renders);
}

export function getApp() {
    //reducer
    const todo = (state: any = {}, action: any) => {
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
                return {
                    ...state,
                    completed: !state.completed
                };
            default:
                return state;
        }
    };
    const todos = (state: any = [], action: any) => {
        switch (action.type) {
            case 'ADD_TODO':
                return [
                    ...state,
                    todo(undefined, action)
                ];
            case 'TOGGLE_TODO':
                return state.map((item: any) => {
                    return todo(item, action)
                });
            default :
                return state;
        }
    };
    const visibilityFilter = (state: string = 'SHOW_ALL',
                              action: any) => {
        switch (action.type) {
            case 'SET_VISIBILITY_FILTER':
                return action.filter;
            default:
                return state;
        }

    };

     type StoreState = {
        todos: any,
        visibilityFilter: any
    }

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
    const todoApp = combineReducers({
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

    const getVisibleTodos = (todos: any, filter: string) => {
        switch (filter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_ACTIVE':
                return todos.filter(
                    (t: any) => !t.completed
                );
            case 'SHOW_COMPLETED':
                return todos.filter(
                    (t: any) => t.completed
                );
        }
    };

    //view React
    interface LinkProps {
        active: boolean,
        children: any,
        onClick: () => void
    }

    const Link = (props: LinkProps) => {
        if(props.active) {
            return <span>{props.children}</span>
        }
        return <a href="#" onClick={(evt: any) => {
            evt.preventDefault();
            evt.stopPropagation();
            props.onClick();
        }}>
            {props.children}
        </a>
    };

    interface FilterLinkProps {
        filter: string,
        store: any
    }

    class FilterLink extends React.Component<FilterLinkProps, {}> {
        unsubscribe: any;

        componentDidMount() {
            const store = this.props.store;
            this.unsubscribe = store.subscribe(() => {
                this.forceUpdate()
            })
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render() {
            const store = this.props.store;
            const props = this.props;
            const state = store.getState();
            return (
                <Link active={
                    props.filter == (state as any).visibilityFilter
                } onClick={()=>{
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }}>
                    {props.children}
                </Link>
            )
        }


    }

    interface TodoProps {
        completed: string,
        text: string,
        onClick: () => void
    }

    const Todo = (props: TodoProps) => (
        <li style={{
            textDecoration: props.completed ? 'line-through' : 'none'
        }}
            onClick={props.onClick}
        >{props.text}</li>
    );

    interface TodoListProps {
        todos: any[],
        onClick: (id: string) => void
    }

    const TodoList = (props: TodoListProps) => (
        <ul>
            {props.todos.map((todo: any) =>
                <Todo key={todo.id} {...todo} onClick={
                    () => {
                        props.onClick(todo.id);
                    }
                }/>
            )}
        </ul>
    );

    interface VisibleTodoListProps {
        store: any
    }

    class VisibleTodoList extends React.Component<VisibleTodoListProps, {}> {
        unsubscribe: any;

        componentDidMount() {
            const store = this.props.store;
            this.unsubscribe = store.subscribe(() => {
                this.forceUpdate()
            })
        }

        componentWillUnmount() {
            this.unsubscribe();
        }

        render() {
            console.log(this.props.store);
            const store = this.props.store;
            const state = store.getState();
            return (
                <TodoList todos={getVisibleTodos((state as any).todos, (state as any).visibilityFilter)}
                          onClick={(id: string) => {
                              store.dispatch({
                                  type: 'TOGGLE_TODO',
                                  id: id
                              })
                          }}/>
            )
        }
    }

    const AddTodo = (props: any) => {
        let inputEle: any;
        return (
            <div>
                <input type="text" ref={ele => inputEle = ele}/>
                <button onClick={() => {
                    props.store.dispatch({
                        type: 'ADD_TODO',
                        text: inputEle.value,
                        id: nextTodoId++
                    });
                    inputEle.value = '';
                }}>
                    add item
                </button>
            </div>
        )
    };

    interface FooterProps {
        store: any
    }

    const Footer = (props: FooterProps) => (
        <p>
            show:
            {' '}
            <FilterLink filter='SHOW_ALL' store={props.store}>
                All
            </FilterLink>
            {' '}
            <FilterLink filter='SHOW_ACTIVE' store={props.store}>
                Active
            </FilterLink>
            {' '}
            <FilterLink filter='SHOW_COMPLETED' store={props.store}>
                Completed
            </FilterLink>
        </p>
    );

    let nextTodoId = 0;

    interface TodoAppProps{
        store: any
    }

    const TodoApp = (props: TodoAppProps) =>  {
            return (
                <div>
                    <AddTodo store={props.store}/>
                    <VisibleTodoList store={props.store}/>
                    <Footer store={props.store}/>
                </div>
            )
    };

    render(<TodoApp store = {createStore(todoApp)}/>, document.getElementById('container'))

    //reducer watcher
}



