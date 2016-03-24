window.addEventListener("load", function() {
    var canvas = document.getElementById("output");
    var heart = new Heart(canvas);
    function onRender() {
        var text = document.getElementById("text").value;
        heart.draw(0, 0, canvas.width, text);
    }
    document.getElementById("submit").addEventListener("click", onRender);
});
