import {
  createDataSelector,
  createGetItemsSelector
} from 'javascript-utils/lib/selectors';

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
