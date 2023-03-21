<template>
  <div class="home">
  <h2>Selcet the lid color</h2>
  <div class="select">
    
    <div
          class="select-item"
          v-for="(item, index) in colors"
          :key="index"
          @click="selectColor(index)"
        >
          <div
            class="select-item-color"
            :style="{ backgroundColor: item }"
          ></div>
    </div>
  </div>
</div>

</template>

<script setup>
//import {defineEmits} from 'vue';
let colors = ["red", "blue", "white"];
const emit=defineEmits(['selectColor']);
let selectColor = (index) => {
  var color1=(colors[index]);
  // console.log(color1);
  emit("selectColor",color1);
  
};
</script>
<style>
.select-item-color {
  width: 50px;
  height: 50px;
  border: 2px solid #000000;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
}
.select {
  
  display: flex;
  
  right: 20px;
}
.home{
  position: fixed;
  right: 20px;
}
</style>