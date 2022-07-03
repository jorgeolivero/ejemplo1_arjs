function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

window.onload = () => {

    let sendData

    axios.get('http://localhost:80/api/gaming/prizes/ar', {

                headers: {
                  cli: 'Web',
                  uid: '36',
                  companyId: '946',
                  dataListPrizesArAround: 'true',
                  longitude: '0',
                  latitude: '0',
                  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjM2LCJuYW1lIjoiSmhvbiBSYW1vcyIsImlhdCI6MTY1NjYwMzc1MX0.J5mzfCQX-M2iNj6gou877-sR7hUtc_d8eZY0JVsM03E'
                  
                }})
         .then(resp => {

            let dataPrizesAr = resp.data
            sendData = dataPrizesAr

          return res.status(200).json(sendData);

          })
         .catch(error => error)

    let testEntitiesAdded = false;
    //alert('If testing the lat/lon manual input on a mobile device, please turn off your GPS to avoid the real location being detected.');
    const el = document.querySelector("[gps-new-camera]");
    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntitiesAdded) {
            //alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            
            // Add four boxes to the north (red), south (yellow), west (blue)
            // and east (red) of the initial GPS position
            const properties = [{
                    color: 'red',
                    latDis: 0.001,
                    lonDis: 0
                },{
                    color: 'yellow',
                    latDis: -0.001,
                    lonDis: 0
                },{
                    color: 'blue',
                    latDis: 0,
                    lonDis: -0.001
                },{
                    color: 'green',
                    latDis: 0,
                    lonDis: 0.001
                }
            ];
            for(const prop of properties) {
                // console.log('lat -->',  e.detail.position.latitude + prop.latDis)
                // console.log('lon -->', e.detail.position.longitude + prop.lonDis)
                //const entity = document.createElement("a-box");
                const entity = document.createElement("a-entity");
                entity.setAttribute("scale", {
                    x: 20, 
                    y: 20,
                    z: 20
                });
                entity.setAttribute("rotation", {
                    x: 0, 
                    y: 45,
                    z: 0
                });
                //entity.setAttribute('material', { color: prop.color } );
                entity.setAttribute('gltf-model', './models/platoComida.glb');
                entity.setAttribute('gps-new-entity-place', {
                    latitude: e.detail.position.latitude + prop.latDis,
                    longitude: e.detail.position.longitude + prop.lonDis
                });
                
                document.querySelector("a-scene").appendChild(entity);
            }

            testEntitiesAdded = true;

            // if(testEntitiesAdded) {

            //     const entity = document.createElement("a-entity");

            //     entity.setAttribute("scale", {
            //         x: 20, 
            //         y: 20,
            //         z: 20
            //     });
            //     entity.setAttribute("rotation", {
            //         x: 0, 
            //         y: 0,
            //         z: 0
            //     });
            //     entity.setAttribute('gltf-model', './models/platoComida.glb');
            //     entity.setAttribute('gps-new-entity-place', {
            //         latitude: e.detail.position.latitude + randomNumber(-0.001, 0.001),
            //         longitude: e.detail.position.longitude - randomNumber(-0.001, 0.001)
            //     });
            //     entity.setAttribute('animation-mixer', '');
            //     document.querySelector("a-scene").appendChild(entity);

            //     const entity2 = document.createElement("a-entity");
            //     entity2.setAttribute("scale", {
            //         x: 20, 
            //         y: 20,
            //         z: 20
            //     });
            //     entity2.setAttribute("rotation", {
            //         x: 0, 
            //         y: 180,
            //         z: 0
            //     });
            //     entity2.setAttribute('gltf-model', './models/magnemite.glb');
            //     entity2.setAttribute('gps-new-entity-place', {
            //         latitude: e.detail.position.latitude + randomNumber(-0.001, 0.001),
            //         longitude: e.detail.position.longitude - randomNumber(-0.001, 0.001)
            //     });
            //     entity2.setAttribute('animation-mixer', '');

            //     document.querySelector("a-scene").appendChild(entity2);

            // }

        }
    });

    document.getElementById("go").addEventListener("click", e=> {
        const lat = document.getElementById('lat').value;
        const lon = document.getElementById('lon').value;
        const minacc = document.getElementById('minacc').value;

        el.setAttribute('gps-new-camera', { simulateLatitude: lat, simulateLongitude: lon, positionMinAccuracy: minacc } );
    });
};