import React, { useMemo } from 'react'
import {useStore} from 'effector-react'
import {singletonContainer} from './di.config'
import {ISingletonCheckboxModel} from './model'


interface PropsTypes {
  defaultValue: boolean
}


export const SingletonCheckbox = ({defaultValue}: PropsTypes) => {
  const sModel = useMemo<ISingletonCheckboxModel>(() => {
    return singletonContainer.get<ISingletonCheckboxModel>(ISingletonCheckboxModel)
  }, [])
  const flag = useStore(sModel.getStore())

  return (
    <label style={{marginLeft: 10}}>
      <input type="checkbox" checked={flag} onChange={sModel.toggleSingleton}/>
      inSingletonScope
    </label>
  )
}
