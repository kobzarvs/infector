import {Container, ContainerModule} from 'inversify'
import {IModel, modelModule} from '@infector/model/lib'
import {IModelAddon, modelAddonModule} from '@infector/model-addon/lib'
import {createEvent, createStore, Event, Store} from "effector";

export const ICounter = Symbol('ICounter')

export const singletonFlag = createStore(false)
export const toggleSingleton = createEvent()
singletonFlag.on(toggleSingleton, state => !state)


export interface ICounter {
    // from IModel
    counter: Store<number>;

    inc(): Event<void | any>;

    dec(): Event<void | any>;

    // from IModelAddon
    add(dx: number): Event<void | any>;

    sub(dx: number): Event<void | any>;
}

export const counterModule = new ContainerModule(bind => {
    const binding = bind(ICounter).toDynamicValue(ctx => {
        const model = ctx.container.get<IModel>(IModel)
        // pass model instance to ModelAddon container creator
        const addon = ctx.container.getTagged<IModelAddon>(IModelAddon, IModel, model)
        return ({
            ...model,
            ...addon
        })
    })

    singletonFlag.getState() && binding.inSingletonScope()
})


export const counterContainer = new Container()
counterContainer.load(counterModule, modelModule, modelAddonModule)

toggleSingleton.watch(() => {
    counterContainer.unload(counterModule)
    counterContainer.load(counterModule)
})
