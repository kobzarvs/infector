import React, {useMemo} from 'react'
import {useStore} from 'effector-react'
import {counterContainer, ICounter} from './di.config'


interface PropsTypes {
  id: number | string | symbol
  remove: (id: number | string | symbol) => void
  singleton?: boolean
}


export const Counter = ({remove, id, singleton}: PropsTypes) => {
  const extApi: ICounter = useMemo(() =>
      counterContainer.getTagged(ICounter, 'isGlobal', singleton),
    [],
  )
  const counter = useStore(extApi.getStore())

  const handleRemove = () => {
    extApi.destroy()
    remove(id)
  }

  return (
    <section style={{
      border: '1px solid lightgray',
      padding: 10,
      margin: 10,
      minWidth: 220,
      maxWidth: 250,
      background: singleton ? '#dbfddb' : 'transparent',
      borderRadius: 5,
      boxShadow: '1px 1px 2px gray',
    }}>
      <header>
        <div style={{marginBottom: 8, display: 'flex', justifyContent: 'space-between'}}>
          <div>Counter: <span style={{background: 'white', border: '1px solid lightgray', padding: '0 5px'}}>{counter}</span></div>
          {singleton && <div style={{color: 'green'}}>[global scope]</div>}
        </div>
      </header>

      <footer style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', gap: 3}}>
          <button onClick={extApi.dec}>--</button>
          <button onClick={extApi.inc}>++</button>
          <button onClick={() => extApi.sub(10)}>-10</button>
          <button onClick={() => extApi.add(10)}>+10</button>
        </div>
        <button onClick={handleRemove} style={{background: '#f44336', color: 'white', border: 'none'}}>Remove</button>
      </footer>
    </section>
  )
}
