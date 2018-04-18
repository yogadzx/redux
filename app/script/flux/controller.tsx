import * as React from 'react';
import { ButtonList } from './buttonList';
import { MyStore } from './listStore';
import { ButtonActions } from './buttonAction';

interface ControllerProps {

}

// interface ControllerState {
//     items: any
// }

export class Controller extends React.Component<ControllerProps, {}> {

    state: {
        items: any
    } = {
        items: MyStore.getAll()
    };

    constructor() {
        super();
        this.state.items = MyStore.getAll();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        MyStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        MyStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({items: MyStore.getAll()})
    }

    createNewItem() {
        ButtonActions.addNewItem('new item');
    }

    render() {
        return (
            <ButtonList
            items={this.state.items}
            onClick={this.createNewItem}
            >
            </ButtonList>
        )
    }
}