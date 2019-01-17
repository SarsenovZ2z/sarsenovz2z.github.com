import * as helper from "./helpers";

//
// Global Variables
//
var gl;

//
// Event Listeners
//
window.addEventListener("DOMContentLoaded", init);

//
//  Event Handlers
//
function init() {
    gl = document.getElementById("c").getContext('webgl');
    if (!gl) {
        helper.notify("Your browser doesn't support WebGL!");
        return;
    }

    if (helper.resize(gl.canvas)) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    helper.loadShaders(['vertexShader', 'fragmentShader'], main);
}

//
// Functions
//
function main(shaders) {
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, shaders['vertexShader']);
    gl.shaderSource(fragmentShader, shaders['fragmentShader']);



    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
    {
        helper.notify('Shader compilation error!');
        console.error('ShaderError: ' + gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
    {
        helper.notify('Shader compilation error!');
        console.error('ShaderError: ' + gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);
    gl.validateProgram(program);

    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        helper.notify('Error validating program');
        console.error("Program validation error: " + gl.getProgramInfoLog(program));
        return;
    }

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    var vertexArray = [
        0.0, 0.5,
        0.5, -0.5,
        -0.5, -0.5,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);

    var positionAttributeLocation = gl.getAttribLocation(program, 'vertexPosition');

    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, gl.FALSE, 2*Float32Array.BYTES_PER_ELEMENT, 0*Float32Array.BYTES_PER_ELEMENT);

    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.clearColor(0.75, 0.9, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

}
