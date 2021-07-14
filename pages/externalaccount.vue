<template>
  <div>
    <div v-if="address">
      <div class="mb-8">充币地址</div>
      <div id="qrcode" ref="qrcode"></div>
      <div class="mt-4 ">{{ address }}</div>
      <div class="mb-14">余额：{{ free }}</div>
      <gallery
        :is-buy="false"
        :imgs="Imgs"
        ref="gallery"
        @reload="transactions"
        @transfer="transfromNft"
      />
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">
            请输入密码
          </v-card-title>

          <v-card-text>
            <v-text-field label="密码" v-model="password"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="configmNft">
              提交
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-else>
      <v-text-field
        label="输入密码生成地址"
        v-model="text"
        :rule="(v) => v.trim().split(' ').length <= 5 || 'error'"
        style="max-width: 400px"
      ></v-text-field>
      <v-btn class="primary accent-4 white--text" @click="getAddress">
        确定</v-btn
      >
    </div>
  </div>
</template>

<script>
import {
  accountGenerate,
  rmrkNftSend,
  transactions,
  externalBalance,
} from '@/assets/apilist'
import QRCode from 'qrcodejs2'

export default {
  name: 'externalaccount',
  data() {
    return {
      address: '',
      text: '',
      dialog: false,
      Imgs: [],
      password: '',
      item: null,
      free: null,
    }
  },
  methods: {
    transfromNft(item) {
      this.dialog = true
      this.item = item
    },
    configmNft() {
      if (!this.password) {
        return
      }
      this.dialog = false
      rmrkNftSend({
        recipient: this.item.address,
        id: this.item.id,
        signer: { address: this.address, passphrase: this.password },
      }).then((res) => {
        if (res.code == 200) {
          this.$msg({
            type: 'Success',
            message: '转账成功',
          })
        }
        this.$emit('reload')
        const gallery = this.$refs.gallery
        gallery.resetData()
      })
    },
    transactions() {
      this.Imgs = []

      externalBalance({ address: this.address }).then((res) => {
        if (res.code == 200) {
          this.free = res.data.free
        }
      })
      transactions({ type: 2, toAddress: [], ignoreLessThan: 0 }).then(
        (res) => {
          if (res.code == 200 && res.data) {
            let arr = res.data.filter(
              (res) => res.data.action.data.recipient == this.address
            )
            console.log(arr)
            arr.forEach((res2) => {
              let map = { id: res2.data.action.data.id }
              let result = res.data.filter(
                (res1) =>
                  res1.data.action.data.id == res2.data.action.data.id &&
                  res1.data.action.data.metadata
              )
              if (result && result.length) {
                map['cid'] = result[0].data.action.data.metadata.slice(12)
              }
              this.Imgs.push(map)
            })
          }
        }
      )
    },
    qrcode() {
      new QRCode('qrcode', {
        width: 100, // 设置宽度，单位像素
        height: 100, // 设置高度，单位像素
        text: this.address || '', // 设置二维码内容或跳转地址
      })
      this.transactions()
    },
    getAddress() {
      if (this.text && this.text.length > 3) {
        accountGenerate({ passphrase: this.text }).then((res) => {
          console.log(res)
          if (res.code == 200) {
            this.address = res.data
            this.$store.commit('setAddress', this.address)
            document.cookie = this.$store.state.email + '=' + this.address
            this.$nextTick(() => {
              this.qrcode()
            })
          }
        })
      }
    },
  },
  mounted() {
    console.log(this.$store.state)
    const arrCookie = document.cookie.split('; ')
    for (let i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split('=')
      if (this.$store.state.email && arr[0] == this.$store.state.email) {
        this.address = arr[1]
        console.log(this.address)
        this.$store.commit('setAddress', this.address)
      }
    }
    if (this.address) {
      this.$nextTick(() => {
        this.qrcode()
      })
    }
  },
}
</script>

<style scoped></style>
