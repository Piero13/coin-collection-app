import { supabase } from './supabaseClient';

/** Fetch all coins **/
export const getCoins = async () => {
  const { data, error } = await supabase
    .from('coins')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
};

/** Add a new coin **/
export const addCoin = async (coin) => {
  const { data, error } = await supabase
    .from('coins')
    .insert([coin])
    .select()
    .single();

  if (error) throw error;

  return data;
};

/** Update a coin **/
export const updateCoin = async (id, updates) => {
  const { data, error } = await supabase
    .from('coins')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

/** Delete a coin **/
export const deleteCoin = async (id) => {
  const { error } = await supabase
    .from('coins')
    .delete()
    .eq('id', id);

  if (error) throw error;

  return true;
};