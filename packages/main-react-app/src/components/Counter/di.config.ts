import {Container, ContainerModule} from "inversify";
import {IModel, modelModule, Model} from '@infector/model/lib'
import {IModelAddon, modelAddonModule} from '@infector/model-addon/lib'
import {Event, Store} from "effector";

export const ICounter = Symbol('ICounter')

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
    bind(ICounter).toDynamicValue(ctx => {
        const model = ctx.container.get<IModel>(IModel)
        // pass model instance to ModelAddon container creator
        const addon = ctx.container.getTagged<IModelAddon>(IModelAddon, IModel, model)
        return ({
            ...model,
            ...addon
        })
    })
})


export const counterContainer = new Container()
counterContainer.load(counterModule, modelModule, modelAddonModule)
