import React, { FunctionComponent } from 'react';
import { Multiline } from '../../../utils/svg/multiline';
import { UMLActivityActionNode } from './uml-activity-action-node';
import { ThemedRect } from '../../../components/theme/themedComponents';

export const UMLActivityActionNodeComponent: FunctionComponent<Props> = ({ element, scale, fillColor }) => (
  <g>
    <ThemedRect
      rx={10 * scale}
      ry={10 * scale}
      width="100%"
      height="100%"
      strokeColor={element.strokeColor}
      fillColor={fillColor || element.fillColor}
    />
    <Multiline
      x={element.bounds.width / 2}
      y={element.bounds.height / 2}
      width={element.bounds.width}
      height={element.bounds.height}
      fontWeight="bold"
      fill={element.textColor}
    >
      {element.name}
    </Multiline>
  </g>
);

interface Props {
  element: UMLActivityActionNode;
  scale: number;
  fillColor?: string;
}
