export class World{

    constructor(){

        this.size = 8000;

        this.objects=[];
        this.stars = [];

for (let i = 0; i < 1000; i++) {

    this.stars.push({
        x: (Math.random() - 0.5) * this.size * 2,
        y: (Math.random() - 0.5) * this.size * 2,
        radius: Math.random() * 2 + 0.5
    });

}

        for(let i=0;i<500;i++){

            this.objects.push({

                x:(Math.random()-0.5)*this.size*2,
                y:(Math.random()-0.5)*this.size*2,
                radius:10+Math.random()*20,
                type:Math.floor(Math.random()*3)

            });

        }

    }

    draw(ctx) {
        // Stars
ctx.fillStyle = "#ffffff";

for (const star of this.stars) {

    ctx.beginPath();
    ctx.arc(
        star.x,
        star.y,
        star.radius,
        0,
        Math.PI * 2
    );
    ctx.fill();

}

    // Base alien ground
    ctx.fillStyle = "#08140d";
    ctx.fillRect(
        -this.size,
        -this.size,
        this.size * 2,
        this.size * 2
    );

    // Organic patches
    for (let x = -this.size; x < this.size; x += 300) {

        for (let y = -this.size; y < this.size; y += 300) {

            const shade = Math.sin(x * 0.001) * Math.cos(y * 0.001);

            if (shade > 0.25) {

                ctx.fillStyle = "#11261b";

                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    120,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }

        }

    }

    // Draw resources/objects
    for (const obj of this.objects) {

        if (obj.type == 0)
            ctx.fillStyle = "#6cff84";

        if (obj.type == 1)
            ctx.fillStyle = "#6f7bff";

        if (obj.type == 2)
            ctx.fillStyle = "#d94cff";

        ctx.beginPath();
        ctx.arc(
            obj.x,
            obj.y,
            obj.radius,
            0,
            Math.PI * 2
        );

             ctx.fill();

    }

} // End of draw()

} // End of World class