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
