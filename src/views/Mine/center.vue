<template>
  <div>
      <div>个人中心</div> 
      <div>当前用户:{{ $store.state.user.name }} <a  href="javascript:;" @touchstart="handletoLogin">退出</a></div>
      <div v-if="$store.state.user.isAdmin">用户身份:管理员 <a href="/admin" target="_blank">登录后台管理系统</a></div>
      <div v-else>用户身份:普通会员</div>
      <div>
          <input type="file" name="file" id="userHeadFile" value="上传图片" @change="handleToUpload">
          <img class="userHead" :src="$store.state.user.userHead" alt="">
      </div>
  </div>
</template>sdsd

<script>
import { messageBox } from '@/components/JS'
import axios from 'axios'
export default {
  name : 'center',
  data () {
      return{

      }
  },
  methods : {
      handletoLogin(){
        this.axios.get('/api2/users/logOut').then((res) => {
            let status = res.data.status;
            let that = this
            if(status == 0){
                window.localStorage.removeItem('name')
                window.localStorage.removeItem('isAdmin')
                this.$store.commit('user/USER_NAME',{ name :'', isAdmin :false,userHead:'' })
                messageBox({
                    title : '退出',
                    content : '确定退出',
                    ok : '确定',
                    cancel : '取消',
                    handleOk(){
                        that.$router.push('/mine/login')
                    }
                })
            }
        })
      },
      handleToUpload(ev){
          var file = ev.target.files[0]
          var param = new FormData();
          param.append('file' , file , file.name)
          var config = { 
              headers : {
                  'Content-Type' : 'multipart/form-data'
              }
          }
          this.axios.post('/api2/users/uploadUserHead',param,config).then(res => {
              let status = res.data.status
              let that = this
              if(status == 0){
                  messageBox({
                      title : '信息',
                      content : '上传图片成功',
                      ok : '确定',
                      handleOk(){
                         that.$store.commit('user/USER_NAME',
                         { 
                            name :res.data.data.username , 
                            isAdmin : res.data.data.isAdmin,
                            userHead : res.data.data.userHead + "?" + Math.random()
                         })
                      }
                  })
              }
          })
      }
  },
   beforeRouteEnter (to, from, next) {  //无this  注意这个事项 
     axios.get('/api2/users/getUser').then((res)=> {
        let status = res.data.status
        if(status == 0){
            window.localStorage.setItem('name', res.data.data.username)
            window.localStorage.setItem('isAdmin',res.data.data.isAdmin)
            next(vm=>{
                vm.$store.commit('user/USER_NAME',
                { 
                    name :res.data.data.username , 
                    isAdmin : res.data.data.isAdmin,
                    userHead : res.data.data.userHead
                 })
            });
        }else{
            next('/mine/login')
        }
     })
   }
}

</script>
<style  scoped>
.userHead{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px;
}
</style>