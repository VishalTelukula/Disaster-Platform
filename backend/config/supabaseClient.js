const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
//can use in the project via require

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;
