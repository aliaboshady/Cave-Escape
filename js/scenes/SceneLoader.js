class SceneLoader extends Phaser.Scene
{
  constructor()
  {
    super('SceneLoader');
  }

  preload()
  {
    this.load.image('background', 'assets/images/background.png');
    this.load.spritesheet('playerWalkDown', 'assets/images/Player/player/player_walk_down.png', {frameWidth: 30, frameHeight: 52});
    this.load.spritesheet('playerWalkRight', 'assets/images/Player/player/player_walk_right.png', {frameWidth: 26, frameHeight: 50});
    this.load.spritesheet('playerWalkLeft', 'assets/images/Player/player/player_walk_left.png', {frameWidth: 26, frameHeight: 50});
    this.load.spritesheet('playerDie', 'assets/images/Player/player/player_die.png', {frameWidth: 32, frameHeight: 52});
    this.load.image('playerIdle', 'assets/images/Player/player/player_idle.png');
    this.load.image('flyWalk1', 'assets/images/Enemies/flyFly1.png');
    this.load.image('flyWalk2', 'assets/images/Enemies/flyFly2.png');
    this.load.image('box', 'assets/images/Tiles/boxAlt.png');
    this.load.spritesheet('fire', 'assets/images/fire.png', {frameWidth: 128, frameHeight: 128});
    this.load.image('coin', 'assets/images/Items/coinGold.png');

    this.load.audio('backgroundMusic', 'assets/audio/background.m4a');
  }

  create()
  {
    this.anims.create({
      key: 'playerWalkDown_anim',
      frames: this.anims.generateFrameNumbers('playerWalkDown'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'playerWalkRight_anim',
      frames: this.anims.generateFrameNumbers('playerWalkRight'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'playerWalkLeft_anim',
      frames: this.anims.generateFrameNumbers('playerWalkLeft'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'playerDie_anim',
      frames: this.anims.generateFrameNumbers('playerDie'),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: 'fire_anim',
      frames: this.anims.generateFrameNumbers('fire'),
      frameRate: 40,
      repeat: -1,
    });

    this.scene.start('SceneMain');
  }
}