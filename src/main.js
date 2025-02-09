// Maddison Lobo
// ENDLESS RUNNER
// 13 hours

// creative tilt justification
    // 

// make screen size & add scenes
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 75 },
            debug: true
        }
    },
    scene: [ Menu, Play, Credits ],
}

// make game!
let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyUP, keyLEFT, keyRIGHT, keyRESTART, keyMENU, keyCREDITS