import {createEvent, createStore, Store, Event, clearNode} from 'effector'
import {injectable, postConstruct} from "inversify";


export const IModel = Symbol('IModel')

export interface IModel {
    inc: Event<void | any>
    dec: Event<void | any>
    getStore(): Store<number>
    destroy(): void
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

        // this.getStore = this.getStore.bind(this)
        // this.destroy = this.destroy.bind(this)
    }

    destroy = (): void => {
        clearNode(this.counter, {deep: true})
    }

    getStore = (): Store<number> => {
        return this.counter
    }
}
