import Phaser from "phaser";
import { TownScene } from "./scenes/TownScene";

export function createGameConfig(parent: HTMLElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,

    width: 960,
    height: 540,

    backgroundColor: "#183126",

    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },

    pixelArt: true,
    antialias: false,
    roundPixels: true,

    scene: [TownScene],
  };
}
