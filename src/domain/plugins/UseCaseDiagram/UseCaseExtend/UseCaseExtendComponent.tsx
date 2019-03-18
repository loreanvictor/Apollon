import React, { SFC, SVGProps } from 'react';
import UseCaseExtend from './UseCaseExtend';
import Point from '../../../geometry/Point';

const Arrow: SFC<SVGProps<SVGPathElement>> = props => (
  <path
    {...props}
    stroke="black"
    strokeDasharray={7}
    markerEnd="url(#RelationshipKind_Arrow)"
  />
);

const UseCaseExtendComponent: SFC<Props> = ({ element }) => {
  const [start, end] = element.path.map(p => new Point(p.x, p.y));
  const line = end.subtract(start);

  if (line.length <= 100) {
    return <Arrow d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`} />;
  }

  const norm = line.normalize();
  const center = start.add(norm.scale(0.5 * line.length));
  const startSection = start.add(norm.scale(0.5 * line.length - 40));
  const endSection = end.subtract(norm.scale(0.5 * line.length - 40));
  return (
    <g>
      <Arrow
        d={`
          M ${start.x} ${start.y} L ${startSection.x} ${startSection.y}
          M ${endSection.x} ${endSection.y} L ${end.x} ${end.y}
        `}
      />
      <path
        id={`textpath-${element.id}`}
        d={`
          M ${startSection.x} ${startSection.y}
          L ${endSection.x} ${endSection.y}
        `}
      />
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        fontWeight="bold"
        transform={
          norm.x < 0
            ? `
              translate(${center.x}, ${center.y})
              rotate(180)
              translate(${-center.x}, ${-center.y})
            `
            : undefined
        }
      >
        <textPath xlinkHref={`#textpath-${element.id}`} startOffset="50%">
          «extend»
        </textPath>
      </text>
    </g>
  );
};

interface Props {
  element: UseCaseExtend;
}

export default UseCaseExtendComponent;
