import {Container, ContainerModule} from 'inversify'
import {ModelAddon, IModelAddon} from './model-addon'


export const modelAddonContainerModule = new ContainerModule((bind) => {
    bind(IModelAddon).to(ModelAddon).inSingletonScope()
})

export const modelAddonContainer = new Container()
