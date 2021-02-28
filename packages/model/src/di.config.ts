import {Container, ContainerModule} from 'inversify'
import {IModel, Model} from './model'


export const modelContainerModule = new ContainerModule((bind) => {
    // bind(Model).toSelf().inSingletonScope()
    // bind(IModel).toService(Model)
    bind(IModel).to(Model).inSingletonScope()
})

export const modelContainer = new Container()
modelContainer.load(modelContainerModule)
