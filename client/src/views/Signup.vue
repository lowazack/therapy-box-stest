<template>
    <div>
        <form @submit.prevent="signup">
            <h1 class="text-center text-white mb-5">Dev Challenge</h1>
            <div class="row">
                <div class="col-6 mb-5">
                    <input type="text" ref="username" placeholder="Username" class="form-control" required>
                </div>
                <div class="col-6 mb-5">
                    <input type="email" ref="email" class="form-control" placeholder="Email" required>
                </div>
                <div class="col-6 mb-5">
                    <input type="password" ref="password" class="form-control" placeholder="Password" required>
                </div>
                <div class="col-6 mb-5">
                    <input type="password" ref="confirm_password" class="form-control" placeholder="Confirm Password" required>
                </div>
            </div>
            <div class="text-center text-warn">{{this.responseText}}</div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
        </form>
    </div>

</template>

<script>

    export default {
        name: 'Home',
        components: {},
        data: function () {
            return{
                responseText: "",
            }
        },
        methods: {
            signup(e) {
                let body = {
                    username: this.$refs.username.value,
                    password: this.$refs.password.value,
                    confirm_password: this.$refs.confirm_password.value,
                    email: this.$refs.email.value
                };
                this.axios.post(`${this.endpoint}/create-user`, body).then(response => {
                    this.$store.commit('registerUser',response);
                    this.$router.push("/dashboard");

                }).catch( (error) => {
                    console.log(error);
                    this.responseText = "An Error occurred please try again"
                })
            }
        }
    }
</script>
