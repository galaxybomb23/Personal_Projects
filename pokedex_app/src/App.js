import { Card } from './components/card';
import Pika from './assets/pika.json';

function App() {

  const pika = {
    name: Pika.name,
    weight: Pika.weight,
    height: Pika.height,
    type: Pika.types[0].type.name,
  }

  return (
    <>
      <Card pokemon = {pika}/>
    </>
  );
}

export default App;
