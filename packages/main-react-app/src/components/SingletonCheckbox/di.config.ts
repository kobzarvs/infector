import {Container} from 'inversify'
import {DEFAULT_FLAG_VALUE, ISingletonCheckboxModel, SingletonCheckboxModel} from './model'


export const singletonContainer = new Container()

singletonContainer.bind(ISingletonCheckboxModel).to(SingletonCheckboxModel)
singletonContainer.bind(DEFAULT_FLAG_VALUE).toConstantValue(false)
