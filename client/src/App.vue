<template>
    <div id="app" class="py-5">
        <div class="container">
            <button v-if="this.$store.state.userID != null" class="btn" @click="signOut">Signout</button>
            <div>
                <router-view/>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            signOut() {
                this.$store.commit('signout');
                this.$router.push("/");
            },

        }
    }
</script>

<style lang="scss">
    #app {
        min-height: 100vh;
        background-image: url("../src/assets/Background.png");
        background-size: cover;
        display: flex;
        flex-direction: column;
    }


</style>
