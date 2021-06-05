
import { InjectionKey } from 'vue'
import { createStore, Store  } from 'vuex'

// 这个类型定义必须与下面state()中定义的属性相同
export interface State {
  category: string,
  query: string,
  userName: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state(){
    return {
      // 搜索文章时使用的参数
      category: 'All',
      query: '',
      userName:'admin'
    }
  },
  mutations:{
    setCategory(state, category:string){
      state.category = category
    },
    setQuery(state, query:string){
      state.query = query
    }
  },
  getters: {
    getUserName(state){
      return state.userName
    },
    getCategory(state){
      return state.category
    },
    getQuery(state){
      return state.query
    }
  }
})

