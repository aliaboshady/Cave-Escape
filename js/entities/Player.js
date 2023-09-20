class Player extends Phaser.Physics.Arcade.Sprite
{
  constructor(scene, x, y, textureKey, obstaclesGenerator) {
    super(scene, x, y, textureKey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setSize(30, 52);
    this.setOffset(0, 2);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.textureKey = textureKey;
    this.obstaclesGenerator = obstaclesGenerator;
    this.died = false;

    this.moveSpeedUp = -82.5;
    this.moveSpeedDown = 75;
    this.moveSpeedSide = 200;

    this.movingRight = false;
    this.movingLeft = false;

    this.rightKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).on('down', this.onPressRightKey.bind(this)).on('up', this.onReleaseRightKey.bind(this));
    this.leftKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).on('down', this.onPressLeftKey.bind(this)).on('up', this.onReleaseLeftKey.bind(this));

    this.moveDown();
  }

  update()
  {
    if(this.body.velocity.y < 0 && this.body.velocity.x == 0)
    {
      this.setTexture('playerIdle');
    }
    this.restrictBoxEdgeMovement();
  }

  onDied()
  {
    this.died = true;
    this.setVelocity(0, 0);
    this.play('playerDie_anim');
  }

  restrictBoxEdgeMovement()
  {
    const rows = this.obstaclesGenerator.obstacleRowsArray;
    let closestRow = rows[0];
    for (let i = 1; i < rows.length; i++) {
      if(Math.abs(rows[i].boxesContainer.y - this.y) < Math.abs(closestRow.boxesContainer.y - this.y))
      {
        closestRow = rows[i];
      }
    }

    const boxEdgeRight = closestRow.boxesEdgesArray[1];
    const boxEdgeLeft = closestRow.boxesEdgesArray[0];
    const rowY = closestRow.boxesContainer.y;

    const playerY = this.y - 24;

    if(playerY > rowY - 45 && playerY < rowY + 45)
    {
      if(boxEdgeRight && this.x > boxEdgeRight.x - 15)
      {
        this.x = boxEdgeRight.x - 15;
      }
      else if(boxEdgeLeft && this.x < boxEdgeLeft.x + 65)
      {
        this.x = boxEdgeLeft.x + 65;
      }
    }
  }

  onPlayerOverlapsWithObstacles()
  {
    if(!this.died) this.setVelocityY(this.moveSpeedUp);
  }

  onPressRightKey()
  {
    this.movingRight = true;
    if(this.movingLeft)
    {
      this.moveDown();
    }
    else
    {
      this.moveRight();
    }
  }

  onReleaseRightKey()
  {
    this.movingRight = false;
    if(!this.movingLeft)
    {
      this.moveDown();
    }
    else
    {
      this.moveLeft();
    }
  }

  onPressLeftKey()
  {
    this.movingLeft = true;
    if(this.movingRight)
    {
      this.moveDown();
    }
    else
    {
      this.moveLeft();
    }
  }

  onReleaseLeftKey()
  {
    this.movingLeft = false;
    if(!this.movingRight)
    {
      this.moveDown();
    }
    else
    {
      this.moveRight();
    }
  }

  moveDown()
  {
    if(this.died) return;
    this.play('playerWalkDown_anim');
    this.setVelocityX(0);
    this.setVelocityY(this.moveSpeedDown);
  }

  moveRight()
  {
    if(this.died) return;
    this.play('playerWalkRight_anim');
    this.setVelocityX(this.moveSpeedSide);
    this.setVelocityY(this.moveSpeedUp);
  }

  moveLeft()
  {
    if(this.died) return;
    this.play('playerWalkLeft_anim');
    this.setVelocityX(-this.moveSpeedSide);
    this.setVelocityY(this.moveSpeedUp);
  }
}