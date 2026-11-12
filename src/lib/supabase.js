import { createClient } from "@supabase/supabase-js";

// ১. পরিবেশ ভেরিয়েবল থেকে Supabase প্রজেক্টের URL এবং Public Anon Key নেওয়া
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ২. যদি কোনো কারণে .env ফাইলে কী না থাকে তবে সতর্কবার্তা দেওয়া
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or Anon Key is missing in .env.local file!");
}

// ৩. সুপাবেস ক্লায়েন্ট ইনস্ট্যান্স তৈরি করা
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

