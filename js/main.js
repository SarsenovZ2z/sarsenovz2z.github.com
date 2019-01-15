import * as helper from "./helpers";

window.addEventListener("DOMContentLoaded", init);
var gl;
function init() {
    gl = document.getElementById("c").getContext('webgl');
    if (helper.resize(gl.canvas))
    {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
    run();
}

function run() {
    console.log(gl);

}
