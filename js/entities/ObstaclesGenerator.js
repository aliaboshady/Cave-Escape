class ObstaclesGenerator
{
  constructor(scene, boxSize, spaceSizeHorizontal, spaceSizeVertical, goingUpSpeed){
    this.scene = scene;
    this.boxSize = boxSize; // In Pixels
    this.spaceSizeHorizontal = spaceSizeHorizontal; // In Boxes Count
    this.spaceSizeVertical = spaceSizeVertical; // In Boxes Count
    this.goingUpSpeed = goingUpSpeed;
    this.startingRowsY = 350;
    this.rowsCountAtAnyTime = 6;
    this.obstacleRowsArray = [];
    this.chanceForRightBox = 0.7;
    this.rightBoxThisTime = true;
    this.boxesGroup = this.scene.physics.add.group();
    this.boxesGroupEdges = this.scene.physics.add.group();
    this.coinsGroup = this.scene.physics.add.group();
    this.coinsYOffset = 98;

    this.create();
  }

  create()
  {
    let currentRowY = this.startingRowsY;
    for (let i = 0; i < this.rowsCountAtAnyTime; i++) {
      this.createNewObstaclesRow(currentRowY);
      currentRowY += this.spaceSizeVertical * this.boxSize;
    }
  }

  update()
  {
    for (let i = 0; i < this.obstacleRowsArray.length; i++) {
      this.obstacleRowsArray[i].update(this.goingUpSpeed);
    }

    this.updateCoins();
  }

  createNewObstaclesRow(y)
  {
    const obstaclesRow = new ObstaclesRow(this.scene, this, this.boxSize, this.spaceSizeHorizontal, this.spaceSizeVertical, y, this.obstacleRowsArray, this.boxesGroup, this.boxesGroupEdges, this.rightBoxThisTime ? this.chanceForRightBox : 1 - this.chanceForRightBox);
    this.obstacleRowsArray.push(obstaclesRow);
    this.rightBoxThisTime = !this.rightBoxThisTime;
    this.createCoin(y);
  }

  onObstaclesRowDestroyed()
  {
    const lastRow = this.obstacleRowsArray[this.obstacleRowsArray.length - 1];
    const nextY = lastRow.getNewRowY();
    this.createNewObstaclesRow(nextY);
  }

  createCoin(y)
  {
    const randX = Phaser.Math.Between(30, config.width - 30);
    const coin = new Coin(this.scene, randX, y + this.coinsYOffset, 'coin', null, this, this.goingUpSpeed);
    this.coinsGroup.add(coin);
    coin.create();
  }

  updateCoins()
  {
    this.coinsGroup.children.iterate((coin) => {if(coin) coin.update();});
  }

  onDestroyCoin(coinToRemove)
  {
    this.coinsGroup.remove(coinToRemove, true);
  }
}