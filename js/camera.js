        // Component that places model where the ground is clicked
        var isplaced= false;

        AFRAME.registerComponent('tap-place', {
            init: function() {
                const ground = document.getElementById('ground')
                ground.addEventListener('click', event => {
                    // Create new entity for the new object
                    if(!isplaced){
                        const newElement = document.createElement('a-entity')
                            newElement.setAttribute('isplaced','true')
                        
                                     
                     // The raycaster gives a location of the touch in the scene
                    const touchPoint = event.detail.intersection.point
                    newElement.setAttribute('position', touchPoint)
                    newElement.setAttribute('visible', 'false')
                    newElement.setAttribute('scale', '0.3 0.3 0.3')
                    newElement.setAttribute('gltf-model', '#model')
                    this.el.sceneEl.appendChild(newElement)
                    //newElement.addEventListener('model-loaded', () => {
                    } 
                        newElement.setAttribute('visible', 'true')
                        newElement.setAttribute('Animation-mixer',{
                            clip:'model',
                            loop:'once'
                        })
                        })
                //})
            }
            
        })
