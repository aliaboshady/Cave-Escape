class ObstaclesRow
{
  constructor(scene, ObstaclesGenerator, boxSize, spaceSizeHorizontal, spaceSizeVertical, y, obstacleRowsArray, boxesGroup, boxesGroupEdges, chanceForRightBox)
  {
    this.scene = scene;
    this.ObstaclesGenerator = ObstaclesGenerator;
    this.boxSize = boxSize; // In Pixels
    this.spaceSizeHorizontal = spaceSizeHorizontal; // In Boxes Count
    this.spaceSizeVertical = spaceSizeVertical; // In Boxes Count
    this.y = y;
    this.rowArray = [];
    this.boxesEdgesArray = [];
    this.boxesContainer = this.scene.add.container(0, this.y);
    this.obstacleRowsArray = obstacleRowsArray;
    this.boxesGroup = boxesGroup;
    this.boxesGroupEdges = boxesGroupEdges;
    this.chanceForRightBox = chanceForRightBox;
    this.cuttoffY = -100;

    this.createBoxesRowArray();
    this.createBoxesRowImages();
  }

  createBoxesRowArray()
  {
    const totalBoxesPerRow = config.width / this.boxSize;
    const boxesToAdd = totalBoxesPerRow - this.spaceSizeHorizontal;

    // Add Spaces First
    for (let i = 0; i < this.spaceSizeHorizontal; i++) {
      this.rowArray.push(0);
    }

    // Add Boxes Around Spaces
    for (let i = 0; i < boxesToAdd; i++) {
      if(Math.random() > this.chanceForRightBox)
      {
        this.rowArray.push(1);
      }
      else
      {
        this.rowArray.unshift(1);
      }
    }
  }

  createBoxesRowImages()
  {
    for (let i = 0; i < this.rowArray.length; i++) {
      if(this.rowArray[i] === 1)
      {
        const boxImage = this.scene.physics.add.sprite(i * this.boxSize, 0, 'box').setOrigin(0, 0);
        this.boxesGroup.add(boxImage);
        boxImage.setImmovable();
        boxImage.displayWidth = this.boxSize;
        boxImage.displayHeight = this.boxSize;
        this.boxesContainer.add(boxImage);

        // Edge Box
        if((i > 0 && this.rowArray[i - 1] === 0) || (i < this.rowArray.length && this.rowArray[i + 1] === 0))
        {
          const boxImageEdge = this.scene.physics.add.sprite(i * this.boxSize, 0, 'box').setOrigin(0, 0);
          this.boxesGroupEdges.add(boxImageEdge);
          boxImageEdge.setImmovable();
          boxImageEdge.displayWidth = this.boxSize;
          boxImageEdge.displayHeight = this.boxSize;
          this.boxesContainer.add(boxImageEdge);
          this.boxesEdgesArray.push(boxImageEdge);
        }
      }
    }
  }

  update(goingUpSpeed)
  {
    this.boxesContainer.y -= goingUpSpeed;

    if(this.boxesContainer.y < this.cuttoffY)
    {
      this.destroy();
    }
  }

  destroy()
  {
    // Remove row from array container
    for (let i = 0; i < this.obstacleRowsArray.length; i++) {
      if(this.obstacleRowsArray[i] === this)
      {
        this.obstacleRowsArray.splice(i, 1);
        this.ObstaclesGenerator.onObstaclesRowDestroyed();
      }
    }

    // Destroy row
    this.boxesContainer.iterate((box) => {
      this.boxesGroupEdges.children.iterate((boxEdge) => {if(boxEdge === box) boxEdge.destroy()});
      this.boxesGroup.children.iterate((boxFromGroup) => {if(boxFromGroup === box) boxFromGroup.destroy()});
      if(box) box.destroy();
    });
  }

  getNewRowY()
  {
    return this.boxesContainer.y + this.spaceSizeVertical * this.boxSize;
  }
}