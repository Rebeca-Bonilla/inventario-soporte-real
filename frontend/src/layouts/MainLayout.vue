<template>
  <div class="layout">
    <SidebarView />

    <div class="content">
      <TopbarView />
      <main class="page">
        <router-view />
      </main>
    </div>
  </div>
</template>
