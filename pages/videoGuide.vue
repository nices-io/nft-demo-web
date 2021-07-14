<!--
 * @Descripttion: 
 * @Author: cui
 * @Date: 2021-03-05 13:23:05
 * @LastEditors: cui
 * @LastEditTime: 2021-03-05 14:05:33
-->
<template>
  <div>
    <v-row>
      <v-col class="pl-16 pt-16">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          width="200px"
        >
        </video-player
      ></v-col>
      <v-col class="px-16 pt-16">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions1"
          width="200px"
        >
        </video-player>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerOptions: {
        fluid: true,
        sources: [
          { type: 'video/mp4', src: require('@/static/video/comic.mp4') },
        ],
      },
      playerOptions1: {
        fluid: true,
        sources: [
          { type: 'video/mp4', src: require('@/static/video/photo.mp4') },
        ],
      },
    }
  },
}
</script>

<style></style>
