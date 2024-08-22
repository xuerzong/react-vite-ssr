import { useEffect } from 'react'

interface Props {
  name?: string
  age?: number
  env?: string
}

const App: React.FC<Props> = (props) => {
  useEffect(() => {
    console.log('hello world')
  }, [])
  return (
    <div>
      <div>name: {props.name}</div>
      <div>age: {props.age}</div>
      <div>env: {props.env}</div>
    </div>
  )
}

export default App
