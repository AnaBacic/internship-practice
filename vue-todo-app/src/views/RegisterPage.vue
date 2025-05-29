<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="bg-white p-8 rounded-xl shadow w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-blue-800">Sign up</h2>

      <Form :validation-schema="schema" @submit="handleRegister" class="space-y-4">
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
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-100 hover:text-blue-900 flex items-center justify-center gap-2"
          :disabled="loading"
        >
          <Loader2Icon v-if="loading" class="animate-spin w-5 h-5" />
          <span>{{ loading ? 'Signing up...' : 'Sign up' }}</span>
        </button>
      </Form>

      <p class="text-sm text-center mt-4">
        Have an account?
        <RouterLink to="/login" class="text-blue-600 hover:underline">Sign in</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import supabase from '@/supabase'
import { Loader2Icon } from 'lucide-vue-next'

import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'

const loading = ref(false)
const router = useRouter()

const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one number')
})

const { errors } = useForm({ validationSchema: schema })

const handleRegister = async (values) => {
  loading.value = true
  const { email, password } = values

  const { error } = await supabase.auth.signUp({ email, password })

  loading.value = false

  if (error) {
    alert('Sign up failed: ' + error.message)
  } else {
    alert('Sign up success! Check your email to verify your account.')
    router.push('/login')
  }
}
</script>
