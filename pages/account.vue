<template>
  <div class="ma-10">
    <div class="mb-8">充币地址</div>
    <div id="qrcode" ref="qrcode"></div>
    <div class="mt-4 ">{{ data.rechargeAddress }}</div>
    <div class="mb-14">余额：{{ data.free }}</div>
    <v-row>
      <v-col>
        <div class="mb-4">提币地址</div>
        <v-text-field
          label="提币地址"
          v-model="address"
          solo
          style="max-width: 400px"
        ></v-text-field>
      </v-col>
      <v-col>
        <div class="mb-4">提币数量</div>
        <v-text-field
          label="提币数量"
          v-model="number"
          solo
          style="max-width: 300px"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="max-width: 200px">
        <div>手续费</div>
        <div class="mt-4 mb-14">0</div>
      </v-col>
      <v-btn class="primary accent-4 white--text mt-8" @click="handleWithdraw">
        提币</v-btn
      >
    </v-row>

    <v-col>充币记录</v-col>
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      hide-default-footer
    ></v-data-table>

    <v-col></v-col>
    <v-col>提币记录</v-col>
    <v-data-table
      :headers="drawheaders"
      :items="desserts"
      class="elevation-1"
      hide-default-footer
    ></v-data-table>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import {
  findAccount,
  balanceWND,
  selectCoinsLogList,
  transferWND,
} from '@/assets/apilist'

export default {
  name: 'account',
  data() {
    return {
      data: {
        free: '',
        rechargeAddress: '',
      },
      address: '',
      number: '',
      headers: [
        {
          text: '币种',
          align: 'start',
          sortable: false,
          value: 'coinsType',
        },
        { text: '充币地址', value: 'address' },
        { text: '数量', value: 'quantity' },
        { text: 'hash值', value: 'txId' },
        { text: '状态', value: 'status' },
        { text: '时间', value: 'updateTime' },
      ],
      desserts: [],
      drawheaders: [
        {
          text: '币种',
          align: 'start',
          sortable: false,
          value: 'coinsType',
        },
        { text: '提币地址', value: 'address' },
        { text: '数量', value: 'quantity' },
        { text: 'hash值', value: 'txId' },
        { text: '状态', value: 'status' },
        { text: '时间', value: 'updateTime' },
      ],
    }
  },
  methods: {
    qrcode() {
      new QRCode('qrcode', {
        width: 100, // 设置宽度，单位像素
        height: 100, // 设置高度，单位像素
        text: this.data.rechargeAddress || '', // 设置二维码内容或跳转地址
      })
    },
    handleWithdraw() {
      if (!this.address || !this.number) {
        return
      }
      transferWND({ quantity: this.number, address: this.address }).then(
        (res) => {
          if (res.code == 200) {
            this.$msg({
              type: 'Success',
              message: '成功',
            })
            this.loadRecored()
          }
        }
      )
    },
    loadRecored() {
      balanceWND().then((res) => {
        if (res.code == 200) {
          this.data.free = Number(res.data.free) / 100000000000
        }
      })

      selectCoinsLogList().then((res) => {
        if (res.code == 200) {
          console.log(res.data)
          this.desserts = res.data
        }
      })
    },
  },
  created() {
    findAccount({ coinsType: 'WND' }).then((res) => {
      if (res.code == 200) {
        this.data.rechargeAddress = res.data.rechargeAddress
        this.$nextTick(() => {
          this.qrcode()
        })
      }
    })
    this.loadRecored()
  },
}
</script>

<style scoped></style>
