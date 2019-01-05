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

/**
 * Gets the initial form values for creating a new controlling account.
 */
export const getCreateInitialValues = createSelector(
  [getSelectedNodeIds, getData],
  (nodeIds, nodes) => {
    if (nodeIds.length < 1) {
      return {};
    }

    const parentNodeId = nodeIds[nodeIds.length - 1];
    const parentNode = nodes.find(node => node.id === parentNodeId);

    return {
      p_ctrl_acct_id: parentNode.id,
      n_level: parentNode.n_level + 1
    };
  }
);
