class Fire extends Phaser.GameObjects.Sprite
{
  constructor(scene, x, y, textureKey, frame)
  {
    super(scene, x, y, textureKey, frame);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.textureKey = textureKey;

    this.fireSize = 70;
    this.fireSpace = 30;
    this.firesCount = 20;
    this.fireStartPosX = -60;

    this.fireDirection = true;
    this.fireContainer = this.scene.add.container(0, this.y).setDepth(20);

    for (let i = 0; i < this.firesCount; i++) {
      const fire = this.scene.add.sprite(this.fireStartPosX, this.y, 'fire');
      this.fireStartPosX += this.fireSpace;
      fire.displayWidth = this.fireSize;
      fire.displayHeight = this.fireSize;
      this.fireContainer.add(fire);
      fire.setOrigin(0, 0);
      fire.setDepth(20)
      fire.play('fire_anim');
    }

    this.scene.time.addEvent({delay: 500, callback: this.setFireDirection, callbackScope: this, loop: true});
  }

  setFireDirection()
  {
    this.fireDirection = !this.fireDirection;
  }

  update()
  {
    this.fireContainer.x += this.fireDirection ? 0.5 : -0.5;
  }
}