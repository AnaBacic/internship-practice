import { ref } from 'vue'
import supabase from '@/supabase'

export const getTodos = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('id', { ascending: false })

  if (error) {
    console.error('Error fetching todos:', error)
    return []
  }

  return data
}

export const addTodo = async (text) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { error } = await supabase.from('todos').insert([
    {
      text,
      is_complete: false,
      user_id: user.id,
    },
  ])

  if (error) {
    console.error('Error adding todo:', error)
  }
}

export const updateTodoInDb = async (todo) => {
  const { error } = await supabase
    .from('todos')
    .update({
      text: todo.text,
      is_complete: todo.is_complete,
    })
    .eq('id', todo.id)

  if (error) {
    console.error('Error updating todo:', error)
  }
}

export const deleteTodoFromDb = async (id) => {
  const { error } = await supabase.from('todos').delete().eq('id', id)

  if (error) {
    console.error('Error deleting todo:', error)
  }
}
