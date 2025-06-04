<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="bg-white p-8 rounded-xl shadow w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-blue-800">Login</h2>

      <Form :validation-schema="schema" @submit="handleLogin" class="space-y-4">
        <div>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 border rounded"
            :class="{ 'border-red-500': errors.email }"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <Field
            name="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border rounded"
            :class="{ 'border-red-500': errors.password }"
          />
          <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-100 hover:text-blue-900 flex items-center justify-center gap-2 cursor-pointer"
          :disabled="loading"
        >
          <component :is="Loader2Icon" v-if="loading" class="animate-spin w-5 h-5" />
          <span>{{ loading ? 'Logging in...' : 'Login' }}</span>
        </button>
      </Form>

      <div class="text-center my-4 text-sm text-gray-500">or</div>

      <button
        @click="signInWithGoogle"
        class="w-full border py-2 rounded hover:bg-gray-100 cursor-pointer"
        :disabled="loading"
      >
        Login with Google
      </button>

      <p class="text-sm text-center mt-4">
        <RouterLink to="/forgot-password" class="text-blue-600 hover:underline">
          Forgot password?
        </RouterLink>
      </p>

      <p class="text-sm text-center mt-4">
        Don't have an account?
        <RouterLink to="/register" class="text-blue-600 hover:underline">Sign up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/supabase'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'

const loading = ref(false)
const Loader2Icon = computed(() =>
  loading.value
    ? defineAsyncComponent(() =>
        import('lucide-vue-next').then((mod) => mod.Loader2Icon)
      )
    : null
)

const schema = yup.object({
  email: yup.string().required('Please enter your email').email('Invalid email format'),
  password: yup.string().required('Please enter your password')
})

const { errors } = useForm({ validationSchema: schema })
const router = useRouter()

const handleLogin = async (values) => {
  loading.value = true
  const { email, password } = values
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  loading.value = false

  if (error) {
    alert('Login failed: ' + error.message)
  } else {
    router.push('/')
  }
}

const signInWithGoogle = async () => {
  loading.value = true
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
  loading.value = false

  if (error) alert('Error with Google login: ' + error.message)
}
</script>
