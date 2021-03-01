import {ContainerModule} from 'inversify'
import {IModel, Model} from './model'


export const modelModule = new ContainerModule((bind) => {
    bind(IModel).to(Model)
})
