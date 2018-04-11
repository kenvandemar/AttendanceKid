import {
    RUN_APP,
} from './constants';

export function runApplication(app) {
    return {
        type: RUN_APP,
        app
    }
}