class Coin extends Phaser.Physics.Arcade.Sprite
{
  constructor(scene, x, y, textureKey, frame, obstacleGenerator, goingUpSpeed)
  {
    super(scene, x, y, textureKey, frame);
    scene.add.existing(this);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.textureKey = textureKey;
    this.obstacleGenerator = obstacleGenerator;
    this.goingUpSpeed = goingUpSpeed;
  }

  create()
  {
    this.setSize(30, 30);
  }

  update()
  {
    this.y -= this.goingUpSpeed;
    if(this.y < -100)
    {
      this.obstacleGenerator.onDestroyCoin(this);
    }
  }
}