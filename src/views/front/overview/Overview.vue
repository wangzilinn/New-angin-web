<template>
  <div class="index-page main-content">
    <div
      class="post-lists"
      v-loading="loading"
      element-loading-text="Just a moment, server is fetching paintings"
    >
      <el-row v-if="category !== 'All'" type="flex" justify="center">
        <div v-if="currentTag === undefined">
          <el-button
            :key="tag.name"
            v-for="tag in tagList"
            @click="handleClickTag(tag)"
            size="mini"
            >{{ tag.name }}
          </el-button>
        </div>
        <div v-else>
          <el-button size="mini">{{ currentTag.name }}</el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            circle
            @click="handleDeleteTag"
          ></el-button>
        </div>
      </el-row>
      <div class="post-lists-body" style="text-align: center">
        <div v-if="articleList == null || articleList.length === 0">
          <p>Do not go gentle into that good night,</p>
          <p>Old age should burn and rave at close of day;</p>
          <p>Rage, rage against the dying of the light.</p>
          <p>Though wise men at their end know dark is right,</p>
          <p>Because their words had forked no lightning they</p>
          <p>Do not go gentle into that good night.</p>
          <p>Good men, the last wave by, crying how bright</p>
          <p>Their frail deeds might have danced in a green bay,</p>
          <p>Rage, rage against the dying of the light.</p>
          <p>Wild men who caught and sang the sun in flight,</p>
          <p>And learn, too late, they grieved it on its way,</p>
          <p>Do not go gentle into that good night.</p>
          <p>Grave men, near death, who see with blinding sight</p>
          <p>Blind eyes could blaze like meteors and be gay,</p>
          <p>Rage, rage against the dying of the light.</p>
          <p>And you, my father, there on the sad height,</p>
          <p>Curse, bless me now with your fierce tears, I pray.</p>
          <p>Do not go gentle into that good night.</p>
          <p>Rage, rage against the dying of the light.</p>
        </div>
        <div
          class="post-list-item"
          v-else
          v-for="item in articleList"
          :key="item.id"
        >
          <div class="post-list-item-container">
            <div
              class="item-thumb bg-deepgrey"
              :style="getCoverUrlStyle(item)"
              v-on:click="handleClickArticleImg(item)"
            ></div>
            <div class="item-slant reverse-slant bg-deepgrey"></div>
            <div class="item-slant"></div>
            <div class="item-label">
              <div class="item-title">
                <router-link
                  :to="'/article/' + item.id"
                  v-text="item.title"
                ></router-link>
              </div>
              <div class="item-meta clearfix">
                <div class="item-meta-cat">
                  <a href="">
                    {{ item.categoryName }}->
                    <span v-for="tagName in item.tagNames" :key="tagName">
                      {{ tagName }}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 点击画作后的弹出框 -->
    <el-dialog
      v-model="showPaintingDetail"
      title="Painting Detail"
      :width="checkIfMobile() ? `100%` : `50%`"
    >
      <div style="font-size: 2em; text-align: center">
        {{ currentPainting.title }}
      </div>
      <div style="text-align: center">Artist: {{ currentPainting.artist }}</div>
      <img :src="getPaintingUrl(currentPainting.id)" style="width: 100%" />
      <div>Label: {{ currentPainting.label }}</div>
      <div>
        Detail URL:
        <a :href="currentPainting.detail_url">
          {{ currentPainting.detail_url }}
        </a>
      </div>
    </el-dialog>
    <div class="lists-navigator clearfix">
      <ol class="page-navigator">
        <el-pagination
          :current-page="currentPage"
          :total="total"
          @pre-click="(page) => handleClickPage(page - 1)"
          @next-click="(page) => handleClickPage(page + 1)"
          @current-change="(page) => handleClickPage(page)"
          prev-text="←"
          next-text="→"
          layout="prev, pager, next"
        >
        </el-pagination>
      </ol>
    </div>
  </div>
</template>
<style scoped>
.el-row {
  border-radius: 4px;
}

.inline-input {
  width: 70px;
  vertical-align: bottom;
  margin-top: 10px;
}

.page {
  border: 0;
}

.el-tag {
  background-color: white;
  color: #956038;
  border-color: #956038;
  margin-top: 10px;
  margin-left: 5px;
  margin-right: 5px;
}

.el-button {
  margin-right: 5px;
  margin-left: 5px;
}
</style>
<script lang="ts">
import { defineComponent } from "vue";
import { getArticlePage } from "../../../api/article";
import { getPaintingDetailById } from "../../../api/painting";
import { getTagList } from "../../../api/tag";
import { Tag, ArticleDigest } from "../../../api/type/Article";
import { mapGetters } from "vuex";
import { Painting } from "../../../api/type/Painting";
import { useMeta } from "vue-meta";

export default defineComponent({
  setup() {
    useMeta({ title: "Home" });
  },
  name: "overview",
  computed: {
    //...是把属性混入当前对象
    ...mapGetters({
      category: "getCategory",
      query: "getQuery",
    }),
  },
  watch: {
    category: function (val, oldVal) {
      //类型页改变,重新配置tag等信息
      console.log("watch category");
      console.log(`new ${val}`);
      console.log(`old ${oldVal}`);
      if (val === undefined) {
        return;
      }
      this.resetPageAndQuery();
      this.fetchData();
    },
    query: function (val, oldVal) {
      //layout进行了标题模糊查询
      console.log("watch query");
      console.log(`old ${oldVal}`);
      console.log(`new ${val}`);
      if (val === undefined) {
        return;
      }
      //重置本页信息
      this.resetPageAndQuery();
      this.tagList = [];
      this.currentTitle = val;
      this.fetchData();
    },
  },
  data() {
    return {
      articleList: [] as ArticleDigest[],
      tagList: [] as Tag[],
      currentTag: undefined as Tag | undefined,
      //模糊搜索标题用
      currentTitle: undefined,
      currentPage: 1,
      pages: 1,
      total: 1,
      showPaintingDetail: false,
      currentPainting: {} as Painting,
      isMobile: false,
      loading: true,
    };
  },
  created() {
    console.log("created");
    this.fetchData();
    this.checkIfMobile();
  },
  methods: {
    // 点击文章的图片
    handleClickArticleImg(articleDigest: ArticleDigest) {
      // 如果不是名画,则直接跳转
      if (!articleDigest.isPaintingCover) {
        this.$router.push("/article/" + articleDigest.id);
      } else {
        this.showPaintingDetail = true;
        getPaintingDetailById(articleDigest.cover).then((res) => {
          this.currentPainting = res.data;
          console.log(this.currentPainting.content);
        });
      }
    },
    resetPageAndQuery() {
      this.currentPage = 1;
      this.pages = 1;
      this.total = 1;
      this.currentTag = undefined;
      this.currentTitle = undefined;
    },
    handleClickPage(pageNum: number) {
      this.currentPage = pageNum;
      this.fetchData();
    },
    handleClickTag(item: Tag) {
      console.log("handleClickTag");
      console.log(item);
      this.resetPageAndQuery();
      this.currentTag = item;
      this.fetchData();
    },
    handleDeleteTag(item: Tag) {
      console.log("handleDeleteTag");
      console.log(item);
      this.resetPageAndQuery();
      this.fetchData();
    },
    fetchData() {
      console.log("fetchData");
      this.loading = true;
      let query = [];
      //如果当前是模糊标题查询,则直接查询,不管分类和tag
      if (this.currentTitle !== undefined) {
        query.push({ key: "title", value: this.currentTitle });
      } else {
        //进行分类查询
        if (this.category !== "All") {
          query.push({ key: "category", value: this.category });
        }
        //当选定了特定标签时:
        if (this.currentTag !== undefined) {
          query.push({ key: "tag", value: this.currentTag.name });
        } else {
          //当未选定标签时
          getTagList(query).then((res) => {
            console.log("getTagList");
            console.log(res.data);
            this.tagList = res.data;
          });
        }
      }
      this.articleList = [];
      getArticlePage({ page: this.currentPage, limit: 9 }, query).then(
        (res) => {
          this.articleList = res.data.elements;
          this.pages = res.data.totalPages;
          this.total = res.data.totalNumber;
          this.loading = false;
        }
      );
    },
    getCoverUrlStyle(articleDigest: ArticleDigest) {
      let imgUrl =
        <string>import.meta.env.VITE_APP_BASE_API +
        <string>import.meta.env.VITE_IMG_URL;
      if (import.meta.env.MODE == "production") {
        // 不知道怎么回事,生产环境下无法识别环境文件,所以只能暂时这样写
        imgUrl = "api/img";
      }
      if (articleDigest.isPaintingCover) {
        return (
          "background-image:url(" +
          imgUrl +
          "/painting/" +
          articleDigest.cover +
          ");"
        );
      } else {
        return (
          "background-image:url(" + imgUrl + "/" + articleDigest.cover + ");"
        );
      }
    },
    getPaintingUrl(id: string) {
      let imgUrl =
        <string>import.meta.env.VITE_APP_BASE_API +
        <string>import.meta.env.VITE_IMG_URL;
      if (import.meta.env.MODE == "production") {
        // 不知道怎么回事,生产环境下无法识别环境文件,所以只能暂时这样写
        imgUrl = "api/img";
      }
      return imgUrl + "/painting/" + id + "?zoom=false";
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
  },
});
</script>

