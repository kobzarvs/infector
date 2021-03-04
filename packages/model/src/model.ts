import {createEvent, createStore, Store, Event} from 'effector'
import {injectable, postConstruct} from "inversify";


export const IModel = Symbol('IModel')

export interface IModel {
    inc: Event<void | any>;
    dec: Event<void | any>;
    getStore: () => Store<number>;
}

let instances = 0

@injectable()
export class Model implements IModel {
    private counter = createStore(0)
    public inc = createEvent()
    public dec = createEvent()

    @postConstruct()
    init(): void {
        console.log('Model', ++instances)
        this.counter
            .on(this.inc, value => value + 1)
            .on(this.dec, value => value - 1)
    }

    getStore = (): Store<number> => {
        return this.counter
    }
}
