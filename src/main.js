// Maddison Lobo
// ENDLESS RUNNER
// 15 hours

// creative tilt justification
    /*  When it came to obstacles I implemented a group to store all the objects so I am 
        able to manage them while also have them exist and be able to edit them individually. 
        Also implementing physics again was very fun to play around with because it made collision 
        detection simpler and allowed me to increase difficulty by increasing gravity as time progresses. 

        I enjoyed creating animations for as many elements as I could including each obstacle and the 
        restart screen! I'm also proud of my jellyfish because hes simple yet cute. 
    */

/*Does your game...

...do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new? (1)
...have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form? (1)
For these last two criteria, let us know what to look for in your source. Put a comment block in main.js and tell us what you did. In my Paddle Parkour P3 game, for instance, I use local storage to track the player's high score across browser sessions. That's technically interesting and took some research and experimentation to implement properly. But I also have a neat visual effect—a rainbow trail—that triggers if a player survives long enough. That's visual style!
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