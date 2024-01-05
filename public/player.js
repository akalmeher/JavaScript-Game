export class Player {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocityY = 10;
        this.gravity = 0.32;
        this.jumpPower = 8.25;
        this.onGround = true;
        this.sprite = new Image();
        this.sprite.src = 'cuppicake.png';
        this.jumpingSprite = new Image();
        this.jumpingSprite.src = 'cuppicakeJump.png';
        this.jumpsLeft = 2;
        this.currentSprite = this.sprite; // The sprite that's currently used for drawing
    }

    jump() {
        if (this.jumpsLeft > 0) {
            this.velocityY = -this.jumpPower;
            this.jumpsLeft--;
            this.onGround = false;
            this.currentSprite = this.jumpingSprite;
        }
    }

    applyGravity() {
        this.velocityY += this.gravity;
    }

    update(canvasHeight) {
        if (!this.onGround) {
            this.applyGravity();
        }
    
        this.y += this.velocityY;
    
        if (this.y + this.height >= canvasHeight - 25) {
            this.y = canvasHeight - 25 - this.height;
            this.velocityY = 0;
            this.onGround = true;
            this.jumpsLeft = 2; // Reset the jump counter on landing
            this.currentSprite = this.sprite;
        } else {
            this.onGround = false;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.currentSprite, this.x, this.y, this.width, this.height);
        
        // hit box for debugging purposes
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
