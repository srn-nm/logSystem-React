//this component is not used now, and it is saved for later use

import {useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from 'react'
import data from "../data/dummy_data.json"
import DataCard from './DataCard';

function List(props: { searchInput: string; }) {
    const filteredData = data.filter((el: { text: string; }) => {
        if (props.searchInput === '') {
            return el;
        }
        else {
            return el.text.toLowerCase().includes(props.searchInput)
        }
    })
    return (
       <>
        {filteredData.map((item: { id: Key | null | undefined; text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <DataCard>{item.text}</DataCard>
        ))}
       </>
    )
}

export default List