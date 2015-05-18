'use strict';
import * as config from './config'
import * as tensor from './tensor/tensor'
import * as full from './tensor/full'

export class Tile {
  constructor(type = Vacuum, rotation = 0, frozen = true, i = 0, j = 0) {
    this.type = type;
    this.rotation = rotation;
    this.frozen = frozen;
    this.i = i;
    this.j = j;
  }
  get x() {
    return config.tileSize * this.i;
  }
  get y() {
    return config.tileSize * this.j;
  }
}

export const Vacuum = {
  name: 'vacuum',
  maxRotation: 1,
  rotationAngle: 0,
  transition: () => full.identity
};

export const Source = {
  name: 'source',
  maxRotation: 4, // > ^ < v
  rotationAngle: 90,
  transition: () => full.zero
};

export const CornerCube = {
  name: 'corner-cube',
  maxRotation: 1,
  rotationAngle: 0,
  transition: (rotation) => full.cornerCube[rotation]
};

export const ThinMirror = {
  name: 'thin-mirror',
  maxRotation: 4, // - / | \
  rotationAngle: 45,
  transition: (rotation) => full.thinMirror[rotation]
};

export const ThinSplitter = {
  name: 'thin-splitter',
  maxRotation: 4, // - / | \
  rotationAngle: 45,
  transition: (rotation) => full.thinSplitter[rotation]
};

export const PolarizingSplitter = {
  name: 'polarizing-splitter',
  maxRotation: 2, // / \
  rotationAngle: 90,
  transition: (rotation) => full.polarizingSplitter[rotation]
};
