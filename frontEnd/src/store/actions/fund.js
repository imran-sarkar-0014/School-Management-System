import { SET_FUND, RESET_FUND } from './actionTypes'

export const setFund = (fund) => {
    return {
        type: SET_FUND,
        payload: fund
    }
}

export const resetFund = () => {
    return {
        type: RESET_FUND
    }
}
