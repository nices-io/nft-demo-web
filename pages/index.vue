<!--
 * @Descripttion: 
 * @Author: cui
 * @Date: 2021-01-14 15:40:57
 * @LastEditors: cui
 * @LastEditTime: 2021-03-05 14:34:13
-->
<template>
  <div id="home" class="pa-4">
    <v-container fluid>
      <h3 class="headline font-weight-medium mb-5">All NFT</h3>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="item in category"
          :key="item.tag"
          class="mx-xs-auto"
        >
          <video-card :card="{ maxWidth: 350 }" :video="item"></video-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import videoCard from '@/components/VideoCard'

export default {
  name: 'Home',
  data: () => ({
    loading: true,

    category: [
      {
        name: '网红脸',
        url: '/detail',
        thumb: require('@/assets/images/wanghong.png'),
        tag: '5',
        views: '9.6k',
        createdAt: '6 hours ago',
      },
      {
        name: '卡通脸',
        url: '/detail',
        thumb: require('@/assets/images/katong.jpg'),
        tag: '6',
        views: '9.6k',
        createdAt: '6 hours ago',
      },
      {
        name: '人物半身',
        url: '/detail',
        thumb: require('@/assets/images/photo.png'),
        tag: '7',
        views: '9.6k',
        createdAt: '6 hours ago',
      },
      {
        name: '卡通全身',
        url: '/detail',
        thumb: require('@/assets/images/comic.png'),
        tag: '8',
        views: '9.6k',
        createdAt: '6 hours ago',
      },
    ],
  }),
  components: {
    videoCard,
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },
}
</script>

<style lang="scss">
.card {
  background: #f9f9f9 !important;
}
</style>
