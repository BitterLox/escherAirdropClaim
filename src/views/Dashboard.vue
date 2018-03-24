<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">0</h4>
            <p>Airdrops Completed</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">0</h4>
            <p>In Circulation (ESCH)</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{totalClaims}}</h4>
            <p>Total Claims</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{currentBlock}}</h4>
            <p>Current Block</p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-card header="<i class='fa fa-info-circle icon-left'></i>What is Escher?">
          <p>
            Escher (ESCH) is a token on the Ubiq platform, its first utility will be voting in the Ubiq governance system, representing a votes weight. Its utility may be extended in future in the form of protocol tokens, either using ESCH itself, or an airdrop of protocol tokens to ESCH hodlers, or ESCH redeemable for a protocol token. It is intended to be multipurpose and will form the basis of proposals and protocol token implementations, e.g: Used as a protocol token for Ubiqs own decentralized exchange (in place of ZRX), or used in place of RDN for off chain Raiden transactions on Ubiq.
          </p>
        </b-card>
      </b-col>
      <b-col md="3">
        <b-card header="<i class='fa fa-spinner icon-left'></i>Get Escher">
          <p>
            Escher will be distributed in a series of airdrops (one each quarter) for the forseeable future. Users must submit a claim by interacting with a smart contract to signal they wish to participate in the airdrop. A new claim must be submitted for each airdrop.
          </p>
        </b-card>
      </b-col>
      <b-col md="3">
        <b-card header="<i class='fa fa-users icon-left'></i>Governance">
          <p>
            Ubiq makes use of a open proposal process to allow the community to determine what projects they would like to see built and deployed to the network next, how development funds will be allocated, and how the community feels about various complex topics.
          </p>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <b-card header="<i class='fa fa-plane icon-left'></i>Airdrop Schedule">
          <b-col md="12">
            <b-row class="text-center">
              <label class="btn btn-info timeline-label">2018</label>
            </b-row>
          </b-col>
          <div class="timeline">
            <div class="timeline-container in-progress left">
              <div class="timeline-content in-progress">
                <h3>Block 423,300</h3>
                <p>End of test claim period.</p>
                <p>No Escher will be airdropped, the test claim is to allow users to familarize themselves with the claim process.</p>
                <strong>Status: in progress</strong>
              </div>
            </div>
            <div class="timeline-container in-progress right">
              <div class="timeline-content in-progress">
                <h3>Block 448,000</h3>
                <p>End of Escher airdrop claim period #1, estimated to be 25th of April.</p>
                <p>Escher will be airdropped at a 12ESCH per 1UBQ ratio to all participants.</p>
                <strong>Status: in progress</strong>
              </div>
            </div>
            <div class="timeline-container pending left">
              <div class="timeline-content pending">
                <h3>Block 536,800</h3>
                <p>End of Escher airdrop claim period #2, estimated to take place in July.</p>
                <p>Escher will be airdropped at a 12ESCH per 1UBQ ratio to all participants.</p>
                <strong>Status: pending</strong>
              </div>
            </div>
            <div class="timeline-container pending right">
              <div class="timeline-content pending">
                <h3>Block 625,600</h3>
                <p>End of Escher airdrop claim period #3, estimated to take place in October.</p>
                <p>Escher will be airdropped at a 12ESCH per 1UBQ ratio to all participants.</p>
                <strong>Status: pending</strong>
              </div>
            </div>
            <b-col md="12">
              <b-row class="text-center">
                <label class="btn btn-info timeline-label">2019</label>
              </b-row>
            </b-col>
            <div class="timeline-container pending left">
              <div class="timeline-content pending">
                <h3>Block 714,400</h3>
                <p>End of Escher airdrop claim period #4, estimated to take place in January.</p>
                <p>Escher will be airdropped at a 12ESCH per 1UBQ ratio to all participants.</p>
                <strong>Status: pending</strong>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'dashboard',
  data () {
    return {
      currentBlock: '-',
      totalClaims: '-',
      errors: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch: function () {
      axios.get('https://escherdrop.ubiqscan.io/getstats')
        .then(response => {
          this.currentBlock = response.data.block
          this.totalClaims = response.data.claims
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
