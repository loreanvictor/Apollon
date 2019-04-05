import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IAssessment } from '../../services/assessment/assessment';
import { AssessmentRepository } from '../../services/assessment/assessment-repository';
import { Element } from '../../services/element/element';
import { Divider } from '../popup/controls/divider';
import { Header } from '../popup/controls/header';
import { Section } from '../popup/controls/section';
import { TextField } from '../popup/controls/textfield';
import { ModelState } from '../store/model-state';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    flex: 0 0 50%;
  }
`;

type OwnProps = {
  element: Element;
};

type StateProps = {
  readonly: boolean;
  assessment: IAssessment | null;
};
type DispatchProps = { assess: typeof AssessmentRepository.assess };
type Props = OwnProps & StateProps & DispatchProps;

const enhance = connect<StateProps, DispatchProps, OwnProps, ModelState>(
  (state, props) => ({
    readonly: state.editor.readonly,
    assessment: AssessmentRepository.getById(state.assessments)(props.element.id),
  }),
  { assess: AssessmentRepository.assess },
);

class AssessmentSectionCompoennt extends Component<Props> {
  render() {
    const { element, assessment, readonly } = this.props;

    return (
      <>
        <Section>
          <Header>Assessment for {element.name}</Header>
          <Divider />
        </Section>
        <Section>
          <Flex>
            <span>Score:</span>
            {readonly ? (
              <span>{(assessment && assessment.score) || '-'}</span>
            ) : (
              <TextField type="number" step={0.5} onUpdate={this.updateScore} value={assessment ? String(assessment.score) : ''} />
            )}
          </Flex>
        </Section>
        {readonly ? (
          assessment && assessment.feedback && <Section>{assessment.feedback}</Section>
        ) : (
          <Section>
            <TextField
              placeholder="Feedback"
              onUpdate={this.updateFeedback}
              value={assessment && assessment.feedback ? assessment.feedback : ''}
            />
          </Section>
        )}
      </>
    );
  }

  private updateScore = (value: string) => {
    const { element, assessment } = this.props;
    const score = parseFloat(value) || 0;
    this.props.assess(element.id, { ...assessment, score });
  };

  private updateFeedback = (value: string) => {
    const { element, assessment } = this.props;
    const feedback = value.length ? value : undefined;
    this.props.assess(element.id, { score: 0, ...assessment, feedback });
  };
}

export const AssessmentSection = enhance(AssessmentSectionCompoennt);