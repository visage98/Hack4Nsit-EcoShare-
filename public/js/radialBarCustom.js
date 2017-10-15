window.onload = function() {
    var canvas = document.getElementById('paper');
    var ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    var firstProgressBar = new RadialBar(ctx, {
        x: 300,
        y: 300,
        angle: 250,
        radius: 150,
        lineWidth: 40,
        lineFill: '#CCB566',
        backLineFill: '#FB6929',
        bgFill: '#F8FF8E',
        isShowInfoText: true,
        infoStyle: '60px Arial'
    });

    function changeVal(happiness) {
        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            firstProgressBar.set(happiness+50);

            firstProgressBar.update();
        }
        requestAnimationFrame(loop);
        // loop();
    }

    changeVal(parseInt($("#happy-level").val()));
}