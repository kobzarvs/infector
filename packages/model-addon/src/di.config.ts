import {ContainerModule} from 'inversify'
import {IExternalStore, IModelAddon, ModelAddon} from './model-addon'
import {IModel} from "@infector/model/lib";


export const modelAddonModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(IExternalStore).toDynamicValue(ctx => {
        // get Model instance from parent IModel container request
        const tags = ctx.currentRequest.parentRequest?.target.getCustomTags()
        const model = tags?.find(tag => {
            return tag.key === IModel
        })?.value

        // counter stor from model instance for @inject to ModelAddon class property 'store'
        return model?.counter || ctx.container.get<IModel>(IModel).counter
    })
    bind(IModelAddon).to(ModelAddon)
})
