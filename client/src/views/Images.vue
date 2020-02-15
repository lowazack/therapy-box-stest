<template>
    <div>
        <h1 class="text-center">Photos</h1>
        <div class="row">
            <form ref="form" @submit.prevent="formSubmit">
                <input type="file" name="filetoupload" @change="inputChange">
            </form>

        </div>
    </div>

</template>

<script>
    export default {
        data: function() {
            return {
                selectedFile: null
            }
        },
        methods: {
            inputChange() {
                this.formSubmit()
            },
            formSubmit() {
                console.log(this.$refs.form);
                this.axios.post(`${this.endpoint}/image-upload`, {})
                    .then(response => {
                        console.log(response)
                    }).catch(error => {
                        console.log(error);
                })
            }
        }
    }
</script>
