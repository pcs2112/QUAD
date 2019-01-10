import memoize from 'lru-memoize';
import {
  createValidator, required, numeric
} from 'javascript-utils/lib/validation';

const createValidators = memoize(10)(createValidator({
  code: required(),
  name: required(),
  p_ctrl_acct_id: [required(), numeric()],
  n_level: [required(), numeric()],
  ctrl_acct_units: required()
}));

const updateValidators = memoize(10)(createValidator({
  code: required(),
  name: required(),
  p_ctrl_acct_id: [required(), numeric()],
  n_level: [required(), numeric()],
  ctrl_acct_units: [required(), numeric()]
}));

export const validators = {
  create: createValidators,
  update: updateValidators
};
