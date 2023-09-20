/// <reference path="../phaser.d.ts" />

let game;
let config;

window.addEventListener('load', () => {
  config = {
    type: Phaser.AUTO,
    backgroundColor: '#cdcdcd',
    width: 490,
    height: 700,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [SceneLoader, SceneMain],
    physics: 
    {
      default: 'arcade',
      arcade:
      {
        debug: false
      }
    }
  };
  
  game = new Phaser.Game(config)
});
