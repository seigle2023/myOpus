<template>
  <RouterView/>
  <div class="nav">
    <el-row class="tac">
     
     
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="1"
          text-color="#fff"
          router
          
        >
          <el-sub-menu index="1">
            <template #title>
              <span>我的作品</span>
            </template>
              
              <el-menu-item index="/">PB-G4</el-menu-item>
              <el-menu-item index="/PM">PM-S</el-menu-item>  
                 
          </el-sub-menu>
         
         
        </el-menu>
    
    </el-row>
  </div>


  
   
  </template>
  
  <script lang="ts" setup>
  import { RouterLink, RouterView } from 'vue-router';
  

  </script>
  <style>
  *{
    margin: 0;
    padding: 0;
    z-index: 0;
  }

  .nav {
    position: fixed;
    left: 0;
    top:0;
   
    z-index: 0;
    ;
  }
  </style>