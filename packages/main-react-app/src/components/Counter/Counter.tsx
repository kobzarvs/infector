import React, {useMemo} from 'react';
import {useStore} from 'effector-react';
import {counterContainer, ICounter} from "./di.config";


type PropsTypes = {
    id: number | string | symbol
    remove: (id: number | string | symbol) => void
}

export const Counter = ({remove, id}: PropsTypes) => {
    const extApi: ICounter = useMemo(() => counterContainer.get(ICounter), [])
    const counter = useStore(extApi.counter)

    return (
        <section style={{border: '1px solid lightgray', padding: 10, margin: 10, width: 150}}>
            <header>
                <div>
                    Counter: {counter}
                </div>
            </header>

            <footer>
                <button onClick={extApi.dec}>--</button>
                <button onClick={extApi.inc}>++</button>
                <button onClick={() => extApi.sub(10)}>-10</button>
                <button onClick={() => extApi.add(10)}>+10</button>
                <button onClick={() => remove(id)}>Remove</button>
            </footer>
        </section>
    );
}
