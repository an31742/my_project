<template>
    <div class="StaffManagement">
      <div class="stationManagement">
        <div class="stationManagement-tooltip">拖拽人员到相应班别，进行人员绑定</div>
        <FitDiv :text="'岗位管理'">
          <template>
            <div class="stations">
              <div class="stations-one">
                <div class="stations-one_station"><span>工站</span></div>
                <div class="stations-one_day">白班</div>
                <div class="stations-one_night">夜班</div>
              </div>
              <div class="stations-one" v-for="(item, index) of staffData" :key="index">
                <div class="stations-one_station"><span>{{item.station}}</span></div>
                <div class="stations-one_day" @drop="drop(item, 'dayStaff')" @dragover.prevent>
                  <div class="staffs-name">
                    <div style="display: inline-block;margin: 2px;" v-for="(day, _index) of item.dayStaff" :key="_index">{{day}}</div>
                  </div>
<!--                  <div class="addStaff">-->
<!--                    <span class="icon-alijiahao"></span>-->
<!--                  </div>-->
                </div>
              <div class="stations-one_night" @drop="drop(item, 'nightStaff')" @dragover.prevent>
                <div class="staffs-name">
                  <div style="display: inline-block;margin: 2px;" v-for="(night, _index) of item.nightStaff" :key="_index">{{night}}</div>
                </div>
<!--                <div class="addStaff">-->
<!--                  <span class="icon-alijiahao"></span>-->
<!--                </div>-->
              </div>
            </div>
          </div>
        </template>
      </FitDiv>
    </div>
    <div class="staffTable">
      <FitDiv :text="'人员列表'">
        <template>
          <div class="staffTable-table">
            <div v-for="(infos, index) of getPersons" :key="index" class="staffTable-table-tr">
              <div v-for="(info, _index) of infos" :key="_index" class="staffTable-table-tr-td"
                   :style="{backgroundColor: info.isBind?'red':'',color:info.isBind?'#123548':''}"
                   @mouseenter.stop="info.isBind ? mousePosition = `${index}-${_index}`:(void 0)"
                   @mouseleave.stop="info.isBind ? mousePosition = '':(void 0)"
                   @dragstart.stop="info.name ? dragStart({
                    event: $event,
                    line: index,
                    row: _index,
                    info: info
                  }):(void 0)" @dragover.prevent :draggable="(!!info.name && !info.isBind)">
                <span v-show="!(info.isBind && mousePosition === `${index}-${_index}`)">{{info.name}}</span>
                <Button @click.stop="unBind(`${index}-${_index}`),info.isBind = false" type="error" size="small" v-show="info.isBind && mousePosition === `${index}-${_index}`">解绑</Button>
              </div>
            </div>
          </div>
        </template>
      </FitDiv>
    </div>
  </div>
</template>

<script>
// import { Button } from 'view-design'
export default {
  name: 'StaffManagement',
  // components: {
  //   Button
  // },
  computed: {
    getPersons () {
      const persons = []
      const lineNumber = 9
      for (let i = 0, total = Math.ceil(this.personsInfo.length / lineNumber); i < total; ++i) {
        if (i === (total - 1)) {
          const remainder = this.personsInfo.length % lineNumber
          if (remainder) {
            persons.push(this.personsInfo.slice(i * lineNumber, (i + 1) * lineNumber).concat(new Array(lineNumber - remainder).fill({ name: '', isBind: false })))
          }
        } else {
          persons.push(this.personsInfo.slice(i * lineNumber, (i + 1) * lineNumber))
        }
      }
      return persons
    }
  },
  data () {
    return {
      // staffData:[
      //   {station: 'A',
      //   dayStaff: ['李飞飞', '赵宇'],
      //   nightStaff: ['陈瑞', '郭将月']},
      //   {station: 'B',
      //     dayStaff: ['李雪倩', '段锐旗'],
      //     nightStaff: ['肖战', '胡歌']},
      //   {station: 'C',
      //     dayStaff: ['任天', '黄琪'],
      //     nightStaff: ['王星星', '王峰']},
      //   {station: 'D',
      //     dayStaff: ['陈玉', '蔡茂'],
      //     nightStaff: ['李国强', '刘智']},
      //   {station: 'E',
      //     dayStaff: ['董峰', '冯琦'],
      //     nightStaff: ['林平', '吴迪']},
      // ],
      staffData: [
        {
          station: 'A',
          dayStaff: [],
          nightStaff: []
        },
        {
          station: 'B',
          dayStaff: [],
          nightStaff: []
        },
        {
          station: 'C',
          dayStaff: [],
          nightStaff: []
        },
        {
          station: 'D',
          dayStaff: [],
          nightStaff: []
        },
        {
          station: 'E',
          dayStaff: [],
          nightStaff: []
        }
      ],
      personsInfo: [{ name: '李飞飞', isBind: false }, { name: '林平', isBind: false }, { name: '吴迪', isBind: false }, { name: '董峰', isBind: false },
        { name: '冯琦', isBind: false }, { name: '李国强', isBind: false }, { name: '刘智', isBind: false }, { name: '陈玉', isBind: false },
        { name: '蔡茂', isBind: false }, { name: '王星星', isBind: false }, { name: '王峰', isBind: false }, { name: '任天', isBind: false },
        { name: '段锐旗', isBind: false }, { name: '肖战', isBind: false }, { name: '胡歌', isBind: false }, { name: '李雪倩', isBind: false },
        { name: '陈瑞', isBind: false }, { name: '郭将月', isBind: false }, { name: '赵宇', isBind: false }
      ],
      // 通过hash存储绑定的值，方便解绑使用
      bindData: {},
      tempStaff: null,
      mousePosition: ''
    }
  },
  created () {
    // new Array(30).fill(1).forEach(() => {
    //   this.personsInfo.push({name:'666',isBind: false});
    // })
  },
  methods: {
    dragStart ({ event, line, row, info }) {
      // 火狐进行拖拽事件必须携带数据，所以没有数据也要添加数据
      if (this.$store.state.browerInfo === 'firefox') {
        event.dataTransfer.setData('text', null)
      }
      // IE拖拽不能添加数据，可以在拖拽时把数据放到全局变量进行操作
      this.tempStaff = { info, line, row }
    },
    drop (data, type) {
      if (!this.tempStaff.info.isBind) {
        this.tempStaff.info.isBind = true
        this.bindData[`${this.tempStaff.line}-${this.tempStaff.row}`] =
          [data.station, type, data[type].push(this.tempStaff.info.name) - 1]
      }
    },
    unBind (key) {
      this.staffData.find(e => this.bindData[key][0] === e.station)[this.bindData[key][1]].splice(this.bindData[key][2], 1)
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "../styles/_colors.scss";
.StaffManagement {
  height: 500px;
  width: calc(100% - 20px);
  margin: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .stationManagement {
    position: relative;
    background-color: #001529;
    height: 48%;
    width: 100%;
    &-tooltip {
      position: absolute;
      top: 1%;
      right: 2%;
    }
    .stations {
      height: calc(100% - 20px);
      margin: 10px 10px;
      vertical-align: middle;
      &-one {
        vertical-align: middle;
        height: 100%;
        width: 120px;
        display: inline-block;
        margin: 0 1%;
        @mixin stationStyle {
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100% / 3);
          overflow: auto;
          flex-wrap:wrap;
        }
          .staffs-name {
            width: 60%;
          }

        &_station {
          @include stationStyle();
          background-color: red;
        }
        &_day {
          @include stationStyle();
          background-color: re d;
          border-bottom: 0.5px solid green;
        }
        &_night {
          @include stationStyle();
          background-color: red;
          border-top: 0.5px solid green;
        }
      }
    }
  }
  .staffTable {
    height: 48%;
    width: 100%;
    background-color: #001529;
    &-table {
      height: calc(100% - 20px);
      width: 96%;
      margin: 10px auto;
      &-tr {
        height: 30px;
        display: flex;
        justify-content: space-around;
        &:nth-child(odd) {
          background-color: yellow;
        }
        &:nth-child(even) {
          background-color: red;
        }
        &-td {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          line-height: 30px;
          width: calc(100% / 10);
          text-align: center;
        }
      }
    }
  }
}
</style>
