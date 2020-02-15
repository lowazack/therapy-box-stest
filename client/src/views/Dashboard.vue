<template>
    <div>
        <h1 class="text-center">{{ this.$store.state.username }}</h1>

        <div class="row">
            <div class="col-4 mb-3 d-flex">
                <div class="block">
                    <h3>Weather</h3>
                    <div class="block__container">
                        <div class="d-flex">
                            <div class="flex-grow-1 text-center">
                                <img :src="`http://openweathermap.org/img/w/${this.icon}.png`" alt="">
                            </div>
                            <div class="text-center flex-grow-1">
                                {{ this.temp }}
                                <h5>degrees</h5>
                            </div>
                        </div>
                        <h4 class="text-center">{{ this.city }}</h4>
                    </div>
                </div>
            </div>
            <div class="col-4 mb-3 d-flex">
                <div class="block">
                    <h3>News</h3>
                    <div class="block__container">
                    </div>
                </div>
            </div>
            <div class="col-4 mb-3 d-flex">
                <router-link to="/sport" class="block">
                    <h3>Sport</h3>
                    <div class="block__container">
                        <h4 class="text-center">
                            {{ this.$store.state.teamName }}
                        </h4>
                    </div>
                </router-link>
            </div>

            <div class="col-4 mb-3 d-flex">
                <router-link to="/images" class="block">
                    <h3>Images</h3>
                    <div class="block__container">
                    </div>
                </router-link>
            </div>
            <div class="col-4 mb-3 d-flex">
                <div class="block">
                    <h3>Tasks</h3>
                    <div class="block__container">
                    </div>
                </div>
            </div>
            <div class="col-4 mb-3 d-flex">
                <div class="block">
                    <h3>Clothes</h3>
                    <div class="block__container">
                        <div>
                            <pie-chart></pie-chart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import pieChart from "../components/PieChart";

    export default {
        components: {
            pieChart
        },
        mounted() {
            if (this.$store.state.userID == null) {
                this.$router.push("/");
            }
            this.getWeather();
        },
        data: function () {
            return {
                location: {},
                temp: "",
                icon: "",
                city: ""
            }
        },
        methods: {
            getWeather() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            this.axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=d0a10211ea3d36b0a6423a104782130e`)
                                .then(response => {
                                    this.city = response.data.name;
                                    this.icon = response.data.weather[0].icon;
                                    this.temp = response.data.main.temp;
                                }).catch(error => {
                                console.log(error)
                            })
                        }, (error) => {
                            console.log(error.message);
                        }, {
                            enableHighAccuracy: true
                            , timeout: 5000
                        }
                    );
                } else {
                    alert("Geolocation is not supported by this browser.");
                }

            },
        }
    }
</script>

<style lang="scss">
    .block {
        border: 2px solid #f9ff00;
        border-radius: 10px;
        display: flex;
        width: 100%;
        flex-direction: column;
        flex-grow: 1;

        h3 {
            background-color: #f9ff00;
            line-height: 2;
            margin-bottom: 0;
            text-align: center;
            color: black;
        }

        &__container {
            padding: 10px;
            flex-grow: 1;
        }
    }
</style>
