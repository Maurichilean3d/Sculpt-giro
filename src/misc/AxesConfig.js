/**
 * Canonical world axes configuration.
 *
 * SculptGL historically mixes axis conventions across camera/grid/gizmo.
 * This helper defines a single source of truth.
 *
 * Default: Y-up (Unity/Godot style)
 * Optional: Z-up (Blender/3dsMax style) enabled via URL: ?up=z or ?up=blender
 */

import getOptionsURL from 'misc/getOptionsURL';
import { vec3 } from 'gl-matrix';

const _UP_Y = vec3.fromValues(0.0, 1.0, 0.0);
const _UP_Z = vec3.fromValues(0.0, 0.0, 1.0);

export function isZUp() {
  const opts = getOptionsURL();
  const up = (opts.up || '').toString().toLowerCase();
  return up === 'z' || up === 'blender' || up === 'zup';
}

export function getUpVector(out = vec3.create()) {
  vec3.copy(out, isZUp() ? _UP_Z : _UP_Y);
  return out;
}
