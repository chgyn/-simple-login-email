import { Component, Vue } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'
import cardDashboard from '@/components/card-dashboard/card-dashboard'

@Component({
  name: 'dashboard-id',
  components: {
    cardDashboard
  },
  middleware: 'authenticated',
  async asyncData(ctx:any) {
    const { id } = ctx.route.params
    if (id) {
        const request = await ctx.$axios.$get(`http://my-json-server.typicode.com/workinideas/vagafrontendteste/items/${id}`)
        const { subMenuItems } = request
        const listagem = subMenuItems
        return { listagem }
    }
    return {}
  }
})
export default class DashboardId extends Vue {
  listagem:Array<any> = []

  selectedItems:String[] = []

  selectItem (item:string) {
    this.$nextTick(() => {
      if (!this.selectedItems.includes(item)) this.selectedItems.push(item)
    })
    this.$forceUpdate()
  }

  unSelectItem (item:string) {
    this.$nextTick(() => {
      if (this.selectedItems.includes(item)) {
        this.selectedItems = this.selectedItems.filter(n => n !== item)
      }
    })
  }

  arquivarItems ():void {
    this.listagem = this.listagem.filter(item => {
      return !this.selectedItems.includes(item.id)
    })
  }

  render (): VNode {
    const { listagem, selectedItems } = this
    return (
      <div class={['dashId']}>
        {listagem.length > 0  && (
          <div class={['filters']}>
            <el-button {...{
              props: {
                disabled: selectedItems.length === 0
              },
              on: {
                click: this.arquivarItems
              }
            }}>arquivar</el-button>
          </div>
        )}
        <div class={['hold-cards']}>
          {listagem.length > 0 ? listagem.map(item => {
            return <cardDashboard {...{
              props: {
                item,
                defaultSelection: selectedItems
              },
              on: {
                select: this.selectItem,
                unselect: this.unSelectItem
              },
              key: `item-${item.id}`
            }}/>
          }) : (
            <div class={['no-items']}>Você não tem items para arquivar</div>
          )}
        </div>
      </div>
    )
  }
}