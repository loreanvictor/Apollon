import * as React from 'react';
import { render } from '@testing-library/react';
import { Point } from '../../../../main/utils/geometry/point';
import { UMLUseCaseGeneralizationComponent } from '../../../../main/packages/uml-use-case-diagram/uml-use-case-generalization/uml-use-case-generalization-component';
import { UMLUseCaseGeneralization } from '../../../../main/packages/uml-use-case-diagram/uml-use-case-generalization/uml-use-case-generalization';

it('render the uml-use-case-generalization-component', () => {
  const umlUseCaseGeneralization: UMLUseCaseGeneralization = new UMLUseCaseGeneralization({
    path: [new Point(0, 0), new Point(100, 100)],
  });
  const { getByText } = render(
    <svg>
      <UMLUseCaseGeneralizationComponent element={umlUseCaseGeneralization} />
    </svg>,
  );
  // TODO: expect
  // expect(getByText('«extend»')).toBeInTheDocument();
});
