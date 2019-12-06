import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        confirmModalShow: false,
        noticeModal: {
            show: false,
            title: '',
            text: ''
        },
    },
    mutations: {
        SET(state, {field, value}) {
            state[field] = value;
        },
        ADD_NEW_PRODUCT(state, payload) {
            state.products.push(payload);
        },
        SET_NOTICE_MODAL(state, {show, title, text}) {
            state.noticeModal.show = show;
            state.noticeModal.title = title;
            state.noticeModal.text = text;
        },
        UPDATE_PRODUCT(state, {product, indexProduct}) {
            state.products[indexProduct] = product;
        }
    },
    actions: {
        getProducts({commit}) {
            try {
                const products = JSON.parse(localStorage.getItem('products'));
                commit('SET', {
                    field: 'products',
                    value: products
                })
            } catch (e) {
                commit('SET_NOTICE_MODAL', {
                    show: true,
                    title: `Error: ${e.name}`,
                    text: e.message
                })
            }
        },
        addProduct({state, commit, dispatch}, newProduct) {
            return new Promise(resolve => {
                commit('ADD_NEW_PRODUCT', newProduct);
                resolve();
            })
                .then(() => {
                    dispatch('updateLocalStorage');
                })

        },
        updateProduct({state, commit, dispatch}, updatedProduct) {
            return new Promise(resolve => {
                commit('UPDATE_PRODUCT', updatedProduct);
                resolve();
            })
                .then(() => {
                    dispatch('updateLocalStorage');
                })

        },
        deleteProduct({state, commit, dispatch}, indexProduct) {
            const updatedListOfProducts = state.products.splice(+indexProduct, 1);
            return new Promise(resolve => {
                commit('SET', {
                    type: 'products',
                    value: updatedListOfProducts
                });
                resolve();
            })
                .then(() => {
                    dispatch('updateLocalStorage');
                })
        },
        updateLocalStorage({state}) {
            localStorage.removeItem('products');
            localStorage.setItem('products', JSON.stringify(state.products));
        },
        reloadData({dispatch}) {
            return import('../products')
                .then(data => {
                    const products = data.products;
                    localStorage.setItem('products', JSON.stringify(
                        products
                    ));
                    return products;
                })
                .then(() => {
                    dispatch('getProducts');
                })
        }
    },
    getters: {
        getIdForNewProduct: state => {
            const products = state.products;
            let idNewProduct = 1;
            if(products.length > 0){
                idNewProduct = +products[products.length - 1].id + 1; //find last product and increase id by 1
            }
            return idNewProduct;
        },
        findProductIndex: state => productId => {
            const products = state.products;
            return products.findIndex(product => +product.id === +productId)
        },
        findProductById: state => productId => {
            const products = state.products;
            return products.find(product => +product.id === +productId);
        }
    }
})
