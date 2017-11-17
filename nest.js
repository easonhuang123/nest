(function () {
    let canvas = document.getElementById('canvas')
    let context = canvas.getContext('2d')
    let canvas_width = canvas.width = window.innerWidth
    let canvas_height = canvas.height = window.innerHeight
    let current = {
        x: null,
        y: null,
        max: 20000
    }
    let array = []
    let random = []

    init()

    function init() {
        for (let i = 0; i < 99; i++) {
            random.push({
                x: Math.random() * canvas_width,
                y: Math.random() * canvas_height,
                xa: Math.random() * 2 - 1,
                ya: Math.random() * 2 - 1,
                max: 6000
            })
        }
        array= random.concat([current])
        setTimeout(() => {
            draw()
        }, 100)
    }

    function draw() {
        context.clearRect(0, 0, canvas_width, canvas_height)
        let tmp, i, x, y, dist, d
        random.forEach((node, index) => {
            node.x += node.xa
            node.y += node.ya
            node.xa *= node.x > canvas_width || node.x < 0 ? -1 : 1
            node.ya *= node.y > canvas_height || node.y < 0 ? -1 : 1
            context.fillRect(node.x - 0.5, node.y - 0.5, 1, 1)
            for (i = index + 1; i < array.length; i++) {
                tmp = array[i]
                if (null !== tmp.x && null !== tmp.y) {
                    x = node.x - tmp.x
                    y = node.y - tmp.y
                    dist = x * x + y * y
                    if (dist < tmp.max) {
                        if (tmp === current) {
                            dist >= tmp.max / 2 && (node.x -= 0.03 * x, node.y -= 0.03 * y)
                        }
                        d = (tmp.max - dist) / tmp.max
                        context.beginPath()
                        context.lineWidth = d / 2
                        context.strokeStyle = 'rgba(0,0,0,' + (d + 0.2) + ')'
                        context.moveTo(node.x, node.y)
                        context.lineTo(tmp.x, tmp.y)
                        context.stroke()
                    }
                }
            }
        })
        window.requestAnimationFrame(draw)
    }

    window.onmousemove = (e) => {
        e = e || window.event;
        current.x = e.clientX
        current.y = e.clientY
    }
    window.onmouseout = () => {
        current.x = null
        current.y = null
    }
})()
