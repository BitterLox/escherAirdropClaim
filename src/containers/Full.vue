<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Sidebar, Footer as AppFooter, Breadcrumb } from '../components/'
import axios from 'axios'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  data () {
    return {
      nav: nav.items,
      airdrops: {
        active: [],
        pending: [],
        completed: []
      },
      errors: []
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  },
  created () {
    this.populateNavChildren()
  },
  methods: {
    populateNavChildren: function () {
      axios.get('https://escherdrop.ubiqscan.io/getstats')
        .then(response => {
          axios.get('https://escherdrop.ubiqscan.io/getairdrops')
            .then(response_ => {
              response_.data.forEach(function (airdrop) {
                if (response.data.block < airdrop.startBlock) {
                  this.airdrops.pending.push({
                    name: airdrop.title,
                    url: '/airdrop/' + airdrop.contract,
                    icon: 'fa fa-plane'
                  })
                } else if (response.data.block > airdrop.endBlock) {
                  this.airdrops.completed.push({
                    name: airdrop.title,
                    url: '/airdrop/' + airdrop.contract,
                    icon: 'fa fa-plane'
                  })
                } else {
                  this.airdrops.active.push({
                    name: airdrop.title,
                    url: '/airdrop/' + airdrop.contract,
                    icon: 'fa fa-plane'
                  })
                }
              }, this)
              if (this.airdrops.active.length > 0) {
                this.nav.push({
                  name: 'Active',
                  url: '/active',
                  icon: 'fa fa-spinner',
                  children: this.airdrops.active
                })
              }
              if (this.airdrops.pending.length > 0) {
                this.nav.push({
                  name: 'Pending',
                  url: '/pending',
                  icon: 'fa fa-clock-o',
                  children: this.airdrops.pending
                })
              }
              if (this.airdrops.completed.length > 0) {
                this.nav.push({
                  name: 'Completed',
                  url: '/completed',
                  icon: 'fa fa-check',
                  children: this.airdrops.completed
                })
              }
            })
            .catch(e => {
              console.log(e)
              this.errors.push(e)
            })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
