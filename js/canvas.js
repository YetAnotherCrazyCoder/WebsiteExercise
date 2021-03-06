// Part 1.9.2 Use the HTML canvas element

// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
var position = { x: 0, y: $('#canvas').height / 2 };
var counter = 0;
var minFontSize = 8;
var angleDistortion = 0;
var letters = "HTML5 is the latest evolution of the standard that defines HTML. The term represents two different concepts. It is a new version of the language HTML, with new elements, attributes, and behaviors, and a larger set of technologies that allows the building of more diverse and powerful Web sites and applications. This set is sometimes called HTML5 & friends and often shortened to just HTML5.";

// Drawing variables
var canvas;
var context;
var mouse = { x: 0, y: 0, down: false }

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvas.width = $('#canvasHolder').width();
    canvas.height = $('#canvasHolder').height();

    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mouseout', mouseUp, false);
    canvas.addEventListener('dblclick', doubleClick, false);

    window.onresize = function (event) {
        canvas.width = $('#canvasHolder').width();
        canvas.height = $('#canvasHolder').height();
    }
}

function mouseMove(event) {
    mouse.x = event.pageX - $('#canvas').offset().left;
    mouse.y = event.pageY - $('#canvas').offset().top;
    draw();
}

function draw() {
    if (mouse.down) {
        var d = distance(position, mouse);

        var fontSize = minFontSize + d / 2;
        var letter = letters[counter];
        var stepSize = textWidth(letter, fontSize);

        if (d > stepSize) {
            var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

            context.font = fontSize + "px Georgia";

            context.save();
            context.translate(position.x, position.y);
            context.rotate(angle);
            context.fillText(letter, 0, 0);
            context.restore();

            counter++;
            if (counter > letters.length - 1) {
                counter = 0;
            }

            position.x = position.x + Math.cos(angle) * stepSize;
            position.y = position.y + Math.sin(angle) * stepSize;

        }
    }
}

function distance(pt, pt2) {

    var xs = 0;
    var ys = 0;

    xs = pt2.x - pt.x;
    xs = xs * xs;

    ys = pt2.y - pt.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}

function mouseDown(event) {
    mouse.down = true;
    position.x = event.pageX - $('#canvas').offset().left;
    position.y = event.pageY - $('#canvas').offset().top;

    document.getElementById('info').style.display = 'none';
}

function mouseUp(event) {
    mouse.down = false;
    //document.getElementById('info').style.display = 'block';
}

function doubleClick(event) {
    canvas.width = canvas.width;
}

function textWidth(string, size) {
    context.font = size + "px Georgia";

    if (context.fillText) {
        return context.measureText(string).width;
    } else if (context.mozDrawText) {
        return context.mozMeasureText(string);
    }

};

init();