import { ref } from 'vue'
import supabase from '@/supabase'

const user = ref(null)

const fetchUser = async () => {
  const { data } = await supabase.auth.getUser()
  user.value = data.user
}

fetchUser()

supabase.auth.onAuthStateChange((_event, session) => {
  user.value = session?.user || null
})

export function useAuth() {
  return { user }
}
