<template>
  <div class="container">
    <Split style="height: 500px;">
        <SplitArea :size="25">
            <el-container class="hold-leftbar">
                <el-row type="flex">
                    <el-col :span="24" class="user">
                        <el-popover
                            placement="bottom"
                            width="160">
                            <el-button size="small" @click.native="logout">Logout</el-button>
                            <el-avatar slot="reference" :size="60">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSYkiuKIerNcNp1RkNAuGpRC9YhnYBBjekRUA&usqp=CAU" />
                            </el-avatar>                            
                        </el-popover>
                    </el-col>
                    <el-col :span="24">
                        <list-menu :menus="menus" />
                    </el-col>
                </el-row>
            </el-container>
        </SplitArea>
        <SplitArea :size="75">
            <el-container class="hold-rightbar">
                <NuxtChild :key="$route.params.id" />
            </el-container>
        </SplitArea>
    </Split>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import listMenu from '@/components/list-menu/list-menu'
import { mapActions } from 'vuex'

@Component({
  name: 'dashboard',
  components: {
      listMenu
  },
  middleware: 'authenticated',
  async asyncData({ $axios }:any) {
    const menus = await $axios.$get('http://my-json-server.typicode.com/workinideas/vagafrontendteste/menus')
    return { menus }
  },
  methods: {
    ...mapActions({
      logoutUser: 'usuario/logout'
    })
  }
})
export default class Main extends Vue {
  menus:Array<any> = []

  logoutUser!: Function
  logout () {
    const succes = this.logoutUser()
    if (succes) this.$router.push('/login')
  }
}
</script>

<style lang="scss" scoped>

.split {
  height: 100vh !important;
  .split-horizontal {
    background: #7e6f8d;
  }
}
.hold {
  &-leftbar, &-rightbar {
    padding: 20px;
    height: 100%;
  }

  &-leftbar {
    .user {
      margin-bottom: 20px;
      ::v-deep .el-avatar {
        img {
          border: 5px solid white;
        }
      }
    }
    > .el-row {
      flex-flow: column;
    }
  }

  &-rightbar {
    ::v-deep .el-card {
      & + .el-card {
        margin-top: 20px;
      }
    }
  }
}
</style>
