import memoize from 'lru-memoize';
import {
  createValidator, required, numeric
} from 'javascript-utils/lib/validation';

export const createValidators = memoize(10)(createValidator({
  code: required(),
  name: required(),
  p_ctrl_acct_id: [required(), numeric()],
  n_level: [required(), numeric()]
}));

export const updateValidators = memoize(10)(createValidator({
  code: required(),
  name: required(),
  p_ctrl_acct_id: [required(), numeric()],
  n_level: [required(), numeric()]
}));
