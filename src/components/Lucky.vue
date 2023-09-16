<template>
  <div>
    <p>剩余抽奖次数: {{ userTakeLeftCount }}</p>
  </div>
  <LuckyWheel
      ref="myLucky"
      width="300px"
      height="300px"
      :prizes="prizes"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallback"
      @end="endCallback"
  />

  <p>收到奖品</p>
  <div>
    <p ref="receivedPrizes" v-for="(prize, index) in receivedPrizes" :key="index">
       {{ prize }}
    </p>
  </div>
</template>

<script>
import { LuckyWheel } from "@lucky-canvas/vue";
import axios from 'axios';
import {useRoute} from "vue-router";
import router from "@/router";
import { useRouter } from 'vue-router';

export default {
  name:"Lucky",
  components:{LuckyWheel},
  // props: {
  //   uId: String,
  //   activityId: String,
  // },
  data () {
    return {
      blocks: [{ padding: '13px', background: '#617df2' }],
      prizes: [
        // { fonts: [{ text: '0', top: '10%' }], background: '#e9e8fe' },
        // { fonts: [{ text: '1', top: '10%' }], background: '#b8c5f2' },
        // { fonts: [{ text: '2', top: '10%' }], background: '#e9e8fe' },
        // { fonts: [{ text: '3', top: '10%' }], background: '#b8c5f2' },
        // { fonts: [{ text: '4', top: '10%' }], background: '#e9e8fe' },
        // { fonts: [{ text: '5', top: '10%' }], background: '#b8c5f2' },
      ],
      buttons: [{
        radius: '35%',
        background: '#8a9bf3',
        pointer: true,
        fonts: [{ text: 'Start', top: '-10px' }]
      }],
      awardNames: [],
      uId: '',
      activityId: '',
      userTakeLeftCount: '',
      responseCode:'',
      responseInfo:'',
      receivedPrizes: [],
      router: useRouter(),
    }
  },
  created() {
    /** 初始化奖品数据 */
    const route = useRoute();
    this.uId = route.query.uId;
    this.activityId = route.query.activityId;
    this.initPrizeList();
  },
  methods: {
    initPrizeList() {

      axios.get("http://localhost:8082/api?activityId="+this.activityId).then((res) => {
        this.awardNames = res.data.initDto.awardName;
        this.userTakeLeftCount = res.data.initDto.userTakeLeftCount;
        this.prizes = this.awardNames.map((awardName, index) => {
          console.log(`AwardName: ${awardName}, Index: ${index}`);
          return {
            fonts: [{ text: awardName, top: '10%' }],
            background: index % 2 === 0 ? '#e9e8fe' : '#b8c5f2'
          };
        });
      }, (err) => {
        console.log(err);
      });
    },
    startCallback () {
      let prize;
      let index;
      /** 调用抽奖组件的play方法开始游戏 */
      this.$refs.myLucky.play()
      /** 调用接口异步抽奖 */
      setTimeout(() => {
        console.log("sent")
        axios.post("http://localhost:8082/api",
            { uId: this.uId, activityId: this.activityId }).then((res) => {
          this.responseCode = res.data.result.code;
          console.log("res" + res.data.result.code)
          if(this.responseCode!=="0000"){
            this.responseInfo = res.data.result.info;
            window.alert(this.responseInfo);
            const router = this.router;
            router.push({
              path: '/'
            });
          }
          else{
            prize = res.data.drawDto.awardName;
            console.log("中奖：",res.data.drawDto.awardName);
            console.log("left：",res.data.drawDto.userTakeLeftCount);
            index = this.awardNames.indexOf(prize);
            this.userTakeLeftCount = res.data.drawDto.userTakeLeftCount;
            console.log("index "+index);
            this.receivedPrizes.push(prize);
            /** 调用stop停止旋转并传递中奖索引 */
            this.$refs.myLucky.stop(index);
          }
        }, (err) => {
          console.log(err);
        });
      }, 3000)
    },
    // 抽奖结束会触发end回调
    endCallback (prize) {
      console.log(prize)
    },
  }
}
</script>
