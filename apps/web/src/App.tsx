import "./App.css";
import { PhaserGame } from "./game/PhaserGame";

function App() {
  return (
    <main className="app-shell">
      <section className="game-shell">
        <header className="game-header">
          <div>
            <p className="eyebrow">Mining RPG</p>
            <h1>Starter Town</h1>
          </div>

          <span className="prototype-label">Local Prototype</span>
        </header>

        <PhaserGame />

        <p className="game-help">Walk around with WASD or the arrow keys.</p>
      </section>
    </main>
  );
}

export default App;
