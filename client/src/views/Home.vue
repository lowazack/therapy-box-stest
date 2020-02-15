<template>
    <div>
        <form @submit.prevent="login()">
            <h1 class="text-center text-white  mb-5">Dev Challenge</h1>
            <div class="row">
                <div class="col-6 mb-5">
                    <input type="text" placeholder="Username" ref="username" class="form-control" required>
                </div>
                <div class="col-6 mb-5">
                    <input type="password" class="form-control" placeholder="Password" ref="password" name="password"
                           required>
                </div>
            </div>
            <div class="text-center text-warn">{{this.responseText}}</div>
            <div class="text-center mb-1">
                <button type="submit" class="btn btn-primary">login</button>
            </div>
        </form>
        <div class="text-center">New to the challenge?
            <router-link to="/signup">Sign Up</router-link>
        </div>
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
            login(e) {
                let body = {
                    username: this.$refs.username.value,
                    password: this.$refs.password.value
                };
                this.axios.post(`${this.endpoint}/login`, body)
                    .then(response => {
                        this.$store.commit('registerUser',response);
                        this.$router.push("/dashboard");
                    })
                    .catch(function (error) {
                        console.log(error);
                        this.responseText = "An Error occurred please try again"
                    })
            }
        }
    }
</script>
<!--username@gmail.com-->
