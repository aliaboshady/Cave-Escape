class SceneMain extends Phaser.Scene
{
  constructor()
  {
    super('SceneMain');
  }

  init()
  {
    this.background;
    this.obstaclesGenerator;
    this.player;
    this.fire;
    this.cameraMoveSpeedDefault = 0.5;
    this.score = 0;
    this.scoreText;
    this.died = false;
    this.backgroundMusic;
  }

  create()
  {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0, 0);
    this.obstaclesGenerator = new ObstaclesGenerator(this, 49, 2, 3, this.cameraMoveSpeedDefault);
    this.player = new Player(this, config.width / 2, 100, 'playerWalk', this.obstaclesGenerator);
    this.fire = new Fire(this, config.width / 2, 0, 'fire');
    this.physics.add.overlap(this.player, this.obstaclesGenerator.boxesGroup, this.onPlayerOverlapsWithObstacles);
    this.physics.add.overlap(this.player, this.obstaclesGenerator.coinsGroup, this.onPlayerTakesCoin.bind(this));
    this.scoreText = this.add.text(20, 640, 'Score: 0', {color: '#ffffff', stroke: '#000000', strokeThickness: 4, fontSize: 20}).setDepth(10);

    this.backgroundMusic = this.sound.add('backgroundMusic');
    this.backgroundMusic.play();
    this.backgroundMusic.setRate(1.25);
    this.backgroundMusic.setVolume(0.1);
  }

  onPlayerOverlapsWithObstacles(player, obstacles)
  {
    player.onPlayerOverlapsWithObstacles();
  }

  onPlayerTakesCoin(player, coin)
  {
    coin.destroy();
    this.score++;
    this.scoreText.setText('Score: ' + this.score);
  }

  update()
  {
    this.fire.update();
    if(this.died) return;

    this.background.tilePositionY += this.cameraMoveSpeedDefault;
    this.player.update();
    this.obstaclesGenerator.update();

    if(this.player.y < 50)
    {
      this.player.onDied();
      this.died = true;
      this.time.addEvent({delay: 2000, callback: this.onPlayerDied, callbackScope: this, loop: false});
    }
  }

  onPlayerDied()
  {
    this.scene.restart();
  }
}