import React, {useState} from 'react'
import {Counter} from './components/Counter/Counter'
import './App.css'
import {singletonFlag, toggleSingleton} from './components/Counter/di.config'
import {useStore} from "effector-react";

let instances = 0

export const App = () => {
    const [counters, setCounters] = useState<JSX.Element[]>([
        <Counter key={instances} remove={remove} id={instances}/>
    ])

    function remove(id: number | string | symbol) {
        setCounters(items => items.filter(counter => counter.props.id !== id))
    }

    const addCounter = () => {
        ++instances
        setCounters((state) => [
            ...state,
            <Counter key={instances} remove={remove} id={instances}/>
        ])
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', margin: 10}}>
                <button onClick={addCounter}>Add Counter</button>
                <label style={{marginLeft: 10}}>
                    <input type="checkbox" checked={useStore(singletonFlag)} onChange={() => toggleSingleton()}/>
                    inSingletonScope
                </label>
            </div>
            <hr/>
            <div>{counters}</div>
        </div>
    )
}
