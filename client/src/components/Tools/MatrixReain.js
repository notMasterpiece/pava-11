class MatrixRein {
    constructor(selector) {

        this.selector = selector;
        this.height = window.innerHeight;
        this.width = window.innerWidth;
        this.gFade = 'rgba(0,0,0, 0.02)';
        this.color = '#0871b6';
        this.gSlowFillColor = '#2891d6';
        this.font = 17;
        this.gFont = this.font + 'px "Muli"';
        this.gSlowCycle = 2;
        this.gCurrentSlowCycle = this.gSlowCycle;
        this.ctx = this.selector.getContext('2d');



    }

    rainWindowResize () {
        this.selector.height = this.height;
        this.selector.width = this.width;
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.gStreams = Math.ceil(this.width / (this.font));
        this.gY = [];
        this.gYTerm = [];
        this.gYSlow = [];
        this.gYTermSlow = [];
        this.gTerminateHeight = this.height * 0.3;
        this.gTerminateAddHeight = this.height;
        this.goBoom = 1;
        this.goBoomSlow = 1;
        for (let index = 0; index < this.gStreams; index++) {
            this.gY[index] = 0 - Math.ceil((Math.random() * 150));
            this.goBoom = this.gTerminateHeight + (Math.random() * this.gTerminateAddHeight);
            this.gYTerm[index] = Math.min(this.goBoom, this.height);
            this.goBoomSlow = this.gTerminateHeight + (Math.random() * this.gTerminateAddHeight);
            this.gYTermSlow[index] = Math.min(this.goBoomSlow, this.height);
            this.gYSlow[index] = 0 - Math.ceil((Math.random() * 450));

        }
    }


    renderRain () {
        this.ctx.fillStyle = this.gFade;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.font = this.gFont;

        for (let index = 0; index < this.gStreams; index++) {
            let text = String.fromCharCode(33 + Math.random() * 32);
            let x = index * this.font;
            let y = this.gY[index];
            this.ctx.fillText(text, x, y);
            if (y > this.gYTerm[index]) {
                this.gY[index] = 0 - Math.ceil((Math.random() * 150));
                let t = this.gTerminateHeight + (Math.random() * this.gTerminateAddHeight);
                this.gYTerm[index] = Math.min(t, this.height);
            } else {
                this.gY[index] = y + this.font;
            }
        }

        this.gCurrentSlowCycle--;
        if (this.gCurrentSlowCycle === 0) {
            this.ctx.fillStyle = this.gSlowFillColor;
            for (let index = 0; index < this.gStreams; index++) {

                let text = String.fromCharCode(33 + Math.random() * 32);
                let x = index * this.font;
                let y = this.gYSlow[index];
                this.ctx.fillText(text, x, y);
                if (y > this.gYTermSlow[index]) {
                    this.gYSlow[index] = 0 - Math.ceil((Math.random() * 70));
                    let t = this.gTerminateHeight + (Math.random() * this.gTerminateAddHeight);
                    this.gYTermSlow[index] = Math.min(t, this.height);
                } else {
                    this.gYSlow[index] = y + this.font;
                }
            }
            this.gCurrentSlowCycle = this.gSlowCycle;
        }
        requestAnimationFrame(this.renderRain.bind(this));
    }


    init() {
        this.rainWindowResize();
        this.renderRain();
    }
}


export default MatrixRein;











// var LandModulesAbout = function () {};
//
//
// LandModulesAbout.prototype.init = function () {
//     var self = this;
//     self.matrixRain();
// };
//
//
// LandModulesAbout.prototype.matrixRain = function () {
//     var self = this;
//     var gContext, gWidth, gHeight, gFade, gFont, gFontHeight, gStreams, gY, gYTerm, gFillColor, gYSlow, gYTermSlow,
//         gSlowCycle, gCurrentSlowCycle, gSlowFillColor, gTerminateHeight, gTerminateAddHeight;
//     gFontHeight = 14;
//     gFont = gFontHeight + 'px "Roboto"';
//     gFade = 'rgba(0,0,0, 0.02)';
//     gFillColor = '#0871b6';
//     gSlowFillColor = '#2891d6';
//     gSlowCycle = 2;
//     gCurrentSlowCycle = gSlowCycle;
//     gContext = document.querySelector('#matixRain').getContext('2d');
//
//     var rainWindowResize = function () {
//         gWidth = window.innerWidth;
//         gHeight = window.innerHeight;
//
//         document.querySelector('#matixRain').width = window.innerWidth;
//         document.querySelector('#matixRain').height = window.innerHeight;
//
//         gContext.fillStyle = 'rgba(0,0,0,1)';
//         gContext.fillRect(0, 0, gWidth, gHeight);
//         gStreams = Math.ceil(gWidth / (gFontHeight));
//         gY = [];
//         gYTerm = [];
//         gYSlow = [];
//         gYTermSlow = [];
//         gTerminateHeight = gHeight * 0.3;
//         gTerminateAddHeight = gHeight;
//         var goBoom, goBoomSlow;
//         for (var index = 0; index < gStreams; index++) {
//             gY[index] = 0 - Math.ceil((Math.random() * 150));
//             goBoom = gTerminateHeight + (Math.random() * gTerminateAddHeight);
//             gYTerm[index] = Math.min(goBoom, gHeight);
//             goBoomSlow = gTerminateHeight + (Math.random() * gTerminateAddHeight);
//             gYTermSlow[index] = Math.min(goBoomSlow, gHeight);
//             gYSlow[index] = 0 - Math.ceil((Math.random() * 450));
//         }
//     };
//     // $(window).resize(function() {
//     //     rainWindowResize();
//     // });
//
//     var renderRain = function () {
//         gContext.fillStyle = gFade;
//         gContext.fillRect(0, 0, gWidth, gHeight);
//         gContext.fillStyle = gFillColor;
//         gContext.font = gFont;
//         for (var index = 0; index < gStreams; index++) {
//             var text = String.fromCharCode(33 + Math.random() * 32);
//             var x = index * gFontHeight;
//             var y = gY[index];
//             gContext.fillText(text, x, y);
//             if (y > gYTerm[index]) {
//                 gY[index] = 0 - Math.ceil((Math.random() * 150));
//                 var t = gTerminateHeight + (Math.random() * gTerminateAddHeight);
//                 gYTerm[index] = Math.min(t, gHeight);
//             } else {
//                 gY[index] = y + gFontHeight;
//             }
//         };
//         gCurrentSlowCycle--;
//         if (gCurrentSlowCycle == 0) {
//             gContext.fillStyle = gSlowFillColor;
//             for (index = 0; index < gStreams; index++) {
//                 text = String.fromCharCode(33 + Math.random() * 32);
//                 x = index * gFontHeight;
//                 y = gYSlow[index];
//                 gContext.fillText(text, x, y);
//                 if (y > gYTermSlow[index]) {
//                     gYSlow[index] = 0 - Math.ceil((Math.random() * 70));
//                     var t = gTerminateHeight + (Math.random() * gTerminateAddHeight);
//                     gYTermSlow[index] = Math.min(t, gHeight);
//                 } else {
//                     gYSlow[index] = y + gFontHeight;
//                 }
//             }
//             ;
//             gCurrentSlowCycle = gSlowCycle;
//         }
//         requestAnimationFrame(renderRain);
//     };
//     rainWindowResize();
//     renderRain();
// };
//
//
//
// var landModulesAbout = new LandModulesAbout();
// landModulesAbout.init();
