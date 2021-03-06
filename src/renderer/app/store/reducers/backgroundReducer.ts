import produce from 'immer';
import { IPolyImage } from 'renderer/interfaces';
import { hereford } from 'renderer/assets/images';
import { Action } from 'redux';
import { BackgroundActions } from '../actions/background';

export interface IBackgroundReducerState {
    animate: boolean;
    image: IPolyImage;
    filter: string;
    spring: { tension: number; friction: number };
}

const defaultState = {
    animate: true,
    image: hereford,
    filter: 'blur(30px)',
    spring: { tension: 20, friction: 10 },
};

export default function backgroundReducer(state = defaultState, action: BackgroundActions) {
    switch (action.type) {
        case 'RESET_BACKGROUND':
            return defaultState;
        case 'SET_BACKGROUND':
            return produce(state, draft => ({ ...draft, ...action.payload }));
        default:
            return state;
    }
}
