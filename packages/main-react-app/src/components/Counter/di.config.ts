import {Container, interfaces} from 'inversify'
import {IModel, modelModule} from '@infector/model/lib'
import {IExternalStore, IModelAddon, modelAddonModule} from '@infector/model-addon/lib'


export const ICounter = Symbol('ICounter')

export interface ICounter extends IModel, IModelAddon {
  destroy: () => void
}

export const counterContainer = new Container()
counterContainer.load(modelModule, modelAddonModule)

function createCounter(ctx: interfaces.Context): ICounter {
  const model = ctx.container.get<IModel>(IModel)
  const addon = ctx.container.getTagged<IModelAddon>(IModelAddon, IExternalStore, model.getStore())

  return {
    getStore: model.getStore,
    inc: model.inc,
    dec: model.dec,
    add: addon.add,
    sub: addon.sub,
    destroy: () => {
      // уничтожать можно только объекты не входящим в singleton scope
      if (ctx.currentRequest.target.matchesTag('isGlobal')(false)) {
        model.destroy()
        addon.destroy()
      }
    }
  }
}

counterContainer.bind(ICounter).toDynamicValue(createCounter)
  .inSingletonScope()
  .whenTargetTagged('isGlobal', true)

counterContainer.bind(ICounter).toDynamicValue(createCounter)
  .inTransientScope()
  .whenTargetTagged('isGlobal', false)
