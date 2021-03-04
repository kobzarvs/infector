import {Container, interfaces} from 'inversify'
import {IModel, modelModule} from '@infector/model/lib'
import {IExternalStore, IModelAddon, modelAddonModule} from '@infector/model-addon/lib'
import {singletonContainer} from '../SingletonCheckbox/di.config'
import {DEFAULT_FLAG_VALUE, TOGGLE_CALLBACK} from '../SingletonCheckbox/model'


export const ICounter = Symbol('ICounter')
export type ICounter = IModel & IModelAddon

export const counterContainer = new Container()
counterContainer.load(modelModule, modelAddonModule)

function createCounter(ctx: interfaces.Context) {
  const model = ctx.container.get<IModel>(IModel)
  const addon = ctx.container.getTagged<IModelAddon>(IModelAddon, IExternalStore, model.getStore())

  return {
    getStore: model.getStore,
    inc: model.inc,
    dec: model.dec,
    add: addon.add,
    sub: addon.sub,
  }
}

const setSingletonMode = (mode: boolean) => {
  counterContainer.isBound(ICounter) && counterContainer.unbind(ICounter)
  const binding = counterContainer.bind(ICounter).toDynamicValue(createCounter)
  if (mode) {
    binding.inSingletonScope()
  } else {
    binding.inTransientScope()
  }
}

singletonContainer.bind(TOGGLE_CALLBACK).toFunction(setSingletonMode)
setSingletonMode(singletonContainer.get(DEFAULT_FLAG_VALUE))
