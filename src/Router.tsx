import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Game } from './pages/Game';
import { Home } from './pages/Home';
import { Lobby } from './pages/Lobby';
import { Result } from './pages/Result';
import { Versus } from './pages/Versus';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />

        <Route path="/:id/lobby" element={<Lobby />} />
        <Route path="/:id/versus" element={<Versus />} />
        <Route path="/:id/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
