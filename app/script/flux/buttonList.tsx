import * as React from 'react';


interface ButtonListProps {
    items: any,
    onClick: ()=> void
}

export function ButtonList (props: ButtonListProps) {

    let itemHtml = props.items.map(function (listItem: any, i: any) {
        return <li key={i}>{listItem}</li>;
    });

    return (
        <div>
            <ul>{itemHtml}</ul>
            <button onClick={props.onClick}>add item</button>
        </div>
    )
}