function PrintConfetti() {

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext('2d')

    let cw = window.innerWidth
    let ch = window.innerHeight

    canvas.width = cw
    canvas.height = ch

    let confettis = []
    let confettisFallen = 0
    let height = 20
    let width = 10
    let confettisCount = 150

    class Confetti {
        constructor (x, y) {
            this.x = x
            this.y = y
            this.color = this.colors()
            this.angle = Math.random() * 360
            this.vy = Math.floor(Math.random() * 5) + 3
            this.spin = Math.random() < 0.5 ? -1 : 1
        }

        draw () {
            ctx.save()
            ctx.beginPath()
            ctx.translate(this.x, this.y)
            ctx.rotate(this.angle * Math.PI / 360 * this.spin)
            ctx.fillStyle = this.color
            ctx.fillRect(0,0,height,width)
            ctx.fill()
            ctx.closePath()
            ctx.restore()

            this.angle += 10
            this.y += this.vy

            if (this.y > ch) {
                this.y = -999999999
                confettisFallen++
            }
        }

        colors() {
            let r = Math.floor(Math.random() * 255)
            let g = Math.floor(Math.random() * 255)
            let b = Math.floor(Math.random() * 255)

            return `rgba(${r}, ${g}, ${b})`
        }
    }

    let update = () => {
        if (confettis.length < confettisCount) {
            let confetti = new Confetti(Math.floor(Math.random() * cw), -50)
            confetti.draw()
            confettis.push(confetti)
        }

        ctx.clearRect(0,0,cw,ch)

        confettis.map((confetti) => {
            return confetti.draw()
        })

        if (confettisFallen < 150) {
            requestAnimationFrame(update)
        } else {
            confettis = []
            canvas.remove()
        }
    }

    update()
}