<template>
  <div class="animated fadeIn">
    <notifications position="bottom right" group="bottom" width="100%"/>
    <b-row v-if="lastBlock >= startBlock && lastBlock < endBlock">
      <b-col md="12">
        <b-progress :value="progress" animated style="width:100%;"></b-progress>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{ startBlock }}</h4>
            <p>Start Block</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{ endBlock }}</h4>
            <p>End Block</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0"> {{ totalClaims }}</h4>
            <p>Claims</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{ totalClaimedEscher }}</h4>
            <p>Total claimed (ESCH)</p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-card :header="title">
          <b-alert v-if="lastBlock < startBlock" variant="danger" show>The claim period has not started yet for this airdrop. All claims will be rejected by the claim contract until block {{ startBlock }}</b-alert>
          <b-alert v-if="lastBlock >= endBlock" variant="danger" show>The claim period has finished for this airdrop.</b-alert>
          <p> Ubiq makes use of a open proposal process to allow the community to determine what projects they would like to see built and deployed to the network next, and how development funds will be allocated. To participate in the governance system Escher tokens are required. To signal for an Escher airdrop, please complete the following steps: </p>
          <b-tabs>
            <b-tab title="Pyrus">
              <b-alert show>If claiming from a Ledger Nano S, ensure contracts is enabled in the Ubiq application settings on the device.</b-alert>
              <ul>
                <li>Go to the <a href="https://pyrus.ubiqsmart.com/#contracts" target="_blank">Contracts</a> page in Pyrus</li>
                <li>In the <code>Contract Address</code> field insert the contract address displayed on the claim interface (below)</li>
                <li>In the ABI / JSON Interface enter the following:</li>
                <div class="input-group">
                  <pre class="form-control pre-abi"><code translate="no">{{ abi }}</code></pre>
                  <div class="input-group-append">
                    <button class="btn btn-primary btn-append" type="button" v-clipboard:copy="abi" v-clipboard:success="copySuccess" v-clipboard:error="copyError"><i class="fa fa-copy"></i></button>
                  </div>
                </div>
                <li>Press <code>Access</code></li>airdrop
                <li>Select function -> <code>claim</code></li>
                <li>Send the transaction. <strong>Send 0 UBQ</strong>, any claims with more than 0 UBQ included will be rejected by the contract. Ensure you have a very small amount of UBQ (~0.001) to cover the gas fee in the account making the claim. The recommended gas limit is 100000.</li>
              </ul>
            </b-tab>
            <b-tab title="Fusion">
              <ul>
                <li>Go to the <code>CONTRACTS</code> page in Fusion</li>
                <li>Press <code>WATCH CONTRACT</code></li>
                <li>In the <code>CONTRACT ADDRESS</code> field insert the contract address displayed on the claim interface</li>
                <li>In the <code>CONTRACT NAME</code> field enter <code>Escher {{title}}</code></li>
                <li>In the <code>JSON INTERFACE</code> field enter the following:</li>
                <div class="input-group">
                  <pre class="form-control pre-abi"><code translate="no">{{ abi }}</code></pre>
                  <div class="input-group-append">
                    <button class="btn btn-primary btn-append" type="button" v-clipboard:copy="abi" v-clipboard:success="copySuccess" v-clipboard:error="copyError"><i class="fa fa-copy"></i></button>
                  </div>
                </div>
                <li>Press <code>OK</code></li>
                <li>Open <code>Escher {{title}}</code>
                <li>Select function -> <code>claim</code></li>
                <li>Execute from -> Address you wish to claim from</li>
                <li>Press <code>EXECUTE</code>
                <li>Send the transaction. <strong>Send 0 UBQ</strong>, any claims with more than 0 UBQ included will be rejected by the contract. Ensure you have a very small amount of UBQ (~0.001) to cover the gas fee in the account making the claim.</li>
              </ul>
            </b-tab>
          </b-tabs>
          <b-alert show style="margin-top:15px;margin-bottom:0px;">
            No UBQ are transferred when signaling, the claim mechanism simply registers your address for this airdrop. As such, the entire UBQ balance stored at that address would be counted towards the airdrop. The balance at the airdrop claims defined end block ({{endBlock}}) is used, not the balance when the claim is made.
          </b-alert>
        </b-card>
        <b-row>
          <b-col md="6">
            <b-card header="<i class='fa fa-qrcode' style='margin-right:5px;'></i>Contract Address">
              <div class="input-group">
                <div class="input-group-prepend">
                  <Blockie :address="contract" size="med" inline="true"/>
                </div>
                <input class="form-control" type="text" :value="contract" style="margin-left:5px;" readonly></input>
                <div class="input-group-append">
                  <button class="btn btn-primary btn-append" type="button" v-clipboard:copy="contract" v-clipboard:success="copySuccess" v-clipboard:error="copyError"><i class="fa fa-copy"></i></button>
                </div>
              </div>
            </b-card>
          </b-col>
          <b-col md="6">
            <b-card header="<i class='fa fa-check-square' style='margin-right:5px;'></i>Check Your Claim">
              <div class="input-group">
                <div class="input-group-prepend">
                  <Blockie :address="checkAddress" size="med" inline="true"/>
                </div>
                <input class="form-control" type="text" style="margin-left:5px;" placeholder="Enter your address" v-model="checkAddress"></input>
                <div class="input-group-append">
                  <button class="btn btn-primary btn-append" type="button" v-on:click="checkClaim"><i class="fa fa-arrow-right"></i></button>
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="9">
            <b-card header="<i class='fa fa-bar-chart' style='margin-right:5px;'></i>Latest Claims">
              <BarChart :chart-data="charts.bar" :options="chartOptions.bar" :height="300" :styles="{height: '300px'}"/>
            </b-card>
          </b-col>
          <b-col md="3">
            <b-card header="<i class='fa fa-pie-chart' style='margin-right:5px;'></i>Claimed (%)">
              <PieChart :chart-data="charts.pie" :options="chartOptions.pie" :height="350" :styles="{height: '300px'}"/>
            </b-card>
          </b-col>
        </b-row>
        <ClaimsTable :items="claims" :escher="toEscher"></ClaimsTable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import Blockie from '../components/Blockie.vue'
import BarChart from '../components/charts/Bar.vue'
import PieChart from '../components/charts/Pie.vue'
import ClaimsTable from '../components/tables/Claims.vue'

export default {
  name: 'airdrop',
  props: ['contract'],
  watch: {
    '$route' (to, from) {
      this.fetch()
    }
  },
  data () {
    return {
      // contract: '0xd884cd05a38a64239c430ed2ef83df20e496ace4',
      abi: '[{"constant":true,"inputs":[],"name":"endBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"claimersCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"offset","type":"uint256"},{"name":"limit","type":"uint256"}],"name":"getClaimers","outputs":[{"name":"_claimers","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"claimers","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"claims","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_startBlock","type":"uint256"},{"name":"_endBlock","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"claimer","type":"address"}],"name":"onClaim","type":"event"}]',
      title: '-',
      startBlock: '-',
      endBlock: '-',
      multiplier: 1,
      totalClaimedEscher: '-',
      totalClaimedUbiq: '-',
      totalClaims: '-',
      lastBlock: 0,
      claims: [],
      progress: 0,
      checkAddress: '',
      errors: [],
      charts: {
        pie: null,
        bar: null
      },
      // chart options need to be passed as a prop to avoid a vue-chartjs bug
      chartOptions: {
        pie: {
          responsive: true,
          maintainAspectRatio: false
        },
        bar: {
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  },
  created () {
    this.fetch(this.contract)
  },
  components: {
    Blockie,
    BarChart,
    PieChart,
    ClaimsTable
  },
  methods: {
    fetch: function () {
      axios.get('https://escherdrop.ubiqscan.io/getairdrop/' + this.contract)
        .then(response => {
          this.startBlock = response.data.startBlock
          this.endBlock = response.data.endBlock
          this.totalClaimedUbiq = response.data.totalClaimed
          this.lastBlock = response.data.lastBlock
          this.progress = (this.lastBlock - this.startBlock) / (this.endBlock - this.startBlock) * 100
          this.title = response.data.title
          this.multiplier = response.data.multiplier
          this.totalClaimedEscher = this.toEscher(response.data.totalClaimed)
          axios.get('https://api1.ubiqscan.io/v2/getsupply')
            .then(response_ => {
              var percentClaimed = ((this.totalClaimedUbiq / response_.data.result) * 100).toFixed(2)
              this.charts.pie = {
                labels: ['Claimed', 'Unclaimed'],
                datasets: [
                  {
                    backgroundColor: ['#63c2de', '#333333'],
                    data: [percentClaimed, (100 - percentClaimed)]
                  }
                ]
              }
            })
            .catch(e => {
              this.errors.push(e)
            })
        })
        .catch(e => {
          this.errors.push(e)
        })
      axios.get('https://escherdrop.ubiqscan.io/getclaims/' + this.contract)
        .then(response => {
          this.totalClaims = response.data.length
          var latestClaims = response.data
          if (latestClaims.length > 50) {
            latestClaims = latestClaims.slice(latestClaims.length - 50)
          }
          var barChart = {
            data: [],
            labels: []
          }
          latestClaims.forEach(function (claim) {
            barChart['data'].push(claim.balance)
            barChart['labels'].push(claim.address)
          })
          this.charts.bar = {
            labels: barChart.labels,
            datasets: [
              {
                label: 'UBQ',
                backgroundColor: '#63c2de',
                data: barChart.data
              }
            ]
          }
          this.claims = response.data.reverse()
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    toEscher: function (ubq) {
      return (ubq * this.multiplier).toFixed(8)
    },
    copySuccess: function (e) {
      console.log('copied to clipboard')
      this.$notify({
        group: 'bottom',
        text: 'Copied to clipboard'
      })
    },
    copyError: function (e) {
      console.log('unable to copy to clipboard')
      this.$notify({
        group: 'bottom',
        text: 'Unable to copy to clipboard',
        type: 'error'
      })
    },
    checkClaim: function () {
      var validator = new RegExp(/^0x[0-9a-fA-F]{40}$/i)
      if (validator.test(this.checkAddress)) {
        axios.get('https://escherdrop.ubiqscan.io/checkclaim/' + this.contract + '/' + this.checkAddress)
          .then(response => {
            if (response.data.hasClaim === '1') {
              this.$notify({
                group: 'bottom',
                text: 'Claim for address ' + this.checkAddress + ' was received successfully',
                type: 'success'
              })
            } else {
              this.$notify({
                group: 'bottom',
                text: 'Claim for address ' + this.checkAddress + ' not found',
                type: 'error'
              })
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        this.$notify({
          group: 'bottom',
          text: 'Invalid address',
          type: 'error'
        })
      }
    }
  }
}
</script>
