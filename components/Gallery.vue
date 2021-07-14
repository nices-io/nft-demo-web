<template>
  <div class="block galleryBlock">
    <v-item-group v-model="activeItem">
      <v-container>
        <v-row>
          <v-col
            v-for="item in Imgs.length > 0 ? Imgs : items"
            :key="item.id"
            class="d-flex child-flex justify-center"
            cols="12"
            sm="3"
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-card flat tile :ripple="false">
                <NftImage
                  v-if="!isBuy"
                  :url="
                    item.cid ? `http://8.210.190.223:8080/ipfs/${item.cid}` : ''
                  "
                ></NftImage>
                <v-img
                  v-else
                  :src="Imgs.length > 0 ? item.src : ''"
                  aspect-ratio="1"
                  @click="toggle"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder @click="toggle">
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <v-expand-transition>
                  <div v-show="active && !isBuy">
                    <v-text-field
                      label="转出地址"
                      hide-details
                      single-line
                      v-model="address"
                      color="primary accent-4"
                    ></v-text-field>
                  </div>
                </v-expand-transition>
                <v-card-actions v-if="!isBuy">
                  <v-btn text color="primary accent-4" @click="toggle"
                    >转出
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary accent-4"
                    @click.stop="transfromNft(item)"
                    v-if="active"
                    >提交
                  </v-btn>
                </v-card-actions>
                <v-card-actions class="text-center">
                  <v-btn
                    class="primary accent-4 white--text"
                    v-if="active && isBuy"
                    @click.stop="confirmImg(item.psi)"
                    >购买
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import { imgConfirm } from '@/assets/apilist'
import NftImage from './NftImage'

export default {
  name: 'Gallery',
  components: { NftImage },
  props: {
    isBuy: {
      default: true,
      type: Boolean,
    },
    Imgs: {
      default: function() {
        return []
      },
      type: Array,
    },
  },
  methods: {
    transfromNft(item) {
      if (!this.address) {
        return
      }
      item.address = this.address
      this.$emit('transfer', item)
    },
    resetData() {
      this.address = null
      this.activeItem = null
    },
    confirmImg(psi) {
      imgConfirm({ psi: psi }).then((res) => {
        if (res.code == 200) {
          this.$msg({
            type: 'Success',
            message: '成功',
          })
          this.$router.push({ path: '/mynft' })
        }
      })
    },
  },
  data() {
    return {
      show: false,
      address: '',
      activeItem: null,
      items: [
        {
          id: 1,
          src: require('../assets/images/katong.jpg'),
        },
        {
          id: 2,
          src: require('../assets/images/katong.jpg'),
        },
        {
          id: 3,
          src: require('../assets/images/katong.jpg'),
        },
        {
          id: 4,
          src: require('../assets/images/katong.jpg'),
        },
      ],
    }
  },
  created() {
    console.log(this.isBuy)
  },
}
</script>
