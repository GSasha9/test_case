import MainTable from './components/table/main-table';
import { Button } from 'antd';
import { useState } from 'react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButton = () => {
    setIsModalOpen(true);
  };
  return (
    <main>
      <Button type="primary" onClick={handleButton}>
        {' '}
        Add new row{' '}
      </Button>
      <MainTable isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

export default App;
