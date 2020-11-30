import store from '../../../store';

export default (to, from, next) => {
    if (store.getters['authenticated']) {
        next();
    } else {
        next({ name: 'login' });
    }
}