import {
  Matrix3,
  Matrix4,
  Quaternion,
  Vector2,
  Vector3
} from 'three';

const _vec2 = new Vector2();
const _vec2b = new Vector2();
const _vec3 = new Vector3();
const _vec3b = new Vector3();
const _vec3c = new Vector3();
const _mat3 = new Matrix3();
const _mat4 = new Matrix4();
const _mat4b = new Matrix4();
const _quat = new Quaternion();
const _quatb = new Quaternion();
const _axisX = new Vector3(1, 0, 0);
const _axisY = new Vector3(0, 1, 0);

const vec2 = {
  create() {
    return new Float32Array(2);
  },
  set(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
  },
  sub(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  },
  dist(a, b) {
    return Math.hypot(a[0] - b[0], a[1] - b[1]);
  },
  dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  },
  len(a) {
    return Math.hypot(a[0], a[1]);
  },
  normalize(out, a) {
    _vec2.set(a[0], a[1]).normalize();
    out[0] = _vec2.x;
    out[1] = _vec2.y;
    return out;
  },
  scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    return out;
  }
};

const vec3 = {
  create() {
    return new Float32Array(3);
  },
  fromValues(x, y, z) {
    return new Float32Array([x, y, z]);
  },
  set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  },
  copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  },
  add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  },
  sub(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  },
  scale(out, a, scale) {
    out[0] = a[0] * scale;
    out[1] = a[1] * scale;
    out[2] = a[2] * scale;
    return out;
  },
  scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
  },
  normalize(out, a) {
    _vec3.set(a[0], a[1], a[2]).normalize();
    out[0] = _vec3.x;
    out[1] = _vec3.y;
    out[2] = _vec3.z;
    return out;
  },
  dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  },
  cross(out, a, b) {
    _vec3.set(a[0], a[1], a[2]);
    _vec3b.set(b[0], b[1], b[2]);
    _vec3.crossVectors(_vec3, _vec3b);
    out[0] = _vec3.x;
    out[1] = _vec3.y;
    out[2] = _vec3.z;
    return out;
  },
  len(a) {
    return Math.hypot(a[0], a[1], a[2]);
  },
  sqrLen(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
  },
  dist(a, b) {
    return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  },
  sqrDist(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    const dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
  },
  negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  },
  transformMat4(out, a, m) {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    const w = m[3] * x + m[7] * y + m[11] * z + m[15];
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / (w || 1);
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / (w || 1);
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / (w || 1);
    return out;
  },
  transformMat3(out, a, m) {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    out[0] = m[0] * x + m[3] * y + m[6] * z;
    out[1] = m[1] * x + m[4] * y + m[7] * z;
    out[2] = m[2] * x + m[5] * y + m[8] * z;
    return out;
  },
  transformQuat(out, a, q) {
    _vec3.set(a[0], a[1], a[2]);
    _quat.set(q[0], q[1], q[2], q[3]);
    _vec3.applyQuaternion(_quat);
    out[0] = _vec3.x;
    out[1] = _vec3.y;
    out[2] = _vec3.z;
    return out;
  }
};

const mat4 = {
  create() {
    return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  },
  identity(out) {
    out.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    return out;
  },
  copy(out, a) {
    out.set(a);
    return out;
  },
  clone(a) {
    return new Float32Array(a);
  },
  mul(out, a, b) {
    _mat4.fromArray(a);
    _mat4b.fromArray(b);
    _mat4.multiply(_mat4b);
    out.set(_mat4.elements);
    return out;
  },
  translate(out, a, v) {
    _mat4.fromArray(a);
    _vec3.set(v[0], v[1], v[2]);
    _mat4.multiply(_mat4b.makeTranslation(_vec3.x, _vec3.y, _vec3.z));
    out.set(_mat4.elements);
    return out;
  },
  scale(out, a, v) {
    _mat4.fromArray(a);
    _vec3.set(v[0], v[1], v[2]);
    _mat4.multiply(_mat4b.makeScale(_vec3.x, _vec3.y, _vec3.z));
    out.set(_mat4.elements);
    return out;
  },
  rotate(out, a, rad, axis) {
    _mat4.fromArray(a);
    _vec3.set(axis[0], axis[1], axis[2]).normalize();
    _mat4.multiply(_mat4b.makeRotationAxis(_vec3, rad));
    out.set(_mat4.elements);
    return out;
  },
  rotateX(out, a, rad) {
    _mat4.fromArray(a);
    _mat4.multiply(_mat4b.makeRotationX(rad));
    out.set(_mat4.elements);
    return out;
  },
  rotateZ(out, a, rad) {
    _mat4.fromArray(a);
    _mat4.multiply(_mat4b.makeRotationZ(rad));
    out.set(_mat4.elements);
    return out;
  },
  fromQuat(out, q) {
    _quat.set(q[0], q[1], q[2], q[3]);
    _mat4.makeRotationFromQuaternion(_quat);
    out.set(_mat4.elements);
    return out;
  },
  fromRotation(out, rad, axis) {
    _vec3.set(axis[0], axis[1], axis[2]).normalize();
    _mat4.makeRotationAxis(_vec3, rad);
    out.set(_mat4.elements);
    return out;
  },
  invert(out, a) {
    _mat4.fromArray(a);
    _mat4.invert();
    out.set(_mat4.elements);
    return out;
  },
  perspective(out, fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy / 2);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = far ? (far + near) / (near - far) : -1;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far ? (2 * far * near) / (near - far) : -2 * near;
    out[15] = 0;
    return out;
  },
  ortho(out, left, right, bottom, top, near, far) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  },
  lookAt(out, eye, center, up) {
    _vec3.set(eye[0], eye[1], eye[2]);
    _vec3b.set(center[0], center[1], center[2]);
    _vec3c.set(up[0], up[1], up[2]);
    _mat4.lookAt(_vec3, _vec3b, _vec3c);
    out.set(_mat4.elements);
    return out;
  }
};

const mat3 = {
  create() {
    return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  },
  fromMat4(out, a) {
    _mat4.fromArray(a);
    _mat3.setFromMatrix4(_mat4);
    out.set(_mat3.elements);
    return out;
  },
  transpose(out, a) {
    _mat3.fromArray(a);
    _mat3.transpose();
    out.set(_mat3.elements);
    return out;
  },
  normalFromMat4(out, a) {
    _mat4.fromArray(a);
    _mat3.getNormalMatrix(_mat4);
    out.set(_mat3.elements);
    return out;
  }
};

const quat = {
  create() {
    return new Float32Array([0, 0, 0, 1]);
  },
  fromValues(x, y, z, w) {
    return new Float32Array([x, y, z, w]);
  },
  identity(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  },
  normalize(out, q) {
    _quat.set(q[0], q[1], q[2], q[3]).normalize();
    out[0] = _quat.x;
    out[1] = _quat.y;
    out[2] = _quat.z;
    out[3] = _quat.w;
    return out;
  },
  invert(out, q) {
    _quat.set(q[0], q[1], q[2], q[3]).invert();
    out[0] = _quat.x;
    out[1] = _quat.y;
    out[2] = _quat.z;
    out[3] = _quat.w;
    return out;
  },
  conjugate(out, q) {
    out[0] = -q[0];
    out[1] = -q[1];
    out[2] = -q[2];
    out[3] = q[3];
    return out;
  },
  mul(out, a, b) {
    _quat.set(a[0], a[1], a[2], a[3]);
    _quatb.set(b[0], b[1], b[2], b[3]);
    _quat.multiply(_quatb);
    out[0] = _quat.x;
    out[1] = _quat.y;
    out[2] = _quat.z;
    out[3] = _quat.w;
    return out;
  },
  dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  },
  rotateX(out, a, rad) {
    _quat.set(a[0], a[1], a[2], a[3]);
    _quat.multiply(_quatb.setFromAxisAngle(_axisX, rad));
    out[0] = _quat.x;
    out[1] = _quat.y;
    out[2] = _quat.z;
    out[3] = _quat.w;
    return out;
  },
  rotateY(out, a, rad) {
    _quat.set(a[0], a[1], a[2], a[3]);
    _quat.multiply(_quatb.setFromAxisAngle(_axisY, rad));
    out[0] = _quat.x;
    out[1] = _quat.y;
    out[2] = _quat.z;
    out[3] = _quat.w;
    return out;
  },
  setAxisAngle(out, axis, rad) {
    _vec3.set(axis[0], axis[1], axis[2]).normalize();
    _quat.setFromAxisAngle(_vec3, rad);
    out[0] = _quat.x;
    out[1] = _quat.y;
    out[2] = _quat.z;
    out[3] = _quat.w;
    return out;
  },
  slerp(out, a, b, t) {
    _quat.set(a[0], a[1], a[2], a[3]);
    _quatb.set(b[0], b[1], b[2], b[3]);
    _quat.slerp(_quatb, t);
    out[0] = _quat.x;
    out[1] = _quat.y;
    out[2] = _quat.z;
    out[3] = _quat.w;
    return out;
  }
};

export {
  vec2,
  vec3,
  mat3,
  mat4,
  quat
};
