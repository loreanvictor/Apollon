import React, { Component, ComponentClass, RefObject } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  ConnectDropTarget,
  DropTarget,
  DropTargetCollector,
  DropTargetSpec,
} from 'react-dnd';
import * as DragDrop from './../DragDrop/dnd';
import { snapPointToGrid } from '../../domain/geo';
import { State as ReduxState } from './../Store';
import Element, { ElementRepository } from '../../domain/Element';
import * as Plugins from './../../domain/plugins';

class Droppable extends Component<Props> {
  render() {
    const { children, connectDropTarget } = this.props;
    return connectDropTarget(<div>{children}</div>);
  }
}

interface OwnProps {
  container: RefObject<HTMLDivElement>;
}

interface StateProps {
  gridSize: number;
}

interface DispatchProps {
  create: typeof ElementRepository.create;
}

interface DragDropProps {
  connectDropTarget: ConnectDropTarget;
}

type Props = OwnProps & StateProps & DispatchProps & DragDropProps;

const mapStateToProps = (state: ReduxState): StateProps => ({
  gridSize: state.editor.gridSize,
});

const dropTargetSpec: DropTargetSpec<Props> = {
  drop(props, monitor, component) {
    if (monitor === undefined || component === undefined) {
      // Should never happen, but let's be defensive
      return;
    }

    const { current } = props.container;

    if (current === null) {
      // Should never happen, but let's be defensive
      return;
    }

    const item = monitor.getItem() as DragDrop.DragItem;

    if (item.type === DragDrop.ItemTypes.NewEntity) {
      const xyCoordOffset = monitor.getSourceClientOffset();
      if (xyCoordOffset != null) {
        const x = xyCoordOffset.x;
        const y = xyCoordOffset.y;
        const canvasRect = current.getBoundingClientRect();
        const positionOnCanvas = {
          x: x - canvasRect.left,
          y: y - canvasRect.top,
        };
        const actualPosition = snapPointToGrid(
          positionOnCanvas,
          props.gridSize
        );

        const element: Element = new (Plugins as { [clazz: string]: any })[item.kind]();
        element.bounds = { ...element.bounds, ...actualPosition };
        props.create(element);
      }
    }
  },
};

const dropTargetCollector: DropTargetCollector<any> = connector => ({
  connectDropTarget: connector.dropTarget(),
});

export default compose<ComponentClass<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, ReduxState>(
    mapStateToProps,
    {
      create: ElementRepository.create,
    }
  ),
  DropTarget<Props>(
    [DragDrop.ItemTypes.NewEntity, DragDrop.ItemTypes.ExistingEntities],
    dropTargetSpec,
    dropTargetCollector
  )
)(Droppable);
