import React, {useMemo} from 'react';
import {useStore} from 'effector-react';

import {IModel} from '@infector/model/lib'
import {IModelAddon} from '@infector/model-addon/lib'
import {rootContainer} from '../models/root-model';

export const Counter = () => {
    const model: IModel = useMemo(() => rootContainer.get(IModel), [])
    const modelAddon: IModelAddon = useMemo(() => rootContainer.get(IModelAddon), [])

    const counter = useStore(model.counter)

    return (
        <section>
            <hr/>
            <header>
                <div>
                    Counter: {counter}
                </div>
            </header>

            <footer>
                <button onClick={model.inc}>++</button>
                <button onClick={model.dec}>--</button>
                <button onClick={() => modelAddon.add(10)}>+10</button>
                <button onClick={() => modelAddon.sub(10)}>-10</button>
            </footer>
        </section>
    );
}
