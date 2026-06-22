import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { createGameConfig } from "./config";

export function PhaserGame() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || gameRef.current) return;
    const game = new Phaser.Game(createGameConfig(container));

    gameRef.current = game;

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);
  return <div ref={containerRef} className="phaser-game" aria-label="Mining RPG game canvas" />;
}
