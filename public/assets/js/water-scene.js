import * as THREE from './vendor/three.module.min.js';

// Local geometry and studio reflections keep the water independent of external assets.
export function createWater(scene, { mobile = false, reduced = false, onSplash = () => {}, onPhase = () => {} } = {}) {
    const group = new THREE.Group();
    group.name = 'Water splash';
    scene.add(group);
    const level = -1.28;
    const maxDrops = mobile ? 44 : 76;
    let quiet = reduced, serial = 0, lastTime = 0, nextSplash = 3.2, previousPhase = '';
    let drops = [], ripples = [], crownStart = -10, crownX = 0, crownZ = 1.1;
    const water = new THREE.MeshPhysicalMaterial({
        color: '#d6f4fa', metalness: 0, roughness: .035, transmission: .97,
        ior: 1.333, thickness: .14, clearcoat: 1, clearcoatRoughness: .03,
        envMapIntensity: 1.65, attenuationColor: new THREE.Color('#91d9ed'), attenuationDistance: 3.5,
        side: THREE.DoubleSide
    });

    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = maskCanvas.height = 128;
    const context = maskCanvas.getContext('2d');
    const gradient = context.createRadialGradient(64,64,12,64,64,64);
    gradient.addColorStop(0,'#ffffff'); gradient.addColorStop(.7,'#a0a0a0'); gradient.addColorStop(1,'#000000');
    context.fillStyle = gradient; context.fillRect(0,0,128,128);
    const alphaMap = new THREE.CanvasTexture(maskCanvas);

    const poolGeometry = new THREE.RingGeometry(.025, 2.7, mobile ? 56 : 80, mobile ? 14 : 20);
    poolGeometry.rotateX(-Math.PI/2);
    const poolBase = poolGeometry.attributes.position.array.slice();
    const poolMaterial = water.clone();
    poolMaterial.transparent = true;
    poolMaterial.opacity = .73;
    poolMaterial.depthWrite = false;
    poolMaterial.alphaMap = alphaMap;
    const pool = new THREE.Mesh(poolGeometry,poolMaterial);
    pool.position.set(0,level,.35);
    group.add(pool);

    const segments = mobile ? 48 : 72, rows = 11;
    const crownGeometry = new THREE.BufferGeometry();
    const crownPositions = new Float32Array((segments+1)*(rows+1)*3);
    const indices = [];
    for (let row=0; row<rows; row++) for (let segment=0; segment<segments; segment++) {
        const a=row*(segments+1)+segment,b=a+segments+1;
        indices.push(a,b,a+1,b,b+1,a+1);
    }
    crownGeometry.setAttribute('position',new THREE.BufferAttribute(crownPositions,3));
    crownGeometry.setIndex(indices);
    const crownMaterial = water.clone();
    crownMaterial.thickness = .085;
    crownMaterial.envMapIntensity = 1.35;
    const crown = new THREE.Mesh(crownGeometry,crownMaterial);
    crown.frustumCulled = false;
    group.add(crown);
    const rimGeometry = new THREE.BufferGeometry();
    const rimPositions = new Float32Array(segments*3);
    rimGeometry.setAttribute('position',new THREE.BufferAttribute(rimPositions,3));
    const rim = new THREE.LineLoop(rimGeometry,new THREE.LineBasicMaterial({color:'#d9f7ff',transparent:true,opacity:.52}));
    rim.frustumCulled = false;
    group.add(rim);

    const droplets = new THREE.InstancedMesh(new THREE.SphereGeometry(1,10,8),water.clone(),maxDrops);
    droplets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    droplets.frustumCulled = false;
    droplets.count = 0;
    group.add(droplets);
    const temporary = new THREE.Object3D(), direction = new THREE.Vector3(), up = new THREE.Vector3(0,1,0);
    const ringGeometry = new THREE.RingGeometry(.987,1.012,80);
    ringGeometry.rotateX(-Math.PI/2);
    const rings = Array.from({length:mobile?5:8},() => {
        const mesh = new THREE.Mesh(ringGeometry,new THREE.MeshBasicMaterial({color:'#b2eaff',transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));
        mesh.visible = false; group.add(mesh); return mesh;
    });
    const random = value => { const result = Math.sin(value*127.13+serial*43.7)*43758.5453; return result-Math.floor(result); };

    function splash(x=0,z=1.1,time=lastTime,strength=1) {
        serial++;
        crownStart=time; crownX=THREE.MathUtils.clamp(x,-1.5,1.5); crownZ=THREE.MathUtils.clamp(z,-.2,1.45);
        const count=mobile?30:48;
        if (!quiet) for (let index=0; index<count; index++) {
            const angle=index/count*Math.PI*2+random(index+2)*.25;
            const radial=.3+random(index+4)*.45;
            const speed=(1+random(index+9)*1.6)*strength;
            drops.push({x:crownX+Math.cos(angle)*radial,z:crownZ+Math.sin(angle)*radial,
                vx:Math.cos(angle)*speed,vz:Math.sin(angle)*speed,
                vy:(4.2+random(index+6)*3.2)*Math.sqrt(strength),
                radius:.035+random(index+12)*.065,start:time+random(index+15)*.13});
        }
        drops=drops.slice(-maxDrops);
        for (let index=0; index<3; index++) ripples.push({x:crownX,z:crownZ,start:time+index*.15});
        ripples=ripples.slice(-rings.length);
        nextSplash=time+3.2;
        onSplash(serial);
    }

    function update(time) {
        lastTime=time;
        if (!quiet && time>=nextSplash) splash(Math.sin(time*.65)*.5,1.1,time,.95);
        const positions=poolGeometry.attributes.position;
        for (let index=0; index<positions.count; index++) {
            const x=poolBase[index*3],z=poolBase[index*3+2],radius=Math.hypot(x,z);
            let wave=quiet?0:Math.sin(x*3.7+time*1.3)*Math.cos(z*3-time*.9)*.022;
            if (!quiet) for (const ripple of ripples) {
                const age=time-ripple.start, distance=Math.hypot(x-ripple.x,z-ripple.z);
                if (age>=0 && age<2.3) wave+=Math.sin(distance*10-age*11)*.028*Math.exp(-Math.pow(distance-age*1.7,2)*3)*Math.exp(-age);
            }
            positions.setY(index,wave*Math.max(0,1-radius/3));
        }
        positions.needsUpdate=true; poolGeometry.computeVertexNormals();

        const age=quiet ? .6 : time-crownStart;
        const currentPhase=quiet?'still':age<0||age>=1.65?'idle':age<.55?'rising':age<1.05?'crest':'settling';
        if(currentPhase!==previousPhase){ previousPhase=currentPhase;onPhase(currentPhase); }
        const alive=quiet || (age>=0 && age<1.65);
        crown.visible=alive; rim.visible=alive;
        if (alive) {
            const phase=Math.max(0,Math.min(1,age/1.65));
            const height=quiet ? .18 : Math.sin(phase*Math.PI)*1.45*Math.exp(-phase*.25);
            const outer=1+phase*.9;
            for (let row=0; row<=rows; row++) for (let segment=0; segment<=segments; segment++) {
                const angle=segment/segments*Math.PI*2, v=row/rows;
                const finger=1+.18*Math.sin(angle*5+serial*.7)+.13*Math.sin(angle*11-serial)+.06*Math.sin(angle*17+phase*3);
                const radius=.12+v*outer+.07*Math.sin(angle*7+phase*8)*v*v;
                const x=crownX+Math.cos(angle)*radius;
                const y=level+height*Math.pow(v,2.2)*finger+.012;
                const z=crownZ+Math.sin(angle)*radius;
                const offset=(row*(segments+1)+segment)*3;
                crownPositions[offset]=x; crownPositions[offset+1]=y; crownPositions[offset+2]=z;
                if (row===rows && segment<segments) { rimPositions[segment*3]=x; rimPositions[segment*3+1]=y+.004; rimPositions[segment*3+2]=z; }
            }
            crownGeometry.attributes.position.needsUpdate=true; crownGeometry.computeVertexNormals();
            rimGeometry.attributes.position.needsUpdate=true;
            rim.material.opacity=quiet?.16:Math.max(0,.6*Math.sin(phase*Math.PI));
        }

        let visible=0;
        drops=drops.filter(drop => {
            const age=time-drop.start;
            if (age<0) return true;
            const y=level+.08+drop.vy*age-4.3*age*age;
            if (y<level-.03 || age>2.2) return false;
            temporary.position.set(drop.x+drop.vx*age,y,drop.z+drop.vz*age);
            direction.set(drop.vx,drop.vy-8.6*age,drop.vz).normalize();
            temporary.quaternion.setFromUnitVectors(up,direction);
            temporary.scale.set(drop.radius*.75,drop.radius*(1.25+Math.abs(drop.vy-8.6*age)*.08),drop.radius*.75);
            temporary.updateMatrix(); droplets.setMatrixAt(visible++,temporary.matrix);
            return true;
        });
        droplets.count=visible; droplets.instanceMatrix.needsUpdate=true;
        rings.forEach((ring,index) => {
            const ripple=ripples[index];
            const age=ripple?time-ripple.start:-1;
            ring.visible=!quiet && age>=0 && age<2.2;
            if (!ring.visible) return;
            const radius=.15+age*1.65;
            ring.position.set(ripple.x,level+.035,ripple.z);
            ring.scale.setScalar(radius);
            ring.material.opacity=Math.sin(age/2.2*Math.PI)*.34;
        });
    }

    function setReduced(value) { quiet=value; if (quiet) { drops=[]; droplets.count=0; } }
    function dispose() {
        const geometries=new Set(),materials=new Set();
        group.traverse(object => {
            if (object.geometry) geometries.add(object.geometry);
            if (object.material) materials.add(object.material);
            if (object.isInstancedMesh) object.dispose();
        });
        geometries.forEach(geometry=>geometry.dispose()); materials.forEach(material=>material.dispose());
        alphaMap.dispose(); water.dispose(); scene.remove(group);
    }
    splash(0,1.1,0,.95);
    return {group,splash,update,setReduced,dispose};
}
