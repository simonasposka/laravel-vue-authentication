import store from '../../../store';

export default (to, from, next) => {
    if (store.getters['authenticated']) {
        next({ name: 'posts' });
    } else {
        next();
    }
}