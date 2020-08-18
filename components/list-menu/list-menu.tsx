import { Component, Vue, Prop, Provide } from 'nuxt-property-decorator'
import listMenuItem from '@/components/list-menu/list-menu-item/list-menu-item'


@Component({
  name: 'list-menu',
  components: {
    listMenuItem
  }
})
export default class ListMenu extends Vue {
  @Provide() instance = this
  @Prop({ default: () => ([]) }) menus!:Array<any>

  render() {
    const { menus } = this

    const rendeMenus = () => menus.map((mItem, _i) => {
      let { id } = mItem
      let index = String(id)
      console.log(id, index)
      return (
        <listMenuItem {...{
          props: {
            first: true,
            level: index,
            item: mItem
          }
        }} />
      )
    })
    return (
      <el-menu class={['hold-menu']}>
        {rendeMenus()}
      </el-menu>
    )
  }
}
