/*
 * @Descripttion: 
 * @Author: cui
 * @Date: 2020-09-27 10:44:22
 * @LastEditors: cui
 * @LastEditTime: 2021-03-05 13:48:22
 */
import Vue from 'vue'
import Message from 'vue-m-message'
import 'vue-m-message/dist/index.css'

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(Message, {
  name: 'msg'
})
Vue.use(VideoPlayer)