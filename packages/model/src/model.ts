import {createEvent, createStore, Store, Event} from 'effector'
import {injectable, postConstruct} from "inversify";


export const IModel = Symbol('IModel')

export interface IModel {
    counter: Store<number>
    inc: Event<void | any>
    dec: Event<void | any>
}

@injectable()
export class Model implements IModel {
    public counter = createStore(0)
    public inc = createEvent()
    public dec = createEvent()

    @postConstruct()
    init(): void {
        this.counter
            .on(this.inc, value => value + 1)
            .on(this.dec, value => value - 1)
    }
}
