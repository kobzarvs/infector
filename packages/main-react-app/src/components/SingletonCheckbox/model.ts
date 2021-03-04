import {createEvent, createStore, Store, Event, sample, clearNode} from 'effector'
import {inject, injectable, multiInject, optional, postConstruct} from 'inversify'


export const ISingletonCheckboxModel = Symbol()
export const DEFAULT_FLAG_VALUE = Symbol()
export const TOGGLE_CALLBACK = Symbol()

export interface ISingletonCheckboxModel {
  value: boolean
  toggleSingleton: Event<void | any>
  isSingleton(): boolean
  isTransient(): boolean
  getStore(): Store<boolean>
  destroy(): void
}

let instances = 0

@injectable()
export class SingletonCheckboxModel implements ISingletonCheckboxModel {
  private $singletonFlag!: Store<boolean>
  toggleSingleton!: Event<any>
  value!: boolean

  @inject(DEFAULT_FLAG_VALUE)
  private readonly defaultValue!: boolean

  @multiInject(TOGGLE_CALLBACK)
  @optional()
  private readonly toggleCallback: ((flag: boolean) => void)[] = []

  @postConstruct()
  init(): void {
    console.log('SingletonCheckbox Model', ++instances, this.defaultValue)
    this.value = this.defaultValue
    this.$singletonFlag = createStore<boolean>(this.defaultValue)
    this.toggleSingleton = createEvent()

    this.createLogic()
  }

  private createLogic() {
    this.$singletonFlag
      .on(this.toggleSingleton, state => !state)

    sample({
      source: this.$singletonFlag,
      clock: this.toggleSingleton,
      fn: (flag) => {
        console.log(flag)
        this.value = flag
        this.toggleCallback.forEach(cb => cb(flag))
      },
    })
  }

  destroy() {
    clearNode(this.$singletonFlag, {deep: true})
  }

  isSingleton() {
    return this.value
  }

  isTransient() {
    return !this.value
  }

  getStore(): Store<boolean> {
    return this.$singletonFlag;
  }
}
