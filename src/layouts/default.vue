<template>
  <main
    flex="~ grow col" justify="center" items="center"
    class="p-4 text-center text-gray-700 dark:text-gray-200"
    overflow="hidden"
    pb="16"
    min-h="100vh"
  >
    <NavMenu />
    <router-view />
    <BaseFooter />
  </main>
</template>
