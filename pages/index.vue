<template>
  <div></div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'appmain',
  components: {},
  middleware: 'authenticated',
  computed: {
    ...mapGetters({
      isLoggedIn: 'usuario/loggedin'
    })
  }
})
export default class Main extends Vue {
  isLoggedIn!:Boolean
  mounted () {
    if (this.isLoggedIn) this.$router.push('/dashboard')
  }
}
</script>

<style lang="scss">
html, body {
  background: #7e6f8d;
}
</style>
