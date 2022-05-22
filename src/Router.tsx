import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Game } from './pages/Game';
import { Home } from './pages/Home';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}
