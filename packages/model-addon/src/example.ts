import 'reflect-metadata'
import {Container, ContainerModule} from 'inversify'
import {modelAddonModule} from './di.config'
import {IModel, modelModule} from '@infector/model/lib'
import {IModelAddon} from './model-addon'
import {Event, Store} from 'effector'


console.log('----------')

const modelWithAddonModule = new ContainerModule((bind) => {
  bind('api').toDynamicValue(ctx => {
    const model = ctx.container.get<IModel>(IModel)
    const addon = ctx.container.getTagged<IModelAddon>(IModelAddon, IModel, model)
    bind('counter').toConstantValue(model.counter)
    bind('inc').toFunction(model.inc)
    bind('dec').toFunction(model.dec)
    bind('add').toFunction(addon.add)
    bind('sub').toFunction(addon.sub)
    const {counter, inc, dec} = model
    const {add, sub} = addon

    return {counter, add, sub, inc, dec}
  })
})

const modelWithAddon = new Container()
modelWithAddon.load(modelWithAddonModule, modelModule, modelAddonModule)

let api = modelWithAddon.get<IModel & IModelAddon>('api')
let counter = modelWithAddon.get<Store<number>>('counter')
let inc = modelWithAddon.get<Event<void>>('inc')
let dec = modelWithAddon.get<Event<void>>('dec')
let add = modelWithAddon.get<Event<number>>('add')
let sub = modelWithAddon.get<Event<number>>('sub')

console.log('counter initial', counter.getState())
inc()
inc()
console.log('counter 2 inc', counter.getState())
dec()
console.log('counter dec', counter.getState())
add(10)
console.log('counter add 10', counter.getState())
sub(5)
console.log('counter sub 5', counter.getState())

api.add(100)
console.log('counter api.add(100)', api.counter.getState())
api.sub(50)
console.log('counter api.sub(50)', api.counter.getState())
api.inc()
console.log('counter api.inc()', api.counter.getState())
api.dec()
console.log('counter api.dec()', api.counter.getState())

modelWithAddon.rebind('add').toFunction((value: number) => {
  console.log(`- call rebinded add(${value}) to add(${value}*10)`)
  return api.add(value * 10)
})
add = modelWithAddon.get<Event<number>>('add')

add(23)
console.log('counter add(23) -> add(230)', api.counter.getState())
