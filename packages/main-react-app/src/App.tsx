import React, {useMemo, useState} from 'react'
import {Counter} from './components/Counter/Counter'
import './App.css'


let instances = 0

export const App = () => {
    const [counters, setCounters] = useState<JSX.Element[]>([
        <Counter key={instances} remove={remove} id={instances}/>
    ])

    function remove(id: number | string | symbol) {
        setCounters(counters => counters.filter(counter => counter.props.id !== id))
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
            <button onClick={addCounter}>Add Counter</button>
            <hr/>
            <div>{counters}</div>
        </div>
    )
}
