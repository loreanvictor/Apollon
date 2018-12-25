import React from 'react';
import { Point, Size } from '../../geo';
import Element from './../../Element';
import Boundary from '../../geo/Boundary';
import { EditorMode } from '../../../services/EditorService';

class ForkNode extends Element {
  bounds: Boundary = { ...this.bounds, height: 60, width: 20 }

  constructor(public name: string = 'ActionNode', public position: Point, public size: Size) {
    super(name);
  }

  public render(options: any): JSX.Element {
    const { width, height } = this.bounds;

    const { editorMode, hover, interactiveElementIds, interactiveElementsMode, theme, toggleInteractiveElements } = options;

    return (
      <svg id={`class-${this.id}`} width={width} height={height} style={{ overflow: 'visible' }}>
        <rect width="100%" height="100%" fill="none" stroke="none" />
        <rect width={width} height={height} stroke="none" fill={
            editorMode === EditorMode.InteractiveElementsView &&
            (hover ||
              interactiveElementIds.has(this.id))
              ? theme.interactiveAreaColor
              : 'black'
          }
        />
      </svg>
    );
  }
}

export default ForkNode;
