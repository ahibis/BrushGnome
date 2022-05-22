import { defineStore } from 'pinia'


export const useGameStore = defineStore('game', {
  state: () => {
    return {
      sprites: [],
      selectedSprite: undefined,
      drawer:false,
      isEditor:true,
      isList:true
    }
  },
})