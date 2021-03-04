import 'reflect-metadata'
import {Container, ContainerModule} from 'inversify'
import {modelAddonModule} from './di.config'
import {IModel, modelModule} from '@infector/model/lib'
import {IExternalStore, IModelAddon} from './model-addon'
import {createEvent, createStore, Event, split, Store} from 'effector'
import * as assert from 'assert'


console.log('----------')

// create container
const modelWithAddon = new Container()
modelWithAddon.load(modelModule, modelAddonModule)
const model = modelWithAddon.get<IModel>(IModel)
const store = model.getStore()
//@ts-ignore
store.setState(2000)
// let t = modelWithAddon.get<Store<number>>(IExternalStore)
// console.log('t1', t.getState())

modelWithAddon.rebind(IExternalStore).toConstantValue(createStore(100))
const addon = modelWithAddon.getTagged<IModelAddon>(IModelAddon, IExternalStore, store)
// let t = modelWithAddon.get<Store<number>>(IExternalStore)
// console.log('t2', t.getState())

modelWithAddon.bind('counter').toConstantValue(store)
modelWithAddon.bind('inc').toFunction(model.inc)
modelWithAddon.bind('dec').toFunction(model.dec)
modelWithAddon.bind('add').toFunction(addon.add)
modelWithAddon.bind('sub').toFunction(addon.sub)


// get bindings
let iCounter = modelWithAddon.get<Store<number>>(IExternalStore)
let counter = modelWithAddon.get<Store<number>>('counter')
let inc = modelWithAddon.get<Event<void>>('inc')
let dec = modelWithAddon.get<Event<void>>('dec')
let add = modelWithAddon.get<Event<number>>('add')
let sub = modelWithAddon.get<Event<number>>('sub')

// test container
console.log('counter initial', counter.getState())
console.log('addon counter', iCounter.getState())
inc()
inc()
console.log('counter 2 inc', counter.getState())
console.log('addon counter', iCounter.getState())
dec()
console.log('counter dec', counter.getState())
console.log('addon counter', iCounter.getState())
add(10)
console.log('counter add 10', counter.getState())
console.log('addon counter', iCounter.getState())
sub(5)
console.log('counter sub 5', counter.getState())
console.log('addon counter', iCounter.getState())

// modelWithAddon.rebind('add').toFunction((value: number) => {
//   let _add = modelWithAddon.get<Event<number>>('add')
//   console.log(`- call rebinded add(${value}) to add(${value}*10)`)
//   return (value: number) => _add(value * 10)
// })
// add = modelWithAddon.get<Event<number>>('add')

add(23)
console.log('counter add(23) -> add(230)', counter.getState())
console.log('addon counter', iCounter.getState())
