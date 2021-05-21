<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-select
          dense
          hide-details
          outlined
          item-value="value"
          item-text="text"
          :value="currentLanguageAvailable"
          :items="languageAvailable"
          @change="onChangeLanguage"
        ></v-select>
      </v-col>
    </v-row>

    <v-row class="my-4 ml-1">
      <p>Format currency: {{ $n(total, 'currency') }}</p>
    </v-row>
    <div class="my-4">
      <h1>{{ $t('home.hello') }} 👋</h1>
      <p>
        This page is rendered on the <strong>{{ rendering }}</strong>
      </p>
      <p v-if="rendering === 'server'">
        First load or hard refresh is done on server side.
      </p>
      <p v-if="rendering === 'client'">Navigation is done on client side.</p>
      <ul>
        <li>Refresh the page for server side rendering.</li>
        <li>Click the links to see client side rendering.</li>
      </ul>

      <NuxtLink to="/inspire">Inspire Page</NuxtLink>
    </div>
    <br />
    <br />
    <v-container>
      <v-row> <v-btn @click="$fetch">Refresh</v-btn></v-row>
      <p v-if="$fetchState.pending">
        <span class="loading"></span>
      </p>
      <p v-else-if="$fetchState.error">Error while fetching mountains 🤬</p>
      <v-row v-else>
        <v-col
          v-for="(product, index) in getItems"
          :key="index"
          cols="6"
          md="3"
        >
          <v-card
            class="card"
            flat
            width="100%"
            @click="goToProduct(product.id)"
          >
            <v-img
              class="cover px-0 mx-0"
              :aspect-ratio="1"
              contain
              :src="product.image && product.image.src"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    width="1"
                    color="primary lighten-3"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>

            <v-container class="pa-0 description">
              <v-card-title class="px-0 py-3 title text-caption text-md-body-2">
                {{ product && product.title }}
              </v-card-title>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: 'Home',
  asyncData() {
    return {
      rendering: process.server ? 'server' : 'client',
    }
  },

  data() {
    return {
      total: 10.3948,
    }
  },

  async fetch() {
    // eslint-disable-next-line no-console

    await this.$store.dispatch('products/fetchSellingProducts', {
      page: 1,
      size: 8,
    })

    // console.log(this.$store.state.products.sellingProducts.items)
  },

  computed: {
    getItems() {
      return this.$store.state.products.sellingProducts.items
    },
    languageAvailable() {
      return this.$i18n.locales.map((locale) => {
        return {
          text: locale.name,
          value: locale.code,
        }
      })
    },
    currentLanguageAvailable() {
      const currentLocale = this.$i18n.locales.find(
        (i) => i.code === this.$i18n.locale
      )
      return {
        text: currentLocale.name,
        value: currentLocale.code,
      }
    },
  },

  activated() {
    // Call fetch again if last fetch more than a minute ago
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  },

  methods: {
    goToProduct(id) {
      this.$router.push('/product/' + id)
    },

    refresh() {
      this.$fetch()
    },

    onChangeLanguage(locale) {
      localStorage.setItem('lang', locale)
      this.$i18n.setLocale(locale)
    },
  },
}
</script>
<style scoped lang="scss">
.loading {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 4px solid rgba(9, 133, 81, 0.705);
  border-radius: 50%;
  border-top-color: #158876;
  animation: spin 1s ease-in-out infinite;
}
::v-deep .select-group {
  .v-select__selection {
    font-weight: 700;
    font-size: 14px;
  }
  .v-input__slot {
    min-height: 40px;
    .v-input__append-inner {
      margin-top: 12px;
    }
  }
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
