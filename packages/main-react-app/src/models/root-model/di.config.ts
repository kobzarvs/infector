import {Container, ContainerModule} from "inversify";
import {modelContainerModule} from '@infector/model/lib'
import {modelAddonContainerModule} from '@infector/model-addon/lib'


const rootContainerModule = new ContainerModule(bind => {
    // место для байндингов...
})

export const rootContainer = new Container()

// грузим все доступные модули в корневой контейнер, чтобы резолвить зависимости
rootContainer.load(rootContainerModule, modelContainerModule, modelAddonContainerModule)
