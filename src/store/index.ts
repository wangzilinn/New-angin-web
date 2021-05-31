import { createStore } from 'vuex'
import app from './modules/app'
import externalApi from './modules/externalApi'
import settings from './modules/settings'
import user from './modules/user'
import content from './modules/content'


export const store = createStore({
  modules: {
    app,
    externalApi,
    settings,
    user,
    content
  },
  getters : {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    imgApi: state => state.externalApi.imgApi,
    swaggerApi: state=>state.externalApi.swaggerApi,
    category:state => state.content.category,
    query:state => state.content.query
  }
})
