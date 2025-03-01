import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '../../../components/controls/text/text';
import { ModelState } from '../../../components/store/model-state';
import { UMLClassifierMember } from './uml-classifier-member';
import { ThemedRect } from '../../../components/theme/themedComponents';

export const UMLClassifierMemberComponent: FunctionComponent<Props> = ({ element, scale, fillColor }) => {
  return (
    <g>
      <ThemedRect fillColor={fillColor || element.fillColor} strokeColor="none" width="100%" height="100%" />
      <Text x={10 * scale} fill={element.textColor} fontWeight="normal" textAnchor="start">
        {element.name}
      </Text>
    </g>
  );
};

interface Props {
  element: UMLClassifierMember;
  scale: number;
  fillColor?: string;
}
