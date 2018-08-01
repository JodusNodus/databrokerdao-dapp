import clone from 'lodash/clone';
import Immutable from 'seamless-immutable';

import { BRIDGE_TYPES } from './actions.js';

export const DEPOSIT_STEPS = {
    none: "none",
    init: "init",
    approved: "approved",
}

export const DEFAULT_STATE = {
    senderBalance: null,
    fetchingBalance: false,
    deposit: {
        step: DEPOSIT_STEPS.none,
        success: false,
        failure: false,
    },
};

export default function(state = Immutable(DEFAULT_STATE), action) {
  switch (action.type) {
    case BRIDGE_TYPES.FETCH_SENDER_BALANCE: {
      return Immutable.set(state, 'fetchingBalance', true);
    }

    case BRIDGE_TYPES.INIT_DEPOSIT: {
      return Immutable.setIn(state, ['deposit', 'step'], DEPOSIT_STEPS.init);
    }
    case BRIDGE_TYPES.APPROVE_DEPOSIT_SUCCESS: {
      return Immutable.setIn(state, ['deposit', 'step'], DEPOSIT_STEPS.approved);
    }
    case BRIDGE_TYPES.FETCH_SENDER_BALANCE_SUCCESS: {
      return Immutable.merge(state, {
          fetchingBalance: false,
          senderBalance: action.payload.senderBalance
      });
    }
    case BRIDGE_TYPES.DEPOSIT_SUCCESS: {
        return Immutable.merge(state, {
            deposit: {
                ...DEFAULT_STATE.deposit,
                success: true,
                failure: false
            }
        });
    }
    case BRIDGE_TYPES.DEPOSIT_FAILURE: {
        return Immutable.merge(state, {
            deposit: {
                ...DEFAULT_STATE.deposit,
                success: false,
                failure: true
            }
        });
    }
    default:
      return state;
  }
}
