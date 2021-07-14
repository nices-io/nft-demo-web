<!--
 * @Descripttion: 
 * @Author: cui
 * @Date: 2020-08-12 02:08:41
 * @LastEditors: cui
 * @LastEditTime: 2021-03-05 13:22:04
-->
<template>
  <v-card
    class="content-bg card mx-auto "
    :max-width="card.maxWidth"
    flat
    tile
    router
    :to="{ name: video.url.slice(1), params: { tag: video.tag } }"
  >
    <v-img :src="video.thumb" height="300px" class="white" contain></v-img>
    <v-row no-gutters>
      <v-col>
        <v-card-title class="pl-2 pt-3 subtitle-1 font-weight-bold">
          {{ video.name }}
        </v-card-title>

        <v-card-subtitle class="pl-2 pb-0">
          222
        </v-card-subtitle>
        <v-card-subtitle class="pl-2 pt-0">
          ￥100 <v-icon>mdi-circle-small</v-icon> 9 张
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
    card: Object,
  },
}
</script>

<style></style>
