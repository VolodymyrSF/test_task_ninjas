import { useState } from 'react';
import SuperheroList from './components/SuperheroList';
import SuperheroDetail from './components/SuperheroDetail';
import SuperheroForm from './components/SuperheroForm';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedSuperheroId, setSelectedSuperheroId] = useState(null);

  const handleViewSuperhero = (id) => {
    setSelectedSuperheroId(id);
    setCurrentView('detail');
  };

  const handleEditSuperhero = (id) => {
    setSelectedSuperheroId(id);
    setCurrentView('form');
  };

  const handleAddSuperhero = () => {
    setSelectedSuperheroId(null);
    setCurrentView('form');
  };

  const handleBackToList = () => {
    setSelectedSuperheroId(null);
    setCurrentView('list');
  };

  const handleSaveSuperhero = () => {
    setSelectedSuperheroId(null);
    setCurrentView('list');
  };

  return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              Superhero Database
            </h1>
            <p className="text-muted-foreground">
              Manage your favorite superheroes and their amazing abilities
            </p>
          </header>

          <main>
            {currentView === 'list' && (
                <SuperheroList
                    onView={handleViewSuperhero}
                    onEdit={handleEditSuperhero}
                    onAdd={handleAddSuperhero}
                />
            )}

            {currentView === 'detail' && (
                <SuperheroDetail
                    id={selectedSuperheroId}
                    onBack={handleBackToList}
                    onEdit={handleEditSuperhero}
                />
            )}

            {currentView === 'form' && (
                <SuperheroForm
                    id={selectedSuperheroId}
                    onBack={handleBackToList}
                    onSave={handleSaveSuperhero}
                />
            )}
          </main>
        </div>
      </div>
  );
}

export default App;