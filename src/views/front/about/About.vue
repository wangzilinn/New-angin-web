<template>
  <div>
    <article class="main-content page-page">
      <div class="post-header">
        <h1 class="post-title" itemprop="name headline">About</h1>
        <div class="post-data">
          <time itemprop="datePublished">Published on 4 3, 2022</time>
        </div>
      </div>
      <div id="post-content" class="post-content">
        <h3>Hello</h3>
        <p>我是王子林(Zillion Wang), 四川大学计算机学院硕士研究生</p>
        <p>
          喜欢古典音乐,喜欢猫咪,<strong
            >很爱自己的女朋友,我们在一起已经{{ togetherDays }}天啦!</strong
          >
        </p>
        <h3>关于Angin Blog</h3>
        <p>
          Angin是自己和女朋友名字的拼音每一位都进行与运算后,
          合并相同相邻字符得来的
        </p>
        <p>
          这个Blog是从<a href="https://github.com/TyCoding/tumo" target="_blank"
            >Tumo</a
          >获得的灵感, 从头开始学Vue, 一点一点搭建而成的
        </p>
        <p>前端是Vue, 后端是Spring全家桶</p>
        <p>
          首页显示的图片是从<a href="https://artuk.org/">ArtUK</a
          >中爬取的的4661张图片中随机选择的, 爬虫代码见<a
            href="https://github.com/wangzilinn/Angin-backend"
            >github</a
          >
        </p>
        <p>
          首页下方显示的github
          map使用了修改后的github-contributions-canvas,其源码见<a
            href="https://github.com/sallar/github-contributions-canvas"
            >github</a
          >
        </p>
        <h3>主要技术栈</h3>
        <ul>
          <li>Java,C</li>
          <li>Spring boot</li>
          <li>MySQL</li>
          <li>MongoDB</li>
        </ul>
        <h3>经历</h3>
        <ul>
          <li>阿里巴巴淘宝(中国)有限公司 用户增长(实习)</li>
        </ul>
        <h3>学术</h3>
        <p>
          本科阶段一直在嵌入式的坑里面挣扎, 忙于各种比赛, 研究生阶段转向了Java,
          目前很快乐
        </p>
        <p>目前我的研究方向是NILM和工业互联网安全</p>
        <ul>
          <li>
            <strong>Wang, Z.</strong>; Wang, W.; Zhang, Z.; Hu, F.; Xia, X.;
            Chen, L. DeepEdge: A Novel Appliance Identification Edge Platform
            for Data Gathering, Capturing and Labeling. Sensors 2022, 22, 2432.
            https://doi.org/10.3390/s22072432
          </li>
          <li>
            Wang, W.; <strong>Wang, Z.</strong>(contributed equally); Chen, Y.;
            Guo, M.; Chen, Z.; Niu, Y.; Liu, H.; Chen, L. Bats: An Appliance
            Safety Hazards Factors Detection Algorithm with an Improved
            Nonintrusive Load Disaggregation Method. Energies 2021, 14, 3547.
            https://doi.org/10.3390/en14123547
          </li>
        </ul>
        <h3>联系</h3>
        <ul>
          <li>
            <p>
              <a href="https://github.com/wangzilinn" target="_blank"
                >Github:https://github.com/wangzilinn</a
              >
            </p>
          </li>
          <li>Email: wangzilinn@gmail.com</li>
        </ul>
      </div>
    </article>
    <div id="respond-post-334" class="comment-container">
      <div id="comments" class="clearfix">
        <span class="response">Responses</span>
        <form id="comment-form" class="comment-form" role="form">
          <input
            type="text"
            v-model="currentComment.avatar"
            maxlength="12"
            class="form-control input-control clearfix"
            placeholder="Avator (*)"
            required="true"
          />
          <textarea
            v-model="currentComment.content"
            class="form-control"
            placeholder="Your comment here. Be cool. "
            required="true"
          ></textarea>
          <button type="button" class="submit" @click="submit">SUBMIT</button>
        </form>
        <el-timeline>
          <el-timeline-item
            v-for="(comment, index) in commentPages.elements"
            :key="index"
            :timestamp="comment.date"
            placement="top"
          >
            <el-card>
              <div class="comment-header">
                <img
                  class="avatar"
                  src="../../../assets/user/user_avator.svg"
                  width="80"
                  height="80"
                />
                <span class="comment-author">
                  <span v-if="comment.username">{{ comment.username }}</span>
                  <span v-else>匿名用户: {{ comment.avatar }}</span>
                </span>
              </div>
              <div class="comment-content">
                <span class="comment-author-at"></span>
                <p>{{ comment.content }}</p>
                <p></p>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { getListForAbout, addComment } from "../../../api/comment";
import { Comment } from "../../../api/type/Comment";
import { ElMessageBox } from "element-plus";
import { Page } from "../../../api/type/Response";
import { useMeta } from "vue-meta";

export default defineComponent({
  setup() {
    useMeta({ title: "About" });
  },
  name: "about",
  data() {
    return {
      commentPages: {} as Page<Comment>,
      currentComment: {} as Comment,
      current: 1,
      togetherDays: NaN as number,
    };
  },
  created() {
    this.fetchData(1);
    this.countThDaysTogether();
  },
  methods: {
    fetchData(current: number) {
      getListForAbout(current).then((res) => {
        this.commentPages = res.data;
      });
    },
    countThDaysTogether() {
      let start = new Date("2019/5/1 09:36:0"); //开始时间
      let now = new Date(); //结束时间
      let diff = now.getTime() - start.getTime(); //时间差秒
      this.togetherDays = Math.floor(diff / (24 * 3600 * 1000));
    },
    submit() {
      if (
        this.currentComment.avatar == null ||
        this.currentComment.avatar == ""
      ) {
        ElMessageBox.alert("请填写昵称");
        return false;
      }
      if (
        this.currentComment.content == null ||
        this.currentComment.content == ""
      ) {
        ElMessageBox.alert("请填写留言内容");
        return false;
      }

      addComment(this.currentComment).then(() => {
        ElMessageBox.confirm("评论成功");
        this.fetchData(this.current);
        this.clearForm();
      });
    },

    toPage(page: number) {
      this.current = page;
      this.fetchData(page);
    },

    clearForm() {
      this.currentComment.username = "";
      this.currentComment.avatar = "";
      this.currentComment.content = "";
    },
  },
});
</script>


