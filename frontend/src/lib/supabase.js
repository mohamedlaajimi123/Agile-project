import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://wxbidwtilvdexkdkvugq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Ymlkd3RpbHZkZXhrZGt2dWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNjUzNTksImV4cCI6MjA5MjY0MTM1OX0.6cwMzptTRxcmVhXF9qRZdRWpymnKedfImUOvWi9Xbxs"
)

export default supabase