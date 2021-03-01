import {ContainerModule} from 'inversify'
import {IExternalStore, IModelAddon, ModelAddon} from './model-addon'
import {IModel, Model} from "@infector/model/lib";


export const modelAddonModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    !isBound(IModel) && bind(IModel).to(Model)
    !isBound(IModelAddon) && bind(IModelAddon).to(ModelAddon)
    bind(IExternalStore).toDynamicValue(ctx => {
        // get Model instance from parent IModel container request
        const tags = ctx.currentRequest.parentRequest?.target.getCustomTags()
        const model = tags?.find(tag => {
            return tag.key === IModel
        })?.value

        // counter stor from model instance for @inject to ModelAddon class property 'store'
        return model?.counter || ctx.container.get<IModel>(IModel).counter
    })
})
