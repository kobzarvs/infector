import {clearNode, createEvent, Event, Store} from 'effector'
import {inject, injectable, postConstruct} from 'inversify'


export const IModelAddon = Symbol('ModelAddon')
export const IExternalStore = Symbol('IExternalStore')


export interface IModelAddon {
  add: Event<number>
  sub: Event<number>
  destroy: () => void
}


let instances = 0


@injectable()
export class ModelAddon implements IModelAddon {
  public add = createEvent<number>()
  public sub = createEvent<number>()
  @inject(IExternalStore) private readonly store: Store<number>

  @postConstruct()
  init(): void {
    console.log('ModelAddon', ++instances)
    this.store
      .on(this.add, (state, value) => state + value)
      .on(this.sub, (state, value) => state - value)
  }

  destroy = () => {
    clearNode(this.store, {deep: true})
  }
}
