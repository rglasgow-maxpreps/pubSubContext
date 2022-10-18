import './App.css';
import createPubSubContext from './context/pubSubContext/createPubSubContext';

const { Provider, useStore } = createPubSubContext({
  count: 0,
  name: 'Bob',
  age: 30,
  nested: {
    data: 'some data',
    data2: 'some data2'
  }
});

const InputName = () => {
  const [name, setName] = useStore((state) => state.name);

  return (
    <input
      type="text"
      value={name}
      onChange={(e) => setName({ name: e.target.value })}
    />
  );
};

const DisplayName = () => {
  const [name] = useStore((state) => state.name);

  return <div>{name}</div>;
};

const DisplayCount = () => {
  const [count] = useStore((state) => state.count);

  return <div>{count}</div>;
};

const IncrementCount = () => {
  const [count, setCount] = useStore((state) => state.count);

  return <button onClick={() => setCount({ count: count + 1 })}>+</button>;
};

const DisplayAll = () => {
  const [state] = useStore((state) => state);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <pre style={{ textAlign: 'left', width: '300px', overflow: '' }}>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
};

const NestedDataInput = () => {
  const [nestedData, setData] = useStore((state) => state.nested);

  return (
    <input
      type="text"
      value={nestedData.data}
      onChange={(e) =>
        setData({ nested: { ...nestedData, data: e.target.value } })
      }
    />
  );
};

const NestedDataDisplay = () => {
  const [data] = useStore((state) => state.nested.data);

  return <div>{data}</div>;
};

const NestedData2Display = () => {
  const [data2] = useStore((state) => state.nested.data2);

  return <div>{data2}</div>;
};

function App() {
  return (
    <Provider>
      <div className="App">
        <InputName />
        <DisplayName />
        <DisplayCount />
        <IncrementCount />
        <DisplayAll />
        <br />
        <NestedDataInput />
        <NestedDataDisplay />
        <br />
        <NestedData2Display />
      </div>
    </Provider>
  );
}

export default App;
