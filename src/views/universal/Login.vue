<template>
  <div class="login-container" @click.stop="blank">
    <el-form
      ref="userCredential"
      :model="userCredential"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div>
        <img :src="greetingImg" />
      </div>
      <h3 class="title">Zillion's Blog</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="userCredential.username"
          v-on:click.stop="greeting"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-on:click.stop="blindfold"
          :type="pwdType"
          v-model="userCredential.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          v-on:keyup.enter="handleSignIn"
        />
      </el-form-item>
      <el-form-item align="center">
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          v-on:click.prevent="handleSignIn"
        >
          Sign in
        </el-button>
        <el-divider></el-divider>
        <el-button
          :loading="loading"
          style="width: 80%"
          v-on:click.prevent="handleSignUpWithoutKaptcha"
        >
          Sign up
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="kaptchaVisible" title="输入验证码">
      <img :src="kaptcha" />
      <el-input v-model="userCredential.kaptcha" name="kaptcha" />
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%"
        v-on:click.prevent="handleSignUp"
        >Comfirm
      </el-button>
    </el-dialog>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  /*background-color: #b8e5f8;*/
  background-size: cover;
  background-position: 50% 80%;
  background-image: url("../../assets/login/background.png");
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 432px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background-color: #fff;

    div > img {
      position: absolute;
      top: 0;
      left: 50%;
      width: 5rem;
      -webkit-transform: translate(-50%, -83%);
      transform: translate(-50%, -83%);
      z-index: 1;
    }
  }
  .tips {
    font-size: 14px;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #0084ff;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #4d5155;
    cursor: pointer;
    user-select: none;
  }
}
</style>

<script lang='ts'>
import normal from "../../assets/login/stand.png";
import blindfold from "../../assets/login/close_eyes.png";
import greeting from "../../assets/login/hello.png";
import { kaptcha, signIn, signUp } from "../../api/user";
import { UserCredential } from "../../api/type/Request";
import { ElMessageBox } from "element-plus";

export default {
  name: "Login",
  data() {
    return {
      img: {
        normal: normal,
        blindfold: blindfold,
        greeting: greeting,
      },
      greetingImg: normal,

      userCredential: {} as UserCredential,
      loading: false,
      pwdType: "password",
      // 进入该页面之前的页面,用户登陆后重定位
      redirect: undefined as string | undefined,
      // 验证码显示指示变量
      kaptchaVisible: false,
      kaptcha: "",
      token: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    blank() {
      this.greetingImg = this.img.normal;
    },
    blindfold() {
      this.greetingImg = this.img.blindfold;
    },
    greeting() {
      this.greetingImg = this.img.greeting;
    },
    handleSignIn() {
      this.loading = true;
      signIn(this.userCredential)
        .then((res) => {
          console.log(res);
          this.$store.commit("setUser", res.data);
          if (this.redirect === undefined) {
            this.$router.push({ path: "/" });
          } else {
            this.$router.push({ path: this.redirect });
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          console.log("登陆失败");
          ElMessageBox.alert("登陆失败");
        });
    },
    // 点击注册按钮后,请求验证码
    handleSignUpWithoutKaptcha() {
      this.loading = true;
      kaptcha().then((res) => {
        // 获得隐藏在验证码图片中的token:
        let token = new Uint8Array(res.slice(0, 4));
        console.log(token);
        for (var i = 0; i < token.length; i++) {
          this.token += String.fromCharCode(token[i]);
        }
        // 获得验证码数据:
        let kaptchaData = res.slice(4);
        this.kaptcha =
          "data:image/png;base64," +
          btoa(
            new Uint8Array(kaptchaData).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
        // 显示弹窗:
        this.kaptchaVisible = true;
        this.loading = false;
      });
    },
    // 执行注册过程
    handleSignUp() {
      this.loading = true;
      signUp(this.userCredential, this.userCredential.kaptcha, this.token)
        .then(() => {
          ElMessageBox.confirm("注册成功, 请按照注册的用户名和密码登录");
        })
        .catch((res) => {
          ElMessageBox.alert(res.msg);
        })
        .finally(() => {
          this.loading = false;
          this.kaptchaVisible = false;
          this.token = "";
        });
    },
  },
};
</script>





