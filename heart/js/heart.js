var RADIAN = Math.PI / 180;
var Heart = function(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.drawSemiCircle = function(x, y, radius, rotation) {
        this.context.beginPath();
        this.context.moveTo(x + (radius * Math.cos(rotation)), y + (radius * Math.sin(rotation)));
        for (var theta = RADIAN + rotation; theta <= Math.PI + rotation; theta += RADIAN) {
            this.context.lineTo(x + (radius * Math.cos(theta)), y + (radius * Math.sin(theta)));
        }
        this.context.fill();
    };
    this.calculateRotatedPoint = function(x, y, centerX, centerY, rotation) {
        // the original is tx/ty, but I can't remember what t stands for.
        var thetaX = x - centerX;
        var thetaY = y - centerY;
        var rotatedX = thetaX * Math.cos(rotation) - thetaY * Math.sin(rotation);
        var rotatedY = thetaX * Math.sin(rotation) + thetaY * Math.cos(rotation);
        return {
            "x": rotatedX + centerX,
            "y": rotatedY + centerY
        };
    };
    this.drawRotatedSquare = function(x, y, size, rotation) {
        this.context.beginPath();
        var centerX = x + (size / 2);
        var centerY = y + (size / 2);
        var points = [
            this.calculateRotatedPoint(x, y, centerX, centerY, rotation), // Top left
            this.calculateRotatedPoint(x + size, y, centerX, centerY, rotation), // Top right
            this.calculateRotatedPoint(x + size, y + size, centerX, centerY, rotation), // Bottom right
            this.calculateRotatedPoint(x, y + size, centerX, centerY, rotation) // Bottom left
        ];
        this.context.moveTo(points[3].x, points[3].y);
        for (var i = 0; i < points.length; i++) {
            this.context.lineTo(points[i].x, points[i].y);
        }
        this.context.fill();
    };
    this.draw = function(x, y, size, text) {
        this.context.strokeStyle = "black";
        this.context.fillStyle = "red";
        this.context.font = "48px monospace";
        this.drawSemiCircle(x + (size / 3), y + (size / 3), size / 4, 135 * RADIAN);
        this.drawSemiCircle(x + (2 * size / 3), y + (size / 3), size / 4, 225 * RADIAN);
        this.drawRotatedSquare(x + (size / 4), y + (size / 4), size / 2, 45 * RADIAN);
        this.context.fillStyle = "black";
        this.context.textAlign = "center";
        var lines = text.split("\n");
        var textY = y + (size / 4);
        for (var i in lines) {
            this.context.fillText(lines[i], x + (size / 2), textY);
            textY += size / 8;
        }
    };
};
