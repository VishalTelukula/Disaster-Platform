const supabase = require('../config/supabaseClient');
const { extractCoordinates } = require('../utils/locationUtils');
exports.createDisaster = async (body) => {
    // Extract coordinates
    const location = await extractCoordinates(body.location_name);
  
    //  Add location to body
    const newBody = { ...body, location };
  
    //  Insert into Supabase
    const { data, error } = await supabase
      .from('disasters')
      .insert([newBody])
      .select();
  
    if (error) throw error;
    return data;
  };

exports.getDisasters = async (tag) => {
  let query = supabase.from('disasters').select('*');
  if (tag) {
    query = query.contains('tags', [tag]);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

exports.updateDisaster = async (id, body) => {
  const { data, error } = await supabase
    .from('disasters')
    .update(body)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
};

exports.deleteDisaster = async (id) => {
  const { error } = await supabase
    .from('disasters')
    .delete()
    .eq('id', id);
  if (error) throw error;
};
