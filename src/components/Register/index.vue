<template>
  <div class="register_body">
      <div>
          <label>用户名:</label> <input v-model="username" type="text" class="register_text" placeholder="请输入用户名" />
      </div>
      <div>
          <label>密码:</label> <input v-model="password" type="password" class="register_text" placeholder="请输入密码" />
      </div>
      <div>
          <label>确定密码:</label> <input v-model="repassword" type="password" class="register_text" placeholder="确定密码" />
      </div>
      <div>
          <label>邮箱:</label> <input v-model="email" type="text" class="register_text" placeholder="请输入邮箱" />
      </div>
      <div class="register_div">
          <input class="register_btn" type="button" value="注册" @touchstart="handleToRegister" />
      </div>
  </div>
</template>

<script>
import { messageBox } from '@/components/JS'
export default {
  name : 'Register',
  data () {
      return {
          username : '',
          password : '',
          repassword : '',
          email : ''
      }
  },
  methods : {
      handleToRegister(){
          if(this.password !== this.repassword){
              messageBox({
                  title : '密码',
                  content : '密码两次输入不一致',
                  ok : '确定',
              })
              return;
          }
          this.axios.post('/api2/users/register',{
                username : this.username,
                password : this.password,
                email : this.email,
           }).then((res) =>{
              let status = res.data.status
              let This = this;
              if(status == 0){
                  messageBox({
                      title : '注册',
                      content : '注册成功',
                      ok : '确定',
                      handleOk(){
                        This.$router.push('/mine/login'); 
                      }
                  })
              }else{
                   messageBox({
                      title : '注册',
                      content : '注册失败',
                      ok : '确定'
                  })
              }
          })
      }
  }
}

</script>
<style  scoped>
.register_body{  width:100%;padding:10px;box-sizing: border-box;}
.register_body  .register_div{display: flex;}
.register_body .register_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.register_body .register_btn{ height:50px; margin:10px;}
.register_body  input.register_btn{  background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;flex: 1}
.register_body .register_link{ display: flex; justify-content:space-between;}
.register_body .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>