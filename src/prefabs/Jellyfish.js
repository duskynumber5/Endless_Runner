class Jellyfish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)    // add to existing, dsplayList, updateList
        this.moveSpeed = 7         // rocket speed in pixels/frame
    }

    update() {   
        // movement w/ boundaries
        if(keyLEFT.isDown && this.x >= borderUISize - this.width / 1.2) {
            this.x -= this.moveSpeed
        } else if(keyRIGHT.isDown && this.x <= game.config.width - this.width / 2) {
            this.x += this.moveSpeed
        }

    }
    
    reset() {
        
    }

}