
var isplaced = false;
var arCamera = document.getElementById('aCamera');
//var scene = document.querySelector('a-scene');
// Component that places model where the ground is clicked
//window.AFRAME.registerComponent('xrweb', XR8.AFrame.xrwebComponent())
AFRAME.registerComponent('tap-place', {
    init: function () {
        const ground = document.getElementById('ground')
        ground.addEventListener('click', event => {
            // Create new entity for the new object
            if (!isplaced) {
                isplaced = true;
                const newElement = document.createElement('a-entity')
               
                // The raycaster gives a location of the touch in the scene
                const touchPoint = event.detail.intersection.point
                newElement.setAttribute('position', touchPoint)
                //const randomYRotation = Math.random() * 360
                newElement.setAttribute('visible', 'false')
                newElement.setAttribute('scale', '0.3 0.3 0.3')
                newElement.setAttribute('id','modelID')
                newElement.setAttribute('gltf-model', '#model')
                 const xrweb = document.getElementsByTagName('a-scene')
                console.log(document.getElementsByTagName('a-scene')[0].attributes)
                this.el.sceneEl.appendChild(newElement)
                newElement.addEventListener('model-loaded', () => {
                    newElement.setAttribute('visible', 'true')
                    this.el.setTimeout(() =>{
                        newElement.setAttribute('Animation-mixer', {
                            clip: 'model'
                        },5000)
                    })
                    
                });
            }
        })
    }
});

AFRAME.registerComponent('two-finger-spin', {
    schema: {
      factor: {default: 5}
    },
    init: function() {
      this.handleEvent = this.handleEvent.bind(this)
      this.el.sceneEl.addEventListener('twofingermove', this.handleEvent)
    },
    remove: function() {
      this.el.sceneEl.removeEventListener('twofingermove', this.handleEvent)
    },
    handleEvent: function(event) {
        var gltfModel;
        
        if (isplaced) {
            gltfModel = document.getElementById('modelID');
        }
      gltfModel.object3D.rotation.y += event.detail.positionChange.x * this.data.factor
    }
  });


  AFRAME.registerComponent('pinch-scale', {
    schema: {
        min: { default: 0.3 },
        max: { default: 8}
    },

    init: function () {
        this.initialScale = this.el.object3D.scale.clone()
        this.scaleFactor = 1
        this.handleEvent = this.handleEvent.bind(this)
        this.el.sceneEl.addEventListener('twofingermove', this.handleEvent)
    },

    remove: function () {
        this.el.sceneEl.removeEventListener('twofingermove', this.handleEvent)
    },

    handleEvent: function (event) {
        this.scaleFactor *= 1 + event.detail.spreadChange / event.detail.startSpread;
        this.scaleFactor = Math.min(Math.max(this.scaleFactor, this.data.min), this.data.max);
        var gltfModel;
        if (isplaced) {
            gltfModel = document.getElementById('modelID');
        }

        gltfModel.object3D.scale.x = this.scaleFactor * this.initialScale.x;
        gltfModel.object3D.scale.y = this.scaleFactor * this.initialScale.y;
        gltfModel.object3D.scale.z = this.scaleFactor * this.initialScale.z;
    }
});
