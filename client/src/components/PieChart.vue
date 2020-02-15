<template>
    <div class="d-flex justify-content-center">
        <apex-chart width="150" :type="'pie'" :options="chartOptions" :series="series"></apex-chart>
    </div>
</template>
<script>
    import VueApexCharts from 'vue-apexcharts'
    import json from '../api_response'

    export default {
        components: {
            apexChart: VueApexCharts
        },
        data: function () {
            return {
                series: [],
                chartOptions: {
                    labels: [],
                    legend: false,
                },
                json: json.payload
            }
        },
        mounted() {
            let destinctItemArray = [];
            let itemCountArray = [];
            let distinctItemMap = [...new Set(this.json.map(item => item.clothe))];
            distinctItemMap.forEach((item, key) => {
                let allOfType = this.json.filter(obj => {
                    return obj.clothe === item;
                });
                destinctItemArray[key] = item;
                itemCountArray[key] = allOfType.length;

            });

            this.series = itemCountArray;
            this.chartOptions = {
                labels: destinctItemArray,
                legend: false,
            }
        }
    }
</script>
<style></style>
