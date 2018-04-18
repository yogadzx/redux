import * as React from 'react';
import * as styles from '../style/Counter.css';
import * as classNames from 'classnames';
import { BlockPicker, CustomPicker, SliderPicker, SketchPicker } from 'react-color';
import {myColor} from "../style/Counter.css";

interface mixinColor {
    r:number,
    g:number,
    b:number,
    a?:number
}

class MyReact extends React.Component<{}, {}> {
    state: {
        text: string,
        opacity: number,
        mixinColor: mixinColor
    } = {
        text: 'hello',
        opacity: 100,
        mixinColor: {
            r: 152,
            g: 211,
            b: 56,
            a: 1,
        }
    };

    onItemClick() {
        console.log(this);
    }

    changeHandle(color?: any, event?: any) {
        this.setState({
            mixinColor: {
                r: color.rgb.r,
                g: color.rgb.g,
                b: color.rgb.b,
                a: this.state.mixinColor.a
            }
        });
        console.log(color, event);
    }

    opacityChange(evt: any) {
        this.setState({
            opacity: Number(evt.target.value),
            mixinColor: {
                r: this.state.mixinColor.r,
                g: this.state.mixinColor.g,
                b: this.state.mixinColor.b,
                a: evt.target.value/100
            }

        });
        console.log(evt.target.value);
    }

    render() {
        const SHIPS = [
            {name: 'bisimai'},
            {name: 'tierpizi'},
            {name: 'yamato'}
        ];
        const Comps = ppHOC(ListItem);
        const ReverseComps = reverseHOC(ListItem);
        return (
            <div id='what' className={styles.myReact} onMouseDown={()=>{
            }}>
                <textarea defaultValue={'hello'} onChange={(evt)=> {this.setState({text: evt.target.value})}}>
                </textarea>
                <Counter value={this.state.text.length}/>
                <ul>
                    {SHIPS.map((ship, index) => {
                        return <Comps name={ship.name} key={index} clickHandle={()=>{this.onItemClick()}}/>
                    })}
                </ul>
                {/*<BlockPicker color={this.state.mixinColor} colors={[*/}
                    {/*'#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8',*/}
                    {/*'#ff5523'*/}
                {/*]} onChange={(color?: any, event?: any)=>this.changeHandle(color, event)}/>*/}
                {/*<div className={styles.myColor}>*/}
                    {/*<SliderPicker color={this.state.mixinColor}*/}
                                  {/*onChange={(color?: any, event?: any)=>this.changeHandle(color, event)}/>*/}
                    {/*<SketchPicker color={this.state.mixinColor}/>*/}
                    {/*<input type="range" value={this.state.opacity} max={100} min={0}*/}
                           {/*onChange={(evt: any)=> this.opacityChange(evt)}/>*/}
                {/*</div>*/}
                {/*<div style={{*/}
                    {/*width: '100px',*/}
                    {/*height: '100px',*/}
                    {/*backgroundColor: `rgba(${this.state.mixinColor.r}, ${this.state.mixinColor.g},*/}
                    {/*${this.state.mixinColor.b}, ${this.state.mixinColor.a})`*/}
                {/*}}>*/}

                {/*</div>*/}
                {/*<Cutom onChange={(color?: any, event?: any)=>changeHandle(color, event)}/>*/}
            </div>
        )
    }
}

interface MyColorPickerProps {
    onChange: ()=> void
}

class MyColorPicker extends React.Component<MyColorPickerProps, {}> {
    render() {
        return (<div>
            <BlockPicker onChange={this.props.onChange}/>
            <SliderPicker />
        </div>);
    }
}

export let Cutom = CustomPicker(MyColorPicker);

interface counterProps {
    value: any
}

class Counter extends React.Component<counterProps, {}> {

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps: any) {
        return nextProps.value != this.props.value;
    };

    render() {
        const hNames: any = classNames({
            [styles.counter]: true,
            [styles.counterLage]: this.props.value > 10
        });
        return (
            <h3 className={hNames}>{this.props.value}</h3>
        )
    }
}

interface ListItemProps {
    name: string,
    age: number,
    clickHandle: () => void
}

export function ListItem (props: ListItemProps) {
    return (
        <li onClick={props.clickHandle}>{props.name}:{props.age}</li>
    )
}

export class ListItems extends React.Component<ListItemProps, {}> {
    render () {
        return (
            <li onClick={this.props.clickHandle}>{this.props.name}:{this.props.age}</li>
        )
    }
}

interface PPProps {
    name?: string,
    age?: number,
    clickHandle?: () => void
}
// HOC 高阶组件
function ppHOC (WrappedComponent: any) {
    return class PP extends React.Component<PPProps, {}> {
        render() {
            return <WrappedComponent age={23} {...this.props} />
        }
    }
}

const reverseHOC = (WrappedComponent: any) => {
    return class extends WrappedComponent<ListItemProps, {}> {
        render() {
            console.log(123);
            <WrappedComponent />
        }
    }
};

export default MyReact;