import {createEvent, createStore, Store, Event} from 'effector'
import {inject, injectable, optional, postConstruct} from 'inversify'
import {IModel} from '@infector/model/lib'


export const IModelAddon = Symbol('ModelAddon')

export interface IModelAddon {
    add: Event<number>
    sub: Event<number>
}

let instances = 0

@injectable()
export class ModelAddon implements IModelAddon {
    @inject(IModel) private readonly model: IModel
    public add = createEvent<number>()
    public sub = createEvent<number>()

    @postConstruct()
    init(): void {
        instances++
        console.log('ModelAddon instance:', instances, this)
        this.model.counter
            .on(this.add, (state, value) => state + value)
            .on(this.sub, (state, value) => state - value)
    }
}
