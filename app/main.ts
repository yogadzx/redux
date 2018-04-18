import * as React from 'react';
import {render} from 'react-dom';
import MyReact from './script/my-react';
import { Controller } from './script/flux/controller';
import { getRedux, getApp } from './script/redux/reduce';

// getRedux();
getApp();

// render(
//     React.createElement(Controller),
//     document.getElementById('container')
// );

// type item = {
//     name: string,
//     age: number
// }
//
// enum Color {
//     red,
//     green,
//     yellow,
//     blue
// }
//
// let itemArray : item[] = [{name: 'dzx', age: 24}];
//
// interface LabelledValue {
//     label: string;
// }
//
// function printLabel(labelledObj: LabelledValue) {
//     console.log(labelledObj.label);
// }
//
// let myObj = {size: 10, label: "Size 10 Object"};
// printLabel(myObj);
//
// class MyClass {
//     static getName() {
//         return 'dzx';
//     }
//     private _name = 'dzx731';
//     getMyName() {
//         console.log(this._name);
//         return this._name;
//     }
// }
//
// let myClass = new MyClass();
//
// console.log(MyClass.getName());
// console.log(myClass.getMyName());
