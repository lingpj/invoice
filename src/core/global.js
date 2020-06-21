import _ from 'lodash'
export default {
    install (vue) {
        vue.prototype.$lodash = _
    }
}