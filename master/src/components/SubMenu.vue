<template functional>
  <a-sub-menu :key="props.menuItem.subKey">
    <span slot="title">
      <a-icon :type="props.menuItem.icon" v-if="props.layout_model !== 'horizontal'" />
      <span>{{ props.menuItem.title }}</span>
    </span>
    <template v-for="(v, i) in props.menuItem.children">
      <a-menu-item v-if="!v.children" :key="v.url">
        {{ v.title }}
      </a-menu-item>
      <sub-menu v-else :menu-item="v" :key="i" />
    </template>
  </a-sub-menu>
</template>
<script> 
