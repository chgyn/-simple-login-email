import { Component, Vue, Prop, Inject, Watch } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'

@Component({
  name: 'list-menu-item'
})
export default class ListItemMenu extends Vue {
  @Prop({ type: Object }) item!: any
  @Prop({ type: String, default: '' }) level!: string
  @Prop({ type: Boolean, default: false }) first!: boolean
  @Inject() instance!: any | VNode

  clickHandler (e:any) {
    const itemId = this.item.id
    this.$router.push({ path: `/dashboard/${itemId}`})
  }

  render (): VNode {
    const { item, first, level } = this
    const { subMenus = [] } = item
    const child = subMenus

    return child?.length === 0 ? (
      <el-menu-item class={[{ first: first }]} {...{
        props: {
          index: `${level}`
        },
        on: {
          click: this.clickHandler
        }
      }}>
        <div class={['hold-item']}>
          <span>{item?.name}</span>
        </div>
      </el-menu-item>
    ) : (
      <el-submenu class={[{ first: first }]} {...{
        props: {
          index: `${level}`,
          popperAppendToBody: false
        }
      }}>
        <template slot="title">
          <div class={['hold-item']}>
              <span>{item?.name}</span>
          </div>
        </template>
        {child && child.map((childMenu: any, _i: any) => {
              return (
                <ListItemMenu {...{
                  props: {
                    level: `${level}-${_i}`,
                    item: childMenu
                  }
                }} />
              )
            })}
      </el-submenu>
    )
  }
}
