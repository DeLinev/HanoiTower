import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

/** Radians per second of orbit rotation. */
const ORBIT_SPEED = 1.5;
/** World units per second of panning. */
const PAN_SPEED = 15;
/** Units per second for dolly zoom (distance change). */
const ZOOM_SPEED = 20;

const _spherical = new THREE.Spherical();
const _offset = new THREE.Vector3();
const _panOffset = new THREE.Vector3();
const _camRight = new THREE.Vector3();
const _camUp = new THREE.Vector3();
const _camFwd = new THREE.Vector3();

export function KeyboardControls({
    controlsRef,
}: {
    controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
    const { camera } = useThree();
    const keys = useRef(new Set<string>());

    useEffect(() => {
        const onDown = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement)?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;
            keys.current.add(e.key.toLowerCase());
        };
        const onUp = (e: KeyboardEvent) => {
            keys.current.delete(e.key.toLowerCase());
        };
        const onBlur = () => {
            keys.current.clear();
        };

        window.addEventListener("keydown", onDown);
        window.addEventListener("keyup", onUp);
        window.addEventListener("blur", onBlur);
        return () => {
            window.removeEventListener("keydown", onDown);
            window.removeEventListener("keyup", onUp);
            window.removeEventListener("blur", onBlur);
        };
    }, []);

    useFrame((_, delta) => {
        const controls = controlsRef.current;
        if (!controls || keys.current.size === 0) return;

        const k = keys.current;
        const orbitDelta = ORBIT_SPEED * delta;
        const panDelta = PAN_SPEED * delta;
        const zoomDelta = ZOOM_SPEED * delta;

        const hasOrbit =
            k.has("a") ||
            k.has("d") ||
            k.has("w") ||
            k.has("s");

        if (hasOrbit) {
            _offset.copy(camera.position).sub(controls.target);
            _spherical.setFromVector3(_offset);

            if (k.has("a"))  _spherical.theta += orbitDelta;
            if (k.has("d")) _spherical.theta -= orbitDelta;

            if (k.has("w"))    _spherical.phi -= orbitDelta;
            if (k.has("s"))  _spherical.phi += orbitDelta;

            // Clamp polar angle to OrbitControls' constraints.
            const EPS = 0.001;
            _spherical.phi = Math.max(
                controls.minPolarAngle + EPS,
                Math.min(controls.maxPolarAngle - EPS, _spherical.phi),
            );

            _spherical.makeSafe();
            _offset.setFromSpherical(_spherical);
            camera.position.copy(controls.target).add(_offset);
        }

        const hasPan = k.has("q") || k.has("e") || k.has("z") || k.has("x");

        if (hasPan) {
            camera.matrixWorld.extractBasis(_camRight, _camUp, _camFwd);

            _panOffset.set(0, 0, 0);
            if (k.has("q")) _panOffset.addScaledVector(_camRight, -panDelta);
            if (k.has("e")) _panOffset.addScaledVector(_camRight, panDelta);
            if (k.has("z")) _panOffset.addScaledVector(_camUp, -panDelta);
            if (k.has("x")) _panOffset.addScaledVector(_camUp, panDelta);

            controls.target.add(_panOffset);
            camera.position.add(_panOffset);
        }

        const hasZoom = k.has("=") || k.has("+") || k.has("-") || k.has("_");

        if (hasZoom) {
            _offset.copy(camera.position).sub(controls.target);
            const currentDist = _offset.length();

            if ((k.has("=") || k.has("+")) && currentDist > controls.minDistance) {
                // Zoom in: move camera closer to target
                const newDist = Math.max(controls.minDistance, currentDist - zoomDelta);
                _offset.normalize().multiplyScalar(newDist);
                camera.position.copy(controls.target).add(_offset);
            }

            if ((k.has("-") || k.has("_")) && currentDist < controls.maxDistance) {
                // Zoom out: move camera further from target
                const newDist = Math.min(controls.maxDistance, currentDist + zoomDelta);
                _offset.normalize().multiplyScalar(newDist);
                camera.position.copy(controls.target).add(_offset);
            }
        }

        // Tell OrbitControls to reconcile its internal spherical
        // state with the new camera position we just set.
        if (hasOrbit || hasPan || hasZoom) {
            controls.update();
        }
    });

    return null;
}
