// Maddison Lobo
// ENDLESS RUNNER
// 20 hours

// creative tilt justification
    /*  When it came to obstacles I implemented a group to store all the objects so I am 
        able to manage them all while also have them exist and be able to edit them individually. 
        Also implementing physics again was very fun to play around with because it made collision 
        detection simpler and allowed me to increase difficulty by increasing gravity as time progresses. 

        My favorite visual I implemented is when you start the game, in the menu the jellyfish will swim off 
        screen then you follow it to the play scene were the game begins. I enjoyed creating animations for as 
        many elements as I could including each obstacle and the restart screen! Also this is more of an endless 
        swimmer than an endless runner which I think is a fun (yet somewhat still common) spin on the game style. 
    */

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
            debug: false
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