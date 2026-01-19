import { createClient } from '@supabase/supabase-js';

// These should be set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

// Basic GET function example
export const fetchData = async (tableName, select = '*') => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(select)
      .limit(1);

    if (error) throw error;
    console.log('Fetched data:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

// Add more helper functions here as needed