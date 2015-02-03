/*  This code is used to save rendered results to local disk with different filtering parameters
    so that we can analyze the result locally.
    ( jing.liu@leiainc.com )

    0. include 'saveRenderings.js' in index.html

    1. Configure renderer to the right settings

        // setup rendering parameter
        renderer = new LeiaWebGLRenderer({
            antialias: true,
        >>> preserveDrawingBuffer: true, <<<
            renderMode: _renderMode,
            shaderMode: _nShaderMode,
            colorMode: _colorMode,
            devicePixelRatio: 1
        });

        // set renderer to absolute display size
        var abs_width  = 1600;
        var abs_height = 1200;
        renderer.Leia_setSize({ width: abs_width, height:abs_height, autoFit:true});


    2. Wrap rendering code with following loops


        setTimeout(function(){  // wait for rendering to be ready
        requestAnimationFrame(animate);
        }, 1000);

        if(!isRendering) {
            return;
        }

        var framesTotal = 59;
        var time = whichCall / framesTotal;

                    // Original Rendering Code
                    renderExample(time);
                    // End Original Rendering Code


        setTimeout(function(){  // wait for rendering to be ready
            whichCall++;
        }, 1000);
        if (whichCall > framesTotal) { isRendering = false };
        saveCanvas("Frame_color_" + ("00" + whichCall).slice(-3));

*/

var whichCall = 0;
var isSaveRenderings = false;
var isRendering = true;

function dataURLtoBlob(dataURL) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURL.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURL.split(',')[1]);
    else
        byteString = unescape(dataURL.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

function saveCanvas(prefix) {

    // var kind = "Clock";
    // var kind = filename;

    var a = document.createElement("a");
    // a.download = prefix + "_" + "a_" + _filterA.toFixed(2) + "_" + 
    //                             "b_" + _filterB.toFixed(2) + "_" + 
    //                             "c_" + _filterC.toFixed(2) + "_" + ".png";

    a.download = prefix + ".png";
    var blob = dataURLtoBlob(renderer.domElement.toDataURL("image/png"));

    // Use the URL object to create a temporary URL
    var url = (window.webkitURL || window.URL).createObjectURL(blob);
    // location.href = url; // <-- Download!

    a.href = url;
    // a.href = canvas.toDataURL("image/png");

    a.click();
}

var isEnd = function updateFilterParameters(count, paras_a, paras_b) {
    
    var dim_a = paras_a.length;
    var dim_b = paras_b.length;

    if (count >= dim_a * dim_b) {  // count starts from 0
        isEnd = true;  
    }
    else {
        // find the correct combination paras_a x paras_b

        var idx_a = count % dim_a;
        var idx_b = Math.floor(count / dim_a);

        _filterA = paras_a[idx_a];
        _filterB = paras_b[idx_b];

        isEnd = false;
    }

    return isEnd;
}


function onDocumentKeyDownTest(event) {
    var keyCode = event.which;
    switch (keyCode) {
        case 65: q += 0.1;  // key 'a'
                 console.log("q: " + q);
                 isRendering = true;
                 break;
        case 68: q -= 0.1;  // key 'd'
                 console.log("q: " + q);
                 isRendering = true;
                 break;

        case 90: _filterB -= 0.1;  // key 'z'
                 console.log("filterB: " + _filterB);
                 isRendering = true;
                 break;
        case 88: _filterB += 0.1;  // key 'x'
                 console.log("filterB: " + _filterB);
                 isRendering = true;
                 break;
        
        case 69: is_animate = !is_animate;  // key 'e'
                 console.log("is_animate: " + is_animate);
                 isRendering = true;
                 break;
        
        case 87: isSaveRenderings = true;    // key 'w'
                 // isRendering = true;
                break;

    }
}