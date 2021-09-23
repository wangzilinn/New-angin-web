<template>
  <div>
    <article class="main-content page-page">
      <div class="post-header">
        <h1 class="post-title" itemprop="name headline">About</h1>
        <div class="post-data">
          <time datetime="2020-05-14 23:08" itemprop="datePublished"
            >Published on 5 28, 2020</time
          >
        </div>
      </div>
      <div id="post-content" class="post-content">
        <h3>Hello</h3>
        <p>我是王子林, 四川大学计算机学院硕士研究生</p>
        <p>
          喜欢古典音乐,喜欢猫咪,<strong
            >超级喜欢自己的女朋友,我们在一起已经{{ togetherDays }}天啦!</strong
          >
        </p>
        <p>
          本科阶段一直在嵌入式的坑里面挣扎, 忙于各种比赛,
          研究生阶段转向了上层应用, 发现又是一个大坑
        </p>
        <p>目前我的研究方向是NILM, 期望能发好的论文出来</p>
        <p>还在涉猎一个小方向, 嵌入式神经网络, 感觉可以做出很有意思的应用</p>
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
        <P
          >首页显示的图片是从<a href="https://artuk.org/">ArtUK</a
          >中爬取的的4661张图片中随机选择的, 爬虫代码见<a
            href="https://github.com/wangzilinn/Angin-backend"
            >github</a
          ></P
        >
        <p>
          首页下方显示的github
          map使用了修改后的github-contributions-canvas,其源码见<a
            href="https://github.com/sallar/github-contributions-canvas"
            >github</a
          >
        </p>
        <p>
          由于将来很有可能从事后端工作, 本着学习的目的,
          后端的框架用的会多一些,包括但不限于
        </p>
        <ul>
          <li>spring boot</li>
          <li>spring security</li>
          <li>spring cloud</li>
          <li>mybatis plus</li>
          <li>Feign</li>
          <li>MySQL</li>
          <li>MongoDB</li>
          <li>jsr303校验</li>
        </ul>
        <h3>联系</h3>
        <p>
          以下是我的github, 虽然技术很菜, 但是也做了一些我觉得很有意思的东西
        </p>
        <ul>
          <li>
            <p>
              <a href="https://github.com/wangzilinn" target="_blank">Github</a>
            </p>
          </li>
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
            placeholder="Name (*)"
            value=""
            required=""
          />
          <input
            type="email"
            v-model="currentComment.username"
            class="form-control input-control clearfix"
            placeholder="Email (*)"
            value=""
            required=""
          />
          <textarea
            v-model="currentComment.content"
            class="form-control"
            placeholder="Your comment here. Be cool. "
            required=""
          ></textarea>
          <button type="button" class="submit" @click="submit">SUBMIT</button>
        </form>
        <ol v-if="commentPages.elements != null" class="comment-list">
          <li
            v-for="comment in commentPages.elements"
            :key="comment.username"
            class="comment-body comment-parent comment-even"
          >
            <div class="comment-view" onclick="">
              <div class="comment-header">
                <img class="avatar" src="/user.png" width="80" height="80" />
                <span class="comment-author">
                  <a
                    :href="comment.username"
                    target="_blank"
                    rel="external nofollow"
                    >{{ comment.username }}</a
                  >
                </span>
              </div>
              <div class="comment-content">
                <span class="comment-author-at"></span>
                <p>{{ comment.content }}</p>
                <p></p>
              </div>
              <div class="comment-meta">
                <time class="comment-time">{{ comment.date }}</time>
              </div>
            </div>
          </li>
        </ol>
        <div v-if="commentPages.totalPages > 1" class="lists-navigator">
          <ol class="page-navigator">
            <li v-if="commentPages.currentPage > 1" class="prev">
              <a @click="toPage(commentPages.currentPage - 1)" href="#comments"
                >←</a
              >
            </li>
            <li
              v-for="i in commentPages.totalPages"
              :key="i"
              :class="commentPages.currentNumber == i ? 'current' : ''"
            >
              <a @click="toPage(i)" href="#comments">{{ i }}</a>
            </li>
            comments
            <li
              v-if="commentPages.currentPage < commentPages.totalPages"
              class="next"
            >
              <a @click="toPage(commentPages.currentPage + 1)" href="#comments"
                >→</a
              >
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { getListForAbout, addComment } from "../../../api/comment";
import { Comment } from "../../../api/type/Comment";
import { ElMessageBox } from "element-plus";
import { Page } from "../../../api/type/Response";
export default {
  name: "index",
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
        this.currentComment.username == null ||
        this.currentComment.username == ""
      ) {
        ElMessageBox.alert("请填写邮箱");
        return false;
      }
      if (
        this.currentComment.content == null ||
        this.currentComment.content == ""
      ) {
        ElMessageBox.alert("请填写留言内容");
        return false;
      }

      addComment(this.currentComment).then((res) => {
        if (res.code == 200) {
          ElMessageBox.confirm("评论成功");
          this.fetchData(this.current);
          this.clearForm();
        }
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
};
</script>
<style lang="scss" scoped>
@import "~@/styles/style.min.css";
</style>

