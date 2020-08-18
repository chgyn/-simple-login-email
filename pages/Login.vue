<template>
  <div class="login">
      <el-container>
          <el-row type="flex" justify="center">
              <el-col :span="6" class="hold-form">
                  <h2>Login</h2>
                  <el-form>
                      <el-form-item label="Usuário">
                        <el-input type="text" v-model="form.name" />
                      </el-form-item>
                      <el-form-item label="Senha">
                        <el-input type="password" v-model="form.password" />
                      </el-form-item>
                      <el-button @click="Enviar">Login</el-button>
                  </el-form>
              </el-col>
          </el-row>
      </el-container>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import { UserForm } from '@/types'

@Component({
  name: 'login',
  components: {},
  methods: {
    ...mapActions({
      login: 'usuario/login'
    })
  }
})
export default class Main extends Vue {
  form: UserForm = {
    name: undefined,
    password: undefined
  }

  login!: Function
  Enviar () {
    const success = this.login(this.form)
    if (success) this.$router.push('/')
  }
}
</script>

<style lang="scss">
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    height: 100vh;
    overflow: hidden;
}

.hold-form {
  display: flex;
  flex-flow: column;
  justify-content: center;
  min-height: 300px;
}
</style>
