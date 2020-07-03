        // Component that places model where the ground is clicked
        //var arCamera = document.getElementById('aCamera');
        AFRAME.registerComponent('tap-place', {
            init: function() {
                const ground = document.getElementById('ground')
                ground.addEventListener('click', event => {
                    // Create new entity for the new object
                    const newElement = document.createElement('a-entity')
                    // The raycaster gives a location of the touch in the scene
                    const touchPoint = event.detail.intersection.point
                    newElement.setAttribute('position', touchPoint)
                    //const randomYRotation = Math.random() * 360
                   // newElement.setAttribute('rotation', arCamera.components.rotation);
                    newElement.setAttribute('visible', 'false')
                    newElement.setAttribute('scale', '0.3 0.3 0.3')
                    newElement.setAttribute('gltf-model', '#Catapult')
                    this.el.sceneEl.appendChild(newElement)
                    newElement.addEventListener('model-loaded', () => {
                        newElement.setAttribute('visible', 'true')
                        //console.log('hi');
                        newElement.setAttribute('animation', {
                          /*property: 'scale',
                            to: '0.6 0.6 0.6',
                            easing: 'easeOutElastic',
                           dur: 800,
                            property:'rotation',
                            to:'45 45 45',
                            loop:'true',
                         dur:'29000'*/
                          })
                    })
                })
            }
        })
