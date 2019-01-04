import { createSelector } from 'reselect';
import {
  createDataSelector,
  createGetItemsSelector
} from 'javascript-utils/lib/selectors';
import {
  getSelectedNodesCountRecursive,
  getSelectedNodeIdsRecursive
} from 'helpers/selectors';

const _getData = createDataSelector('controllingAccounts', 'dataLoaded', 'data');
const _getNodes = createDataSelector('controllingAccounts', 'dataLoaded', 'nodes');

/**
 * Returns the controlling accounts from the state.
 */
export const getData = createGetItemsSelector(_getData);

/**
 * Returns the tree nodes.
 */
export const getNodes = createGetItemsSelector(_getNodes);

/**
 * Returns the count of selected nodes.
 */
export const getSelectedNodesCount = createSelector(
  [getNodes],
  (nodes) => {
    if (nodes.length < 1) {
      return 0;
    }
    return getSelectedNodesCountRecursive(nodes);
  }
);

/**
 * Returns the ids of selected nodes.
 */
export const getSelectedNodeIds = createSelector(
  [getNodes],
  (nodes) => {
    if (nodes.length < 1) {
      return [];
    }
    return getSelectedNodeIdsRecursive(nodes);
  }
);
