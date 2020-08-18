import { Component, Vue, Prop } from 'nuxt-property-decorator'
import listMenuItem from '@/components/list-menu/list-menu-item/list-menu-item'


@Component({
  name: 'card-dashboard',
  components: {
    listMenuItem
  }
})
export default class CardDashboard extends Vue {
  @Prop({ default: () => ({}) }) item!:any
  @Prop({ default: () => ({}) }) defaultSelection!:Array<string|null>

  checked:boolean = false
  hover:boolean = false

  mouseOver ():void {
    this.hover = true
  }
  mouseLeave ():void {
    this.hover = false
  }

  changeSelection (val:boolean) {
    const { item } = this
    if (val) {
      this.$emit('select', item.id)
    } else {
      this.$emit('unselect', item.id)
    }
  }

  render() {
    const { item, defaultSelection } = this
    const hasItems = defaultSelection.length > 0
    return (
    <el-card class="box-card" {...{
      nativeOn: {
        mouseover: this.mouseOver,
        mouseleave: this.mouseLeave
      }
    }}>
      <el-row>
        <el-col {...{ props: { span: 2 }}} class={['hold-selection']}>
          <el-checkbox class={['pin']} vModel={this.checked} {...{
            style: {
              visibility: hasItems ? 'visible' : this.hover ? 'visible' : 'hidden'
            },
            on: {
              change: (val:boolean) => this.changeSelection(val)
            }
          }}></el-checkbox>
          <el-avatar class={['pin']} {...{
            style: {
              visibility: hasItems ? 'hidden' : !this.hover ? 'visible' : 'hidden'
            }
          }}> {item.owner} </el-avatar>
        </el-col>
        <el-col {...{ props: { span: 16 }}}>
        <ul>
            <li>
              {item.name}
            </li>
            <li>
              {item.subject}
            </li>
        </ul>
        </el-col>
        <el-col {...{ props: { span: 6 }}}>
        {
          item.users.map((user:string) => {
            return (
              <el-avatar> {user} </el-avatar>
            )
          })
        }
        </el-col>
      </el-row>
    </el-card>
    )
  }
}
