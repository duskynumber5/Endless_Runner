// Maddison Lobo
// ENDLESS RUNNER
// _ hours

// creative tilt justification
    // 

// make screen size & add scenes
let config = {
    type: Phaser.AUTO,
    scene: [ Menu ],
}

// make game!
let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyUP, keyDOWN