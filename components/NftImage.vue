<template>
    <v-img :src="src"   aspect-ratio="1"

           class="grey lighten-2">
        <template v-slot:placeholder >
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
</template>

<script>

    import axios from 'axios'

    export default {
        props:{
           url:{
           type:String
           }
        },
        data(){
           return {
               src:""
           }
        },
        created() {
            if (this.url){
                axios
                    .get(this.url)
                    .then(response => {
                        if (response.status == 200){
                            this.src = response.data.image_data.slice(7)
                        }
                    })
            }

        }
    }
</script>

<style scoped>

</style>
