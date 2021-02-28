import React, {useState} from 'react';
import {Counter} from "./components/Counter";
import './App.css';


export const App = () => {
    const [counters, setCounters] = useState<JSX.Element[]>([<Counter key={0}/>])

    const addCounter = () => {
        setCounters((state) => [...state, <Counter key={state.length}/>])
    }

    return (
        <div>
            <button onClick={addCounter}>Add Counter</button>

            <div>
                {counters}
            </div>
        </div>
    );
}
