<template>
    <div>
        <v-btn to="/mynft"  text>返回</v-btn>
        <gallery :is-buy="false"   ref="gallery" :imgs="Imgs"  @reload="getImgs" @transfer="transfromNft"  />
    </div>
</template>

<script>
    import  {findNFT,transferNFT}  from "@/assets/apilist"

    export default {
        name: "myDetail",
        data(){
            return {
                Imgs:[],

            }
        },
        methods:{
                transfromNft(item){
                    transferNFT({address: item.address,id:item.id}).then(res=>{
                        if (res.code == 200) {
                            this.$msg({
                                type: "Success",
                                message: "转账成功"
                            });
                        }
                        this.$emit('reload')

                        const gallery = this.$refs.gallery;
                        gallery.resetData()
                    })
                },


            getImgs(){
                this.Imgs = [];
                findNFT({}).then(res=>{

                    if (res.code == 200 && res.data.length){
                        for (let i = 0; i < res.data.length; i++) {
                            this.Imgs.push(res.data[i]);
                        }

                    }
                })
            }
        },
        created() {
            this.getImgs()
            console.log(this.$children)
        }
    }

</script>

<style scoped>

</style>
