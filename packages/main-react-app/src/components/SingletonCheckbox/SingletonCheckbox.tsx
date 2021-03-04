import React, { useMemo } from 'react'
import {useStore} from 'effector-react'
import {Event} from 'effector'
import {singletonContainer} from './di.config'
import {ISingletonCheckboxModel} from './model'


interface PropsTypes {
  onChange: Event<void | any>
  value: boolean
}


export const SingletonCheckbox = ({onChange, value}: PropsTypes) => {
  return (
    <label style={{marginLeft: 10}}>
      <input type="checkbox" checked={value} onChange={onChange}/>
      inSingletonScope
    </label>
  )
}
