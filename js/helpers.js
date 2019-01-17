export function notify(message, type='info') {
    // TODO: use toaster;
    alert(message);
}

export function resize(canvas) {
    if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight)
    {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        return true;
    }
    return false;
}

export function rand(min=0, max=1, decimal = false) {
    if (decimal) {
        return Math.round(Math.random() * (max - min)) + min;
    }
    return Math.random() * (max - min) + min;
}

function loadResource(url, method='GET') {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(method, url);
        request.onload = function() {
            if (request.status >= 200 && request.status<300) {
                resolve(request.responseText);
            }
            else {
                reject("Resource loading error! Http status: " + request.status + ". URL: " + url);
            }
        }
        request.send();
    });
}

function loadShader(name, callback) {
    loadResource('shaders/' + name + '.glsl')
    .then(callback)
    .catch(function(error) {
        notify('Error with loading resource. See console');
        console.error(error);
    });

}

export function loadShaders(names, callback) {
    return new Promise(function(resolve, reject) {
        var shaders = [];
        names.forEach(function(name, index) {
            loadShader(name, function(result) {
                shaders[name] = result;
                if (index==names.length-1)
                {
                    callback(shaders);
                }
            });
        });
    });
}
