export const state = () => ({
  sellingProducts: {
    items: [],
  },
})

export const getters = {
  getSellingProducts(state) {
    return state.sellingProducts.items
  },
}

export const mutations = {
  setSellingProducts(state, products) {
    state.sellingProducts.items = products.items
  },
}

export const actions = {
  async fetchSellingProducts({ commit }, { page, size }) {
    const data = await this.$axios.$get(
      `/api/product/list?page=${page}&size=${size}`
    )
    commit('setSellingProducts', data.result)
  },
}
