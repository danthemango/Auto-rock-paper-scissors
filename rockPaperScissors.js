function getCircle(colors = getRandomColors()) {
    function getCoordinatesForPercent(percent) {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    }

    const numSegments = colors.length;
    const percentDelta = 1 / numSegments;
    let cumulativePercent = 0;

    let [startX, startY] = getCoordinatesForPercent(0);
    const paths = [];
    for (const color of colors) {
        // each slice starts where the last slice ended, so keep a cumulative percent
        cumulativePercent += percentDelta;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        const largeArcFlag = percentDelta > 0.5 ? 1 : 0; // if the slice is more than 50%, take the large arc (the long way around)

        // create a <path> and append it to the <svg> element
        paths.push(`
          <path d="M ${startX} ${startY}  A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}  L 0 0" fill="#${color}" clip-path="url(#clipper)">
          </path>
      `);

        [startX, startY] = [endX, endY];
    }

    return `
     <svg xmls="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" style="transform: rotate(-90deg)" width="300">
       <defs>
          <clipPath id="clipper">
             <circle cx="0" cy="0" r=".28"></circle>
             <path d="m 0,-1 c -0.552,0 -1,0.448 -1,1 0,0.552 0.448,1 1,1 C 0.552,1 1,0.552 1,0 1,-0.552 0.552,-1 0,-1 Z m 0,1.536 c -0.296,0 -0.536,-0.24 -0.536,-0.536 0,-0.296 0.24,-0.536 0.536,-0.536 0.296,0 0.536,0.24 0.536,0.536 0,0.296 -0.24,0.536 -0.536,0.536 z"></path>
          </clipPath>
       </defs>
       ${paths.join("\n")}
     </svg>
     `;
}

function getScissorImgString() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="110" height="60">
            <linearGradient id="lg1">
                <stop offset="0" style="stop-color:#3a393d;stop-opacity:1" />
                <stop style="stop-color:#7f7e85;stop-opacity:1" offset="0.45323682"/>
                <stop offset="1" style="stop-color:#eeeef0;stop-opacity:1" />
            </linearGradient>
            <linearGradient gradientTransform="translate(-40.159054,12.348416)" gradientUnits="userSpaceOnUse"
            y2="32.475651" x2="30.76417" y1="35.187626" x1="31.946936" id="lg2" />
            <path 
                d="m 7.4275061,49.226551 c -0.9507818,1.111098 -1.712243,2.906357 -1.712243,2.906357 0,0 2.0645478,-0.893638 3.0733838,-1.390106 4.4570961,-2.193421 11.3772021,-5.982803 13.1500241,-7.011991 3.91827,-2.274701 7.973992,-5.056116 11.521742,-7.8572 2.412061,-1.904413 3.872138,-4.258311 6.31168,-5.949622 1.658859,-1.150069 3.772039,-1.394209 5.719706,-1.239229 1.947666,0.154981 4.891844,0.173039 8.63018,-4.206532 3.738337,-4.379571 1.263312,-6.687024 -0.661268,-7.880259 -1.92458,-1.193234 -5.598819,0.501343 -6.722495,1.382381 -1.123676,0.881039 -3.173153,3.157172 -3.644547,4.599485 -0.471387,1.442318 -1.155522,2.17846 -3.329404,4.37938 -0.892646,0.903747 -1.843208,1.56532 -2.631038,2.094061 -1.248795,0.838112 -2.805098,1.335661 -3.890316,2.080678 0,0 -3.120283,2.221192 -4.734396,3.250227 -1.067998,0.680873 -2.200287,1.256834 -3.271697,1.932324 -3.504766,2.20965 -6.975893,4.481877 -10.317475,6.931322 -2.576856,1.888888 -6.5410501,4.867629 -7.4918369,5.978724 z M 45.651417,20.908222 c 0.712352,-0.901901 1.566162,-1.775776 2.329473,-2.203913 1.526622,-0.856276 4.251507,-1.731209 5.556084,-0.60865 1.304574,1.122562 0.909712,2.203114 0.777818,3.112527 -0.131894,0.909412 -0.824874,2.661274 -2.891259,4.377336 -1.950354,1.619703 -2.989697,1.657788 -4.50975,1.737055 -2.436267,0.127047 -3.317508,-2.416074 -2.743023,-4.042232 0.191607,-0.54237 0.768307,-1.47022 1.480657,-2.372123 z"
                style="opacity:1;fill:#b5b4b9;fill-opacity:1;stroke:none;stroke-width:0.4;stroke-miterlimit:4;stroke-dasharray:none"
                id="path861" />
            <path 
                d="m 33.720413,6.1892711 c -0.344659,0.4449713 -0.686483,0.9793966 -1.022793,1.6157562 -2.690489,5.0908817 -1.448348,7.7586577 -0.724172,9.5733177 0.928369,2.326341 1.170253,4.175539 0.720922,6.539586 -0.899694,4.733523 -3.370981,8.978075 -5.791169,13.12287 0,0 0.48659,0.811612 0.575103,1.589508 0.08851,0.777893 -0.778324,2.1635 -1.111208,2.700426 -0.332892,0.53692 -3.989378,6.258729 -3.989378,6.258729 10e-7,0 -4.148887,6.933036 -4.647911,7.856577 -0.499024,0.923542 -1.980458,3.140881 -2.377011,3.579983 -0.396553,0.439102 -1.229654,1.426726 -1.229654,1.426726 0.136742,0.108803 10.900466,-12.739214 11.652353,-13.933203 0.747592,-1.187167 7.700342,-11.040465 7.700342,-11.040465 0,0 -0.133906,-3.089525 0.377343,-6.713195 0.354869,-2.515261 0.970673,-5.801085 1.700816,-7.46781 1.241297,-2.833549 1.66768,-2.792836 2.834161,-3.763303 1.166476,-0.970468 2.669659,-3.89613 3.073732,-5.265656 0.404074,-1.369525 0.622654,-5.410079 -1.196694,-6.7583324 -1.59193,-1.1797224 -4.13216,-2.4363085 -6.544782,0.6784855 z m 0.457691,1.5951445 c 0.546681,-0.6991833 1.08917,-1.1364606 1.487429,-1.3655858 0.796515,-0.4582485 1.654976,-1.22391 3.179794,-0.4257959 1.524818,0.7981172 1.849713,3.6763601 1.485072,5.3883251 -0.416126,1.953684 -1.312376,3.868761 -2.846479,5.229871 -1.290081,1.144604 -3.988409,1.254047 -4.769569,-1.057084 -0.487386,-1.441977 -0.835162,-2.422191 -0.04971,-4.832666 0.416087,-1.2769381 0.966784,-2.2378835 1.513463,-2.9370644 z"
                style="opacity:1;fill:#c1c3bc;fill-opacity:1;stroke:none;stroke-width:0.4;stroke-miterlimit:4;stroke-dasharray:none"
                id="path863" />
            <path id="path872"
                style="opacity:1;fill:#e7e6e2;fill-opacity:1;stroke:none;stroke-width:0.4;stroke-miterlimit:4;stroke-dasharray:none"
                d="m 26.903201,37.040801 c 0,0 -0.08129,0.63665 -0.194585,0.946701 -0.113302,0.310053 -2.196278,3.38894 -2.874118,4.450412 -0.677842,1.061469 -4.36329,6.866825 -6.541291,10.903436 -2.148776,3.982449 -3.031708,6.898 -3.055256,6.976237 0.163108,-0.192964 0.767149,-0.906559 1.114845,-1.291563 0.396553,-0.439102 1.877987,-2.656441 2.377011,-3.579983 0.499024,-0.923541 4.647912,-7.856577 4.647911,-7.856577 0,0 3.656486,-5.721809 3.989378,-6.258729 0.332884,-0.536926 1.199717,-1.922533 1.111208,-2.700426 -0.08851,-0.777896 -0.575103,-1.589508 -0.575103,-1.589508 z" />
            <path
                d="m 26.903201,37.040801 c 0,0 -2.372356,3.432805 -5.511567,8.488841 -3.139214,5.056035 -3.285037,5.490534 -4.849972,8.630913 -1.564935,3.140378 -2.512296,5.970567 -2.541116,6.106815 -0.02883,0.136245 0.02747,0.225257 0.02747,0.225257 l 0.09513,-0.03988 0.114813,-0.135159 c 0.02354,-0.07824 0.906476,-2.993792 3.055252,-6.976241 2.178001,-4.036611 5.863449,-9.841967 6.541291,-10.903436 0.67784,-1.061472 2.760816,-4.140359 2.874118,-4.450412 0.1133,-0.310051 0.194585,-0.946701 0.194585,-0.946701 z"
                style="opacity:1;fill:#86877f;fill-opacity:1;stroke:none;stroke-width:0.4;stroke-miterlimit:4;stroke-dasharray:none"
                id="path870" />
            <circle transform="rotate(-51.491358)" r="1.7071841" cy="46.047764" cx="-8.9854021" id="path942"
                style="display:inline;opacity:0.998;fill:url(#lg2);fill-opacity:1;stroke:none;stroke-width:0.4;stroke-miterlimit:4;stroke-dasharray:none" />
        </svg>
    `;
}

function loadScissors(ctx) {
    var img1 = new Image();
    const mult = 2;
    img1.onload = function() {
            ctx.drawImage(img1, 0, 0, 110 * mult, 60 * mult);
        }
        // img1.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(scissorImgString);
    img1.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(getScissorImgString());
}

let fps = 10;

let nextframe = null;

function play(toDraw) {
    if (fps == 0) {
        nextframe = setTimeout(play, 80 / fps, false);
    } else {
        if (toDraw) {
            createCircle();
        }
        nextframe = setTimeout(play, 1000 / fps, true)
    }
}

function clock() {
    const now = new Date();
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, 150, 150);
    ctx.translate(75, 75);
    ctx.scale(0.4, 0.4);
    ctx.rotate(-Math.PI / 2);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    // Hour marks
    ctx.save();
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(100, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
    }
    ctx.restore();

    // Minute marks
    ctx.save();
    ctx.lineWidth = 5;
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
            ctx.beginPath();
            ctx.moveTo(117, 0);
            ctx.lineTo(120, 0);
            ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours() % 12;

    ctx.fillStyle = "black";

    // Write image description
    canvas.innerText = `The time is: ${hr}:${min}`;

    // Write Hours
    ctx.save();
    ctx.rotate(
        (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
    );
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // Write Minutes
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();

    // Write seconds
    ctx.save();
    ctx.rotate((sec * Math.PI) / 30);
    ctx.strokeStyle = "#D40000";
    ctx.fillStyle = "#D40000";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(83, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#325FA2";
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.restore();

    window.requestAnimationFrame(clock);
}

window.onload = function() {
    // loadScissors(ctx);
    window.requestAnimationFrame(clock);
};