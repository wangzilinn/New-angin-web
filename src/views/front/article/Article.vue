<template>
  <div class="content-index">
    <el-row>
      <el-col :xs="0" :sm="0" :md="6" :lg="6" :xl="6">miao!</el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <article class="main-content page-page">
          <div class="post-header">
            <p class="post-tags" v-if="article.tagNames != null">
              <a v-for="tagName in article.tagNames" href="#" :key="tagName">{{
                tagName
              }}</a>
            </p>
            <div class="post-data">
              <time v-if="article.editTime" itemprop="datePublished"
                >This article was published in {{ article.editTime }}
              </time>
              under the <a href="#">{{ article.categoryName }} category</a>
            </div>
          </div>
          <div class="post-content" itemprop="articleBody">
            <div id="post-content" v-html="article.content" ref="content"></div>
            <p class="post-info">
              本文由 <a href="/">{{ article.author }}</a> 创作，采用
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="external nofollow"
                >知识共享署名4.0</a
              >
              国际许可协议进行许可<br />本站文章除注明转载/出处外，均为本站原创或翻译，转载前请务必署名<br />最后编辑时间为:
              {{ article.editTime }}
            </p>
          </div>
        </article></el-col
      >
      <el-col :xs="0" :sm="0" :md="6" :lg="6" :xl="6">
        <el-scrollbar style="height: 100%">
          <div
            id="directory-content"
            class="
              directory-content
              initial
              headroom--not-bottom headroom--not-top
            "
          />

          <div id="directory"></div>

          <!--        <el-backtop id='test' target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>-->
        </el-scrollbar>
      </el-col>
      <div @click="floatMenu" id="floatMenu">
        <img src="../../../assets/rocket.svg" style="width: 36px" />
      </div>
    </el-row>
    <div id="respond-post-334" class="comment-container">
      <div id="comments" class="clearfix">
        <span class="title">Comments</span>
        <div class="radio">
          排序：
          <el-radio-group v-model="reverse">
            <el-radio :label="true">倒序</el-radio>
            <el-radio :label="false">正序</el-radio>
          </el-radio-group>
        </div>
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(comment, index) in comments"
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
              <!-- <div class="comment-meta">
                <span class="comment-reply">
                     <a href="#comments" rel="nofollow" @click="">Reply</a>
                </span>
              </div> -->
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <span class="response">Responses</span>
        <div class="radio">
          <el-radio-group v-model="anonymous" @change="changeCommentRole">
            <el-radio :label="false"
              >当前用户
              <span v-if="userName">: {{ userName }}</span>
            </el-radio>
            <el-radio :label="true">匿名</el-radio>
          </el-radio-group>
        </div>
        <form id="comment-form" class="comment-form" role="form">
          <p v-if="anonymous">
            <input
              type="email"
              v-model="form.avatar"
              class="form-control input-control clearfix"
              placeholder="avatar"
              required=""
            />
          </p>
          <textarea
            v-model="form.content"
            class="form-control"
            placeholder="Your comment here. Be cool. "
            required=""
          ></textarea>
          <button type="button" class="submit" @click="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { addComment, getCommentList } from "../../../api/comment";
import { findArticleById } from "../../../api/article";
import { mapGetters } from "vuex";
import "../../../styles/xcode.min.css";
import { Article } from "../../../api/type/Article";
import { Comment } from "../../../api/type/Comment";
import { ElMessageBox } from "element-plus";
import { useMeta } from "vue-meta";

export default defineComponent({
  setup() {
    useMeta({ title: "Article" });
  },
  name: "article",
  computed: {
    ...mapGetters({
      userName: "getUserName",
    }),
  },
  data() {
    return {
      article: {} as Article,
      articleLoaded: false,
      comments: [] as Comment[],
      form: {} as Comment,
      currentCommentPage: 1,
      reverse: true,
      anonymous: true,
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    // 检查页面是否加载成功,并更新目录
    var barrageTimer = setInterval(() => {
      if (this.articleLoaded && this.initDirectory()) {
        clearInterval(barrageTimer);
        console.log("目录更新成功");
      }
      console.log("未获取到文章内容,等待中");
    }, 1000);
  },
  methods: {
    //页面加载时调用
    fetchData() {
      findArticleById(<string>this.$route.params.id).then((res) => {
        console.log("article");
        console.log(res);
        this.article = res.data;
        this.articleLoaded = true;
      });
      this.fetchCommentData(this.currentCommentPage);
    },

    fetchCommentData(currentCommentPage: number) {
      getCommentList({ page: currentCommentPage, limit: 4 }, [
        { key: "id", value: <string>this.$route.params.id },
      ]).then((res) => {
        this.comments = res.data.elements;
        console.log(this.comments);
      });
    },
    changeCommentRole(isAnonymous: boolean) {
      console.log(`使用匿名: ${isAnonymous}`);
      if (!isAnonymous) {
        //判断是否登录
        if (this.userName === "") {
          //未登录, 跳转到登陆界面
          ElMessageBox.confirm("是否进行登录>", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$router.push({
                path: `/user?redirect=/article/${this.$route.params.id}`,
              });
            })
            .catch(() => {
              ElMessageBox.alert("已取消登录, 只能使用匿名评论");
              this.anonymous = true;
            });
        }
      }
    },
    submit() {
      //如果是匿名,则需要填写昵称(如果不是匿名, 则会有用户名form.username
      if (this.anonymous) {
        if (this.form.avatar == null || this.form.avatar === "") {
          ElMessageBox.alert("请填写昵称");
          return false;
        }
      } else {
        this.form.username = this.userName;
      }
      if (this.form.content == null || this.form.content === "") {
        ElMessageBox.alert("请填写留言内容");
        return false;
      }
      this.form.articleTitle = this.article.title;
      this.form.articleId = this.article.id;

      addComment(this.form).then((res) => {
        if (res.code === 200) {
          ElMessageBox.alert("评论成功");
          this.fetchCommentData(this.currentCommentPage);
          this.clearForm();
        }
      });
    },

    toPage(page: number) {
      this.currentCommentPage = page;
      this.fetchCommentData(page);
    },

    clearForm() {
      this.form.username = "";
      this.form.content = "";
      this.form.avatar = "";
    },

    initDirectory() {
      //生成右侧目录导航
      var postDirectoryBuild = function () {
        var getAllHeadings = function (dom: any, reg: any, result: any[]) {
          var len = dom.length;
          var node;
          for (var i = 0; i < len; i++) {
            node = dom[i];
            if (reg.test(node.tagName.toLowerCase())) {
              result.push(node);
            }
            if (node.children) {
              getAllHeadings(node.children, reg, result);
            }
          }
        };
        var postChildren = function (childNodes: any, reg: any) {
          var result = [] as any[];
          getAllHeadings(childNodes, reg, result);
          return result;
        };
        var createPostDirectory = function (
          article: any,
          directory: any,
          isDirNum: any
        ) {
          var contentArr = [] as any[],
            titleId = [] as any[],
            levelArr,
            root,
            level,
            currentList,
            list,
            li,
            link,
            i,
            len;
          levelArr = (function (article, contentArr, titleId) {
            //正则:^h->匹配开始为h, \d$->匹配结尾为数字
            var titleElem = postChildren(article.children, /^h\d$/),
              levelArr = [],
              lastNum = 1,
              lastRevNum = 1,
              count = 0,
              guid = 1,
              id = "directory" + (Math.random() + "").replace(/\D/, ""),
              num,
              elem;
            while (titleElem.length) {
              //shift()移除第一个元素
              elem = titleElem.shift();
              //在word中自带的章节标题号需要被删掉:/^\d.* /
              contentArr.push(elem.innerHTML.replace(/^\d.* /, ""));
              num = +elem.tagName.match(/\d/)[0];
              if (num > lastNum) {
                levelArr.push(1);
                lastRevNum += 1;
              } else if (
                num === lastRevNum ||
                (num > lastRevNum && num <= lastNum)
              ) {
                levelArr.push(0);
                lastRevNum = lastRevNum;
              } else if (num < lastRevNum) {
                levelArr.push(num - lastRevNum);
                lastRevNum = num;
              }
              count += levelArr[levelArr.length - 1];
              lastNum = num;
              elem.id = elem.id || id + guid++;
              titleId.push(elem.id);
            }
            if (count !== 0 && levelArr[0] === 1) levelArr[0] = 0;
            return levelArr;
          })(article, contentArr, titleId);
          currentList = root = document.createElement("ul");

          var dirNum = [0];
          for (i = 0, len = levelArr.length; i < len; i++) {
            level = levelArr[i];
            if (level === 1) {
              list = document.createElement("ul");
              if (currentList !== null && !currentList.lastElementChild) {
                currentList.appendChild(document.createElement("li"));
              }
              if (
                currentList !== null &&
                currentList.lastElementChild !== null
              ) {
                currentList.lastElementChild.appendChild(list);
              }
              currentList = list;
              dirNum.push(0);
            } else if (level < 0) {
              level *= 2;
              while (level++) {
                if (level % 2) dirNum.pop();
                if (currentList !== null) {
                  currentList = currentList.parentNode;
                }
              }
            }
            dirNum[dirNum.length - 1]++;
            li = document.createElement("li");
            link = document.createElement("a");
            // 在这里往a标签中插入了锚点,与hashHistory冲突
            link.href = "#" + titleId[i];
            link.innerHTML = !isDirNum
              ? contentArr[i]
              : dirNum.join(".") + " " + contentArr[i];
            li.appendChild(link);
            if (currentList !== null) {
              currentList.appendChild(li);
            }
          }
          directory.appendChild(root);
        };
        var articleDOM = document.getElementById("post-content");
        let directoryDOM = document.getElementById("directory");
        // Vue会复用之前页面的同名div,如果不先清空,会导致目录包含上一篇文章的目录
        if (directoryDOM != null) {
          directoryDOM.innerHTML =
            "先不要点目录，目录锚点跳转和Vue的跳转冲突，</br>暂时还不知道怎么解决";
        }
        if (articleDOM !== null && articleDOM.children) {
          // 创建之前先清空

          createPostDirectory(
            articleDOM,
            document.getElementById("directory"),
            true
          );
          return true;
        } else {
          return false;
        }
      };
      return postDirectoryBuild();
    },

    floatMenu() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
});
</script>
<style scoped>
.content-index {
  padding: 0;
}

#comments .title {
  font-size: 20px;
  font-weight: 400;
  display: block;
  padding: 30px 0 30px 20px;
  color: #5f5f5f;
}

#comments .radio {
  padding: 0 0 30px 20px;
}

.comment-meta .comment-reply {
  display: inline;
  float: right;
}

.comment-author span {
  margin: 0;
  padding: 0;
  background-color: white;
  font-size: 1rem;
}
#directory {
  margin-left: 30px;
  position: relative;
}
#directory-content {
  text-align: left;
}
</style>
