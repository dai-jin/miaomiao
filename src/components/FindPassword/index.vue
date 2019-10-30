<template>
  <div class="findPassword_body">
      <div>
          <label>邮箱:</label> <input v-model="email" type="text" class="findPassword_text" placeholder="请输入邮箱" />
      </div>
      <div>
          <label>密码:</label> <input v-model="password" type="password" class="findPassword_text" placeholder="请输入密码" />
      </div>
      <div class="findPassword_div">
          <input class="findPassword_btn" type="button" value="修改密码" @touchstart="handleToUpdatePassword" />
      </div>
  </div>
</template>

<script>
import { messageBox } from '@/components/JS'
export default {
  name : 'FindPassword',
  data () {
      return {
         email : '',
         password : '',
      }
  },
  methods : {
      handleToUpdatePassword(){
          this.axios.post('/api2/users/findPassword',{
              email : this.email,
              password : this.password
          },(res)=>{
              let status = res.data.status
              let This = this;
              if(status == 0){
                  messageBox({
                      title : '修改密码',
                      content : '修改密码成功',
                      ok : '确定',
                      handleOk(){
                        This.$router.push('/mine/login'); 
                      }
                  })
              }else{
                   messageBox({
                      title : '修改密码',
                      content : '修改密码失败',
                      ok : '确定'
                  })
              }
          })
      }
  }
}

</script>
<style  scoped>
.findPassword_body{  width:100%;padding:10px;box-sizing: border-box;}
.findPassword_body  .findPassword_div{display: flex;}
.findPassword_body .findPassword_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.findPassword_body .findPassword_btn{ height:50px; margin:10px;}
.findPassword_body  input.findPassword_btn{  background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;flex: 1}
.findPassword_body .findPassword_link{ display: flex; justify-content:space-between;}
.findPassword_body .findPassword_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>