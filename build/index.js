function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

window.onload = () => {

    let properties = []

    axios.get('https://as-siteit-pru.azurewebsites.net/api/gaming/prizes/ar', {

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

            let { data } = resp.data

            properties = data.list_prizes_ar
            //console.log(properties)

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
            // const properties = [{
            //         color: 'red',
            //         latDis: 0.001,
            //         lonDis: 0
            //     },{
            //         color: 'yellow',
            //         latDis: -0.001,
            //         lonDis: 0
            //     },{
            //         color: 'blue',
            //         latDis: 0,
            //         lonDis: -0.001
            //     },{
            //         color: 'green',
            //         latDis: 0,
            //         lonDis: 0.001
            //     }
            // ];


            for(const prop of properties) {
                //console.log('prop -->', prop)
                // console.log('lat -->',  e.detail.position.latitude + prop.latDis)
                // console.log('lon -->', e.detail.position.longitude + prop.lonDis)
                //const entity = document.createElement("a-box");

                if(prop.active) {
                
                    const entity = document.createElement("a-entity");
                    entity.setAttribute("scale", {
                        x: 70, 
                        y: 70,
                        z: 70
                    });
                    entity.setAttribute("rotation", {
                        x: 0, 
                        y: 0,
                        z: 0
                    });
                    //entity.setAttribute('material', { color: prop.color } );
                    //entity.setAttribute('gltf-model', './models/platoComida.glb');
                    entity.setAttribute('gltf-model', prop.url3d);
                    entity.setAttribute('gps-new-entity-place', {
                        latitude: e.detail.position.latitude + randomNumber(-0.001, 0.001),
                        longitude: e.detail.position.longitude + randomNumber(-0.001, 0.001)
                    });

                    entity.setAttribute('capturar', '');

                    let myClass = prop.id
                    entity.classList.add(myClass)

                    // console.log('lat -->',  e.detail.position.latitude + randomNumber(-0.001, 0.001))
                    // console.log('lon -->', e.detail.position.longitude + randomNumber(-0.001, 0.001))

                    // lat --> 51.049
                    // lon --> -0.723

                    // lat --> 51.04842219719763
                    // lon --> -0.7223856819363367

                    document.querySelector("a-scene").appendChild(entity);


                }else{
                    console.log('prop.active -->', prop.active)
                }
            }

            AFRAME.registerComponent('capturar', {
                init: function () {
                // This will be called after the entity has properly attached and loaded.
                console.log('I am ready!');

                this.el.addEventListener('click',  (e) => {   

                        console.log('Hi, George', e.target.className)

                        let dataBody = {
                    
                            id: parseInt(e.target.className),
                            state_id: 1,
                            date_captured: "1656944674"

                        }

                        axios.patch('https://as-siteit-pru.azurewebsites.net/api/gaming/prizes/ar', dataBody, {

                                    headers: {

                                        cli: 'Web',
                                        uid: '770',
                                        companyId: '946',
                                        dataCapturePrizeArAround: 'true',
                                        longitude: '0',
                                        latitude: '0',
                                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjc3MCwibmFtZSI6IkFkaWRhcyIsImlhdCI6MTY1Njk2MTc1NH0.M__ntC_cKkDol59JNdLGhHRe-yY588IqK_Nfptaxc0Q'
                                    
                                    }
                                })
                            .then(resp => {

                                console.log('resp -->', resp.data)

                                alert(resp.data.message)

                            })
                            .catch(error => error)

                    })

                }


            })

            testEntitiesAdded = true;

        }

    });

    document.getElementById("go").addEventListener("click", e => {

        const lat = document.getElementById('lat').value;
        const lon = document.getElementById('lon').value;
        const minacc = document.getElementById('minacc').value;

        el.setAttribute('gps-new-camera', { simulateLatitude: lat, simulateLongitude: lon, positionMinAccuracy: minacc } );
    });
};