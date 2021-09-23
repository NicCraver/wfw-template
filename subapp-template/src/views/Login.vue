<template>
  <div class="anx-login">
    <div class="title-logo">
      <img class="logo" src="@/assets/anx-logo.png" alt="" />
      <img src="@/assets/anx-title.png" alt="" />
    </div>
    <div class="welcome">肿瘤规范化诊疗平台，欢迎你</div>
    <main class="anx-login-main">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="anx-login-ruleForm"
      >
        <el-form-item prop="account">
          <div class="anx-login-input">
            <input type="text" v-model="ruleForm.account" placeholder="账号" />
            <span
              class="span-clearable span-account"
              @click="clearable('account')"
            >
              <img src="@/assets/clearable.svg" alt="" />
            </span>
            <span class="span-line"></span>
          </div>
        </el-form-item>
        <el-form-item prop="password">
          <div class="anx-login-input">
            <input
              :type="type"
              v-model="ruleForm.password"
              placeholder="密码"
            />
            <span class="span-clearable" @click="clearable('password')">
              <img src="@/assets/clearable.svg" alt="" />
            </span>
            <span
              v-if="type === 'password'"
              class="span-eye"
              @click="changeType('value')"
            >
              <img src="@/assets/close.svg" alt="" />
            </span>
            <span v-else class="span-eye" @click="changeType('password')">
              <img src="@/assets/eye.svg" alt="" />
            </span>
            <span class="span-line"></span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="anx-login-button" @click="submitForm('ruleForm')">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </main>
    <footer class="anx-login-footer">
      2021安想智慧医疗版权所有 京ICP备16029036号-2 《隐私保护》
    </footer>
  </div>
</template>

<script>
import { Storage } from "anx-core";
export default {
  data() {
    return {
      type: "password",
      ruleForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async login() {
      try {
        Storage.set("token", "token");
        window.location.href = "/Examples/GlobalState";
        // window?.location?.reload?.();
      } catch (error) {
        this.$message.error(error.msg);
      }
    },
    changeType(val) {
      this.type = val;
    },

    clearable(val) {
      this.ruleForm[val] = "";
    },
  },
};
</script>

<style lang="scss">
.anx-login-main {
  .el-form-item__error {
    color: #c85e31;
    font-size: 12px;
    line-height: 1;
    padding-top: 10px !important;
    position: absolute;
    top: 100%;
    left: 0;
  }
  input:-webkit-autofill {
    font-size: 18px !important;
    // 字体颜色
    -webkit-text-fill-color: #fff !important;
    // 背景颜色
    background-color: transparent;
    // 背景图片
    background-image: none;
    // 过渡
    transition: background-color 50000s ease-in-out 0s;
  }
}
</style>
<style lang="scss" scoped>
.anx-login {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  height: 100vh;
  background-image: linear-gradient(to right, #343336 0%, #1c191c 100%);
  .title-logo {
    display: flex;
    align-items: center;
    .logo {
      width: 60px;
      margin-right: 10px;
    }
  }
  .welcome {
    margin-top: 40px;
    margin-bottom: 60px;
    font-size: 24px;
  }

  .anx-login-input {
    box-sizing: border-box;
    div {
      position: relative;
    }

    input {
      cursor: pointer;
      font-size: 18px;
      width: 300px;
      height: 40px;
      color: white;
      background-color: transparent;
      border: 1px solid transparent;
      border-bottom-color: #3b3b3b;
    }

    input:focus {
      outline: none;
    }

    input::placeholder {
      font-size: 18px;
      color: #5b5b5b;
    }
    .span-eye {
      position: absolute;
      top: 0px;
      right: 0;
      height: 40px;
      cursor: pointer;
      img {
        width: 25px;
      }
    }

    .span-line {
      position: absolute;
      bottom: 1px;
      left: 0;
      right: 0;
      height: 1px;
      background-color: #c85e31;
      transform-origin: bottom right;
      transform: scaleX(0);
      transition: transform 0.5s ease;
    }

    input:focus ~ span {
      transform-origin: bottom left;
      transform: scaleX(1);
    }
    .span-clearable {
      display: none;
      position: absolute;
      top: 0px;
      right: 30px;
      height: 40px;
      cursor: pointer;
      img {
        width: 25px;
      }
    }
    .span-account {
      right: 0;
    }
  }
  .anx-login-input:hover .span-clearable {
    display: inline;
  }
  .anx-login-button {
    width: 306px;
    margin-top: 15px;
    color: #fff;
    background: #c85e31 !important;
    border: 1px solid #c85e31 !important;
    font-size: 18px;
  }
  .anx-login-footer {
    position: fixed;
    bottom: 30px;
    color: #737373;
  }
}
</style>
