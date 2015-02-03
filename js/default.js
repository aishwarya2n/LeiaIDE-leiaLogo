 var windowWidth = window.innerWidth,
     windowHeight = window.innerHeight;
 var camera, renderer, scene;
 var _filterA = 1.0;
var _filterB = 2.0;
var _filterC = 3.0;
var mesh;
var j=0;
var blendshapes;
var newMeshReady = false;
var t0 = Date.now()*0.001;
var sizeMesh = 30;
var transition = 0;
var mesh1;
var mesh2;
var group1;
var group2;
var mesh;
var square;
b=0;
var meshArray = [];
var t1 = 0;
var t = 0;
var f1 = 'resource/LEIAPart1.stl'; 
var f2 = 'resource/LEIAPart2.stl';
var rotObjectMatrix; 
//var t = Date.now()*0.001;
 head.ready(function() {
     Init();
     readSTLs(f1, f2);
     animate();
 });

 function Init() {
     scene = new THREE.Scene();
     group1 = new THREE.Object3D();
     group2 = new THREE.Object3D();

     scene.add(group1);
     scene.add(group2);

     //setup camera
     camera = new LeiaCamera({
         cameraPosition: new THREE.Vector3(_camPosition.x, _camPosition.y, _camPosition.z),
         targetPosition: new THREE.Vector3(_tarPosition.x, _tarPosition.y, _tarPosition.z)
     });
     scene.add(camera);


     //setup rendering parameter
     renderer = new LeiaWebGLRenderer({
         antialias: true,
         renderMode: _renderMode,
         shaderMode: _nShaderMode,
         colorMode: _colorMode,
        compFac:_depthCompressionFactor,
         devicePixelRatio: 1
     });
        
     renderer.Leia_setSize({
         width:windowWidth, height:windowHeight,
         autoFit: true
     });
     renderer.shadowMapEnabled = true;
     renderer.shadowMapSoft = true;
     document.body.appendChild(renderer.domElement);


     //add Light
     addLights();

     //add Gyro Monitor
     //addGyroMonitor();
 }

 ///////////////////////Leia Diamond Logo////////////////////////////////////////////////////////////////

 function animate() {
     requestAnimationFrame(animate);

     if (false === newMeshReady) {
         return;
     }
        //setTimeout(function(){  // wait for rendering to be ready
        //requestAnimationFrame(animate);
        //}, 1000);
 var blub = 'not Rendering';
 if (isRendering) blub = 'is Rendering';

        if(!isRendering) {
            return;
        }
        var framesTotal = 48;
        var time = whichCall / framesTotal;

                   if(t1<=Math.PI/2)
                   {
                           
                       //group1.rotation.x = (Math.PI/2) * 0.25 * time;
                      // group1.rotation.x = Math.PI/2 * 0.25 * LEIA.time;
                      //  t1 = Math.PI/2 * 0.25 * LEIA.time;
                      group1.rotation.x = Math.PI/2  * time * 2;
                      t1 = Math.PI/2 * time * 2;
                   }             
                    
                     //  group2.rotation.z = Math.PI/2 * 2 * LEIA.time;
                      group2.rotation.y = Math.PI * time * 2;

  
                         renderer.setClearColor(new THREE.Color().setRGB(0.0, 0.0, 0.0));
                          //renderer.setClearColor(0xffffff, 1);
                            renderer.Leia_render({
                            scene: scene,
                            camera: camera,
                            holoScreenSize: _holoScreenSize,
                            holoCamFov: _camFov,
                            upclip: _up,
                            downclip: _down,
                            filterA: _filterA,
                            filterB: _filterB,
                            filterC: _filterC,
                            messageFlag: _messageFlag
                        });
                            
                            t++;
                        setTimeout(function(){  // wait for rendering to be ready
                            whichCall++;
                        }, 1000);
                        if (whichCall > framesTotal) { isRendering = false };
                      //  saveCanvas("Leia_ScreenLogo" + ("00" + whichCall).slice(-3));


    }   
 
       
 

function readSTLs(filename1, filename2) 
{
    var dx;
    var dy;
    var dz;
    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function () {
    if ( xhr1.readyState == 4 ) {
        if ( xhr1.status == 200 || xhr1.status == 0 ) {
            var rep = xhr1.response; // || xhr1.mozResponseArrayBuffer;
            mesh1 = parseStlBinary(rep);
            mesh1.scale.set(50, 50, 50);
            mesh1.rotation.set(-Math.PI/2,0,0);
            mesh1.position.set(0,1,0.5);
            mesh1.geometry.computeBoundingBox();
            dx = mesh1.geometry.boundingBox.max.x - mesh1.geometry.boundingBox.min.x;
            dy = mesh1.geometry.boundingBox.max.y - mesh1.geometry.boundingBox.min.y;
            dz = mesh1.geometry.boundingBox.max.z - mesh1.geometry.boundingBox.min.z;
            //mesh1.position.set(-0.5*dx-5.4, -0.5*dy+0.4, -0.5*dz);
            console.log(dx);
            console.log(dy);
            console.log(dz);
            mesh1.position.set(-dx, -dy, dz*0.5);
            //group1.position.set(10,0,0);
            group1.add(mesh1);
           
            
            }
        }
    }
    xhr1.onerror = function(e) {
        console.log(e);
    }
    xhr1.open( "GET", filename1, true );
    xhr1.responseType = "arraybuffer";
    xhr1.send( null );

            

    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function () {
    if ( xhr2.readyState == 4 ) {
        if ( xhr2.status == 200 || xhr2.status == 0 ) {
            var rep = xhr2.response; // || xhr2.mozResponseArrayBuffer;
            mesh2 = parseStlBinary(rep);
            mesh2.scale.set(28, 28, 28);
            //mesh2.position.set(40,0,50);

            console.log(dx1);
            console.log(dy1);
            console.log(dz1);

            //mesh2.position.set(-0.5*dx+2.7, -0.5*dy+0, -0.5*dz);
            

            mesh2.geometry.computeBoundingBox();
            var dx1 = mesh2.geometry.boundingBox.max.x - mesh2.geometry.boundingBox.min.x;
            var dy1 = mesh2.geometry.boundingBox.max.y - mesh2.geometry.boundingBox.min.y;
            var dz1 = mesh2.geometry.boundingBox.max.z - mesh2.geometry.boundingBox.min.z;

          //mesh2.geometry.boundingBox.rotateAroundObjectAxis(mesh2, new THREE.Vector3(1,0,0),30 * Math.PI/180);
            
            group2.add(mesh2);
            group2.position.set(5.7,0,0);
            
            }
        }
    }
    xhr2.onerror = function(e) {
        console.log(e);
    }
    xhr2.open( "GET", filename2, true );
    xhr2.responseType = "arraybuffer";
    xhr2.send( null );

    newMeshReady=true;
}

 
     //  LEIA_setBackgroundPlane('resource/brickwall_900x600_small.jpg');
 

 function addLights() {
     //Add Lights Here
     var light = new THREE.SpotLight(0xffffff);
     //light.color.setHSL( Math.random(), 1, 0.5 );
     //light.position.set(180, 100, 200);
     light.position.set(0,100,200);
     light.shadowCameraVisible = false;
     light.castShadow = true;
     light.shadowMapWidth = light.shadowMapHeight = 256;
     light.shadowDarkness = 0.7;
     scene.add(light);

     var ambientLight = new THREE.AmbientLight(0x222222);
     scene.add(ambientLight);
 }

 
 

 /*function LEIA_setBackgroundPlane(filename, aspect) {
     var foregroundPlaneTexture = new THREE.ImageUtils.loadTexture(filename);
     foregroundPlaneTexture.wrapS = foregroundPlaneTexture.wrapT = THREE.RepeatWrapping;
     foregroundPlaneTexture.repeat.set(1, 1);

     //
     var planeMaterial = new THREE.MeshPhongMaterial({
         map: foregroundPlaneTexture,
         color: 0xffdd99
     });
     var planeGeometry = new THREE.PlaneGeometry(80, 60, 10, 10);
     plane = new THREE.Mesh(planeGeometry, planeMaterial);
     plane.position.z = -6;
     plane.castShadow = false;
     plane.receiveShadow = true;
     scene.add(plane);
 }*/