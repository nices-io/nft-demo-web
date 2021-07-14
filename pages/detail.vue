<template>
    <div>
         <v-btn to="/"  text>返回</v-btn>
<!--           <v-col style="margin-left: 32px">-->
<!--               <image-uploader/>-->
<!--           </v-col>-->
        <gallery :is-buy="true" :imgs="Imgs" />
    </div>
</template>

<script>
    import Gallery from "../components/Gallery";
    import ImageUploader from "../components/ImageUploader";
    import  {getImage}  from "@/assets/apilist"

    export default {
        name: "detail",
        components: {Gallery,ImageUploader},
        data(){
            return {
                Imgs:[]
            }
        },

        created() {

            getImage({type:this.$route.params.tag || 3}).then(res=>{

                if (res.code == 200 && res.data.length){
                    for (let i = 0; i < res.data.length; i++) {
                        let data = {id:i,src: "data:image/jpeg;base64," + res.data[i].img,psi:res.data[i].psi }
                        this.Imgs.push(data);
                    }

                }
            })


        }
    }
</script>

<style scoped>

</style>
