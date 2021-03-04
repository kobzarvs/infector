import {createStore} from 'effector'
import {ContainerModule} from 'inversify'
import {IExternalStore, IModelAddon, ModelAddon} from './model-addon'


export const modelAddonModule = new ContainerModule((bind, unbind, isBound, rebind) => {
  bind(IModelAddon).to(ModelAddon)
  bind(IExternalStore).toDynamicValue(ctx => {
    if (ctx.currentRequest.parentRequest?.target.hasTag(IExternalStore)) {
      const tags = ctx.currentRequest.parentRequest.target.getCustomTags() || []
      const metadata = tags.find(tag => tag.key === IExternalStore)!
      return metadata.value
    }
    return createStore(0)
  })
})
