// obstacles.js

export class Obstacle {
    constructor(x, y, width, image) {
        const aspectRatio = image.naturalHeight / image.naturalWidth;
        
        this.x = x; // The x position where the obstacle will start
        this.y = y; // The y position where the obstacle will be drawn
        this.width = width; // The width of the obstacle (fixed)
        this.height = this.width * (image.naturalHeight / image.naturalWidth); // Calculate the height based on the aspect ratio
        this.image = image; // The image to use for the obstacle
    }

    draw(ctx) {
        // Draw the obstacle image at its current position with the maintained aspect ratio
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        // hit box for debugging purposes
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
