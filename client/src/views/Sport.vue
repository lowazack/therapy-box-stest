<template>
    <div>
        <h1 class="text-center">Sport</h1>
        <div class="row">
            <input type="text" class="form-control" ref="selectedTeam" :value="this.$store.state.teamName" @change="getWins()">
        </div>

        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-5 text-center" v-for="game in this.wins">
                <strong>{{game.HomeTeam}}</strong>:{{game.FTHG}} - {{game.FTAG}}:<strong>{{game.AwayTeam}}</strong>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
          return {
              sport: {},
              wins: {}
          }
        },
        mounted() {
            this.getSport();

        },
        methods: {
            getSport() {
                this.axios.get(`${this.endpoint}/game-stats`).then(response => {
                    this.sport = response.data;
                    this.getWins();
                }).catch(error => {
                    console.log(error)
                })
            },
            getWins() {
                this.$store.commit('updateTeam', this.$refs.selectedTeam.value);
                let gamesPlayed = this.sport.filter(game => {
                    return (game.AwayTeam === this.$store.state.teamName || game.HomeTeam === this.$store.state.teamName);
                });

                this.wins = gamesPlayed.filter(game => {
                   return (game.HomeTeam === this.$store.state.teamName && game.FTHG > game.FTAG) || (game.AwayTeam === this.$store.state.teamName && game.FTHG < game.FTAG);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-control {
        font-size: 2rem;
        text-align: center;
    }
</style>
