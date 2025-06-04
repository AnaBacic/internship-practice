<template>
  <div class="min-h-screen bg-white flex flex-col w-full">
    <section class="w-full bg-blue-100 py-20 text-center">
      <div class="w-full px-6">
        <h1 class="text-4xl font-bold text-blue-900 mb-4">My Todo App</h1>
        <p class="text-lg text-blue-800 mb-6">
          Organize your life with ease. Simple. Fast. Reliable.
        </p>
        <RouterLink v-if="!user" to="/login">
          <Button class="bg-blue-900 text-white hover:bg-blue-700 cursor-pointer">Get Started</Button>
        </RouterLink>
      </div>
    </section>

    <section class="w-full bg-gray-50 py-16">
      <div class="w-full px-6 grid md:grid-cols-3 gap-8 text-center">
        <div class="flex flex-col items-center">
          <LockClosedIcon class="w-10 h-10 text-blue-900 mb-4" />
          <h2 class="text-xl font-semibold text-blue-900 mb-2">Secure Login</h2>
          <p class="text-gray-700">Your data stays safe with industry-standard authentication.</p>
        </div>

        <div class="flex flex-col items-center">
          <BoltIcon class="w-10 h-10 text-blue-900 mb-4" />
          <h2 class="text-xl font-semibold text-blue-900 mb-2">Fast Sync</h2>
          <p class="text-gray-700">Access your tasks anytime, anywhere with real-time sync.</p>
        </div>

        <div class="flex flex-col items-center">
          <LightBulbIcon class="w-10 h-10 text-blue-900 mb-4" />
          <h2 class="text-xl font-semibold text-blue-900 mb-2">Easy to Use</h2>
          <p class="text-gray-700">Minimalist UI designed for focus and productivity.</p>
        </div>
      </div>
    </section>

    <section class="w-full bg-blue-900 py-16 text-center text-white">
      <div class="w-full px-6">
        <h2 class="text-3xl font-bold mb-4">Ready to get organized?</h2>
        <p class="mb-6">Join now and start managing your tasks in seconds.</p>
        <RouterLink v-if="!user" to="/login">
          <Button class="bg-white text-blue-900 hover:bg-blue-200 cursor-pointer">Login or Register</Button>
        </RouterLink>
        <p v-else class="text-blue-100">You're logged in as <strong>{{ user.email }}</strong>.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/composables/useAuth'
import { useHead } from '@vueuse/head'

useHead({
  title: 'My Todo App - Organize Your Life Easily',
  meta: [
    {
      name: 'description',
      content: 'Organize your tasks with ease. Simple. Fast. Reliable task management for everyone.',
    },
    {
      property: 'og:title',
      content: 'My Todo App',
    },
    {
      property: 'og:description',
      content: 'Plan, track and complete your tasks faster and smarter with My Todo App.',
    },
    {
      property: 'og:image',
      content: '/og-image.jpg', 
    },
  ],
})

const { user } = useAuth()

const LockClosedIcon = defineAsyncComponent(() =>
  import('@heroicons/vue/24/solid/LockClosedIcon')
)
const BoltIcon = defineAsyncComponent(() =>
  import('@heroicons/vue/24/solid/BoltIcon')
)
const LightBulbIcon = defineAsyncComponent(() =>
  import('@heroicons/vue/24/solid/LightBulbIcon')
)
</script>
