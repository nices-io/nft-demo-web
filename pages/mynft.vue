<!--
 * @Descripttion: 
 * @Author: cui
 * @Date: 2021-01-18 12:08:25
 * @LastEditors: cui
 * @LastEditTime: 2021-03-05 14:15:56
-->
<template>
  <div>
    <h3 class="headline font-weight-medium mb-5">出售NFT</h3>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="i in 1"
        :key="i"
        class="mx-xs-auto"
      >
        <video-card :card="{ maxWidth: 350 }" :video="video"></video-card>
      </v-col>
    </v-row>

    <v-col class="my-5">转入记录</v-col>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:item.img="{ item }">
        <v-img
          :src="item.img"
          aspect-ratio="1"
          class="grey lighten-2"
          width="120"
        ></v-img>
      </template>
    </v-data-table>

    <v-col class="my-5">转出记录</v-col>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:item.img="{ item }">
        <v-img
          :src="item.img"
          aspect-ratio="1"
          class="grey lighten-2"
          width="120"
        ></v-img>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { findNFT } from '@/assets/apilist'
export default {
  name: 'mynft',
  methods: {
    findNft() {
      findNFT({ status: 3 }).then((res) => {
        if (res.code == 200 && res.data.length) {
          // for (let i = 0; i < res.data.length; i++) {
          //     this.Imgs.push(res.data[i]);
          // }
          this.desserts = res.data
          console.log(this.desserts)
        }
      })
    },
  },
  created() {
    this.findNft()
  },
  data() {
    return {
      video: {
        url: '/myDetail',
        thumb: require('@/assets/images/katong.jpg'),
        name: '我的NFT',
      },
      img: require('@/assets/images/katong.jpg'),
      headers: [
        {
          text: '图片',
          align: 'start',
          sortable: false,
          value: 'img',
        },
        { text: '地址', value: 'address' },
        { text: 'hash值', value: 'hash' },
        { text: '状态', value: 'status' },
        { text: '时间', value: 'updateTime' },
      ],
      desserts: [],
    }
  },
}
</script>

<style scoped></style>
