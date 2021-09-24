
import { InjectionKey } from 'vue'
import { createStore, Store  } from 'vuex'
import { Query } from "../api/type/Request"
import { User } from '../api/type/User'

// 这个类型定义必须与下面state()中定义的属性相同
export interface State {
  category: string,
  query: Query,
  userName: string|undefined
  user: User
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state(){
    return {
      // 搜索文章时使用的参数
      category: 'All',
      query: {} as Query,
      userName:undefined,
      user: {} as User
    }
  },
  mutations:{
    setCategory(state, category:string){
      state.category = category
    },
    setQuery(state, query:Query){
      state.query = query
    },
    setUser(state, user: User){
      state.user = user
    }
  }, 
  getters: {
    getUserName(state):string|undefined{
      return state.user.username
    },
    getUser(state):User|undefined{
      return state.user
    },
    getCategory(state){
      return state.category
    },
    getQuery(state):Query{
      return state.query
    }
  }
})

