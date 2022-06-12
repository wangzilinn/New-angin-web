<!--
 * @Description: 框架
 * @Author: Zillion Wang
 * @Date: 2021-06-03 22:34:42
 * @LastEditors: Zillion Wang
 * @LastEditTime: 2021-06-07 23:01:23
-->

<template>
  <div>
    <header id="header" class="header bg-white">
      <div class="navbar-container">
        <el-row v-if="isMobile" justify="center">
          <el-col :span="12">
            <router-link class="navbar-logo" style="margin-top: -4%" to="/">
              <img
                src="../../assets/layout/logo.png"
                alt="Het meisje met de parel"
              />
            </router-link>
          </el-col>
          <el-col :span="12">
            <div style="text-align: center">
              <router-link to="/about"
                >关于我&nbsp;&nbsp;&nbsp;&nbsp;About</router-link
              >
            </div>
          </el-col>
        </el-row>
        <el-row v-else :gutter="20" justify="center">
          <el-col :span="6">
            <router-link class="navbar-logo" to="/">
              <img
                src="../../assets/layout/logo.png"
                alt="Het meisje met de parel"
              />
            </router-link>
          </el-col>
          <el-col :span="15">
            <el-autocomplete
              size="small"
              class="inline-input"
              v-model="search"
              :fetch-suggestions="handleFocusOnSearch"
              :select-when-unmatched="true"
              placeholder="搜索或选择分类"
              @select="handleSelectCategoryOrQuery"
            ></el-autocomplete>
            <el-button size="small" circle @click="openHelpNotification">
              <el-icon><QuestionFilled /></el-icon>
            </el-button>
          </el-col>

          <el-col :span="3">
            <div class="navbar-menu">
              <!-- name是登陆人的名字 -->
              <router-link to="" v-if="userName">{{ userName }}</router-link>
              <router-link to="/login" v-else>Login</router-link>
              <router-link to="/about">About</router-link>
              <a href="https://zilinn.wang/game">Game(Beta)</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </header>
    <!-- 这里显示路由界面 -->
    <router-view />
    <footer id="footer" class="footer bg-white">
      <div class="footer-social">
        <div class="footer-container clearfix">
          <div class="social-list">
            You can find me here:
            <a
              class="social douban"
              target="blank"
              href="https://www.douban.com/people/83078029/"
              >DOUBAN</a
            >
            <a
              class="social github"
              target="blank"
              href="https://github.com/wangzilinn"
              >GITHUB</a
            >

            <br />
            BUT you can't find me here:
            <a
              class="social rss"
              target="blank"
              href="https://joinmastodon.org/"
              >MASTODON
            </a>
          </div>
        </div>
      </div>
      <div class="footer-meta">
        <div class="footer-container">
          <div class="meta-item meta-copyright">
            <div class="meta-copyright-info">
              <a href="/" class="info-logo">
                <img src="../../assets/layout/bottom_logo.png" alt="lover" />
              </a>
              <div class="info-text">
                <p id="chakhsu">
                  I work with J<span style="color: rgb(255, 120, 71)"
                    >&amp;</span
                  ><span style="color: rgb(255, 94, 99)">4</span
                  ><span style="color: rgb(255, 94, 99)">U</span
                  ><span style="color: rgb(191, 60, 175)">+</span
                  ><span style="color: rgb(226, 183, 47)">`</span>
                </p>
                <p>
                  Theme is inspired by
                  <a href="https://github.com/chakhsu/pinghsu" target="_blank"
                    >Pinghsu</a
                  >
                </p>
                <p>
                  © {{ new Date().getFullYear() }}
                  <a href="https://zilinn.wang/">Zillion Wang</a>
                </p>
                <p>
                  <a href="http://www.beian.miit.gov.cn">蜀ICP备20012505号-1</a>
                </p>
              </div>
            </div>
          </div>
          <div class="meta-item meta-posts">
            <canvas id="github-contribution-map" />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.navbar-logo img {
  height: 45px;
  float: right;
}

.navbar-logo {
  top: 45%;
}

.info-logo img {
  height: 50px;
}
</style>


<script lang="ts">
import { h } from "vue";
import { ElNotification } from "element-plus";
import { QuestionFilled } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import { getGithubInfo } from "../../api/user";
import { getCategoriesList } from "../../api/category";
import { Category } from "../../api/type/Article";
import { mapGetters } from "vuex";
import {
  drawContributions,
  DataStruct,
} from "../../components/github-contributions-canvas";

export default defineComponent({
  name: "Layout",
  components: {
    QuestionFilled,
  },
  computed: {
    ...mapGetters({
      userName: "getUserName",
    }),
  },
  data() {
    return {
      categoriesList: [] as Category[],
      contributionData: {},
      search: "",
      isMobile: false,
    };
  },
  created() {
    this.checkIfMobile();
    this.fetchData();
  },
  mounted() {
    this.initColorfulFooterText();
  },
  methods: {
    //创建页面时调用
    fetchData() {
      // 获得所有类型
      getCategoriesList().then((res) => {
        console.log("category list");
        console.log(res.data);
        res.data.forEach((item: Category) => {
          //将过来的分类转换为搜索框能够接受的value属性
          this.categoriesList.push(item);
        });
        //加一个全部显示的类
        this.categoriesList.push({ id: "", name: "All" });
      });
      getGithubInfo("wangzilinn").then((res) => {
        let contributionData = <DataStruct>res.data;
        let yearsData = contributionData.years;
        // 将原有数据截断为当年数据
        contributionData.years.splice(1, yearsData.length - 1);
        drawContributions(
          <HTMLCanvasElement>document.getElementById("github-contribution-map"),
          {
            data: contributionData,
            username: "wangzilinn",
            themeName: "standard",
            footerText: "Made by @sallar - github-contributions.now.sh",
          }
        );
      });
    },
    openHelpNotification() {
      ElNotification({
        title: "多功能搜索",
        dangerouslyUseHTMLString: true,
        type: "info",
        message:
          "<li>输入内容搜索文章，<strong>Enter</strong>键执行</li><li>下拉内容为文章分类，点击跳转</li></br>P.S.如果无响应请刷新页面",
      });
    },
    // 搜索框中输入内容时,对所有分类进行匹配
    handleFocusOnSearch(queryString: string, cb: any): void {
      let allCategories = this.categoriesList.map((origin) => {
        return { value: origin.name };
      });
      if (queryString == "") {
        cb(allCategories);
      } else {
        // 存在搜索内容,对所有分类进行过滤
        cb(
          allCategories.filter((category) => {
            return category.value.toLowerCase().includes(queryString);
          })
        );
      }
      console.log(queryString);
    },
    // 搜索框的回调(无论是选择类型还是输入内容都会回调)
    handleSelectCategoryOrQuery(item: { value: string }): void {
      console.log("select " + item.value);
      // 检查是否为选择类型:
      let isCategory = false;
      this.categoriesList.forEach((category) => {
        if (category.name == item.value) {
          isCategory = true;
        }
      });
      if (isCategory) {
        this.$store.commit("setCategory", item.value);
      } else {
        this.$store.commit("setQuery", item.value);
      }
      // 如果点击了搜索,则跳转到首页:
      this.$router.push("/");
    },
    checkIfMobile() {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );

      if (flag) {
        this.isMobile = true;
        return true;
      } else {
        this.isMobile = false;
        return false;
      }
    },
    // 画页面下方的字符
    initColorfulFooterText(): void {
      let r = document.getElementById("chakhsu");

      function t() {
        return b[Math.floor(Math.random() * b.length)];
      }

      function e() {
        return String.fromCharCode(94 * Math.random() + 33);
      }

      function n(r: number) {
        for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
          var l = document.createElement("span");
          (l.textContent = e()), (l.style.color = t()), n.appendChild(l);
        }
        return n;
      }

      function i() {
        var t = o[c.skillI];
        if (r !== null) {
          c.step
            ? c.step--
            : ((c.step = g),
              c.prefixP < l.length
                ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++)
                : "forward" === c.direction
                ? c.skillP < t.length
                  ? ((c.text += t[c.skillP]), c.skillP++)
                  : c.delay
                  ? c.delay--
                  : ((c.direction = "backward"), (c.delay = a))
                : c.skillP > 0
                ? ((c.text = c.text.slice(0, -1)), c.skillP--)
                : ((c.skillI = (c.skillI + 1) % o.length),
                  (c.direction = "forward"))),
            (r.textContent = c.text),
            r.appendChild(
              n(
                c.prefixP < l.length
                  ? Math.min(s, s + c.prefixP)
                  : Math.min(s, t.length - c.skillP)
              )
            ),
            setTimeout(i, d);
        }
      }

      var l = "I focus on ",
        o = [
          "Embedded-NN",
          "NILM",
          "Java",
          "Dart",
          "Vue",
          "Spring Boot",
          "Spring Cloud",
        ].map(function (r) {
          return r + ".";
        }),
        a = 2,
        g = 1,
        s = 5,
        d = 75,
        b = [
          "rgb(110,64,170)",
          "rgb(150,61,179)",
          "rgb(191,60,175)",
          "rgb(228,65,157)",
          "rgb(254,75,131)",
          "rgb(255,94,99)",
          "rgb(255,120,71)",
          "rgb(251,150,51)",
          "rgb(226,183,47)",
          "rgb(198,214,60)",
          "rgb(175,240,91)",
          "rgb(127,246,88)",
          "rgb(82,246,103)",
          "rgb(48,239,130)",
          "rgb(29,223,163)",
          "rgb(26,199,194)",
          "rgb(35,171,216)",
          "rgb(54,140,225)",
          "rgb(76,110,219)",
          "rgb(96,84,200)",
        ],
        c = {
          text: "",
          prefixP: -s,
          skillI: 0,
          skillP: 0,
          direction: "forward",
          delay: a,
          step: g,
        };
      i();
    },
  },
});
</script>
