import * as CONSTANTS from './constants';

export function testAction(data) {
  return {
    type: CONSTANTS.Test_Action,
    data,
  };
}
export function testActionSuccess(data) {
  return {
    type: CONSTANTS.Test_Action_Success,
    data,
  };
}
