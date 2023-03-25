import { Card } from './components/card';
import { Header } from './components/title';
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
      <Header />
      
      <Card pokemon = {pika}/>
    </>
  );
}

export default App;
