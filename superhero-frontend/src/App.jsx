import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import SuperheroListWrapper from "@/wrappers/SuperheroListWrapper";
import SuperheroDetailWrapper from "@/wrappers/SuperheroDetailWrapper";
import SuperheroFormWrapper from "@/wrappers/SuperheroFormWrapper";

function App() {
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
            <Routes>
              <Route path="/" element={<SuperheroListWrapper />} />
              <Route path="/hero/:id" element={<SuperheroDetailWrapper />} />
              <Route path="/form" element={<SuperheroFormWrapper />} />
              <Route path="/form/:id" element={<SuperheroFormWrapper />} />
            </Routes>
          </main>
        </div>
      </div>
  );
}

export default App;
