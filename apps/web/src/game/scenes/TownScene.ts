import Phaser from "phaser";

const WORLD_WIDTH = 1920;
const WORLD_HEIGHT = 1080;
const PLAYER_SPEED = 230;

const PLAYER_TEXTURE_KEY = "player-placeholder";

export class TownScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private wasd!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };

  private positionText!: Phaser.GameObjects.Text;

  constructor() {
    super("TownScene");
  }

  create() {
    this.createPlaceholderTextures();
    this.createTownVisuals();
    this.createPlayer();
    this.setupCamera();
    this.setupInput();
    this.createHud();
  }

  update() {
    const movingLeft = this.cursors.left?.isDown || this.wasd.left.isDown;

    const movingRight = this.cursors.right?.isDown || this.wasd.right.isDown;

    const movingUp = this.cursors.up?.isDown || this.wasd.up.isDown;

    const movingDown = this.cursors.down?.isDown || this.wasd.down.isDown;

    let velocityX = 0;
    let velocityY = 0;

    if (movingLeft) velocityX -= 1;
    if (movingRight) velocityX += 1;
    if (movingUp) velocityY -= 1;
    if (movingDown) velocityY += 1;

    const isMovingDiagonally = velocityX !== 0 && velocityY !== 0;

    if (isMovingDiagonally) {
      velocityX *= Math.SQRT1_2;
      velocityY *= Math.SQRT1_2;
    }

    this.player.setVelocity(velocityX * PLAYER_SPEED, velocityY * PLAYER_SPEED);

    this.positionText.setText(["Starter Town Prototype", "Move: WASD or Arrow Keys", `Position: ${Math.round(this.player.x)}, ${Math.round(this.player.y)}`]);
  }

  private createPlaceholderTextures() {
    if (this.textures.exists(PLAYER_TEXTURE_KEY)) {
      return;
    }

    const graphics = this.add.graphics();

    graphics.fillStyle(0xf4a261, 1);
    graphics.fillRect(0, 0, 32, 32);

    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(7, 6, 6, 6);
    graphics.fillRect(19, 6, 6, 6);

    graphics.generateTexture(PLAYER_TEXTURE_KEY, 32, 32);
    graphics.destroy();
  }

  private createTownVisuals() {
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    const ground = this.add.rectangle(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, WORLD_WIDTH, WORLD_HEIGHT, 0x294c38);

    ground.setDepth(-10);

    const grid = this.add.graphics();

    grid.lineStyle(1, 0x3e6d50, 0.4);

    for (let x = 0; x <= WORLD_WIDTH; x += 64) {
      grid.lineBetween(x, 0, x, WORLD_HEIGHT);
    }

    for (let y = 0; y <= WORLD_HEIGHT; y += 64) {
      grid.lineBetween(0, y, WORLD_WIDTH, y);
    }

    grid.lineStyle(10, 0x6e4d35, 1);
    grid.strokeRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    this.add.rectangle(320, 250, 180, 120, 0x8d6345);
    this.add.rectangle(1450, 700, 220, 150, 0x8d6345);

    this.add.text(250, 220, "Future Shop", {
      fontFamily: "monospace",
      fontSize: "16px",
      color: "#ffffff",
    });

    this.add.text(1360, 670, "Future Mine Entrance", {
      fontFamily: "monospace",
      fontSize: "16px",
      color: "#ffffff",
    });
  }

  private createPlayer() {
    this.player = this.physics.add.sprite(220, 220, PLAYER_TEXTURE_KEY).setCollideWorldBounds(true).setDepth(1);
  }

  private setupCamera() {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
  }

  private setupInput() {
    const keyboard = this.input.keyboard;

    if (!keyboard) {
      throw new Error("Keyboard input is unavailable.");
    }

    this.cursors = keyboard.createCursorKeys();

    this.wasd = {
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  private createHud() {
    this.positionText = this.add
      .text(20, 20, "", {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#ffffff",
        backgroundColor: "#00000099",
        padding: {
          x: 12,
          y: 10,
        },
      })
      .setScrollFactor(0)
      .setDepth(100);
  }
}
