import React, {useMemo, useState} from 'react'
import {Counter} from './components/Counter/Counter'
import './App.css'
import {SingletonCheckbox} from './components/SingletonCheckbox/SingletonCheckbox'
import {ISingletonCheckboxModel} from './components/SingletonCheckbox/model'
import {singletonContainer} from './components/SingletonCheckbox/di.config'
import {useStore} from 'effector-react'


let instances = 0

export const App = () => {
  const sModel = useMemo<ISingletonCheckboxModel>(() => {
    return singletonContainer.get(ISingletonCheckboxModel)
  }, [])
  const flag = useStore(sModel.getStore())

  const [counters, setCounters] = useState<JSX.Element[]>([
    <Counter key={instances} remove={remove} id={instances} singleton={flag}/>,
  ])

  function remove(id: number | string | symbol) {
    setCounters(items => items.filter(counter => counter.props.id !== id))
  }

  const addCounter = () => {
    ++instances
    setCounters((state) => [
      ...state,
      <Counter key={instances} remove={remove} id={instances} singleton={flag}/>,
    ])
  }

  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', margin: 10}}>
        <button onClick={addCounter}>Add Counter</button>
        <SingletonCheckbox value={flag} onChange={sModel.toggleSingleton}/>
      </div>
      <hr/>
      <div>{counters}</div>
    </div>
  )
}
