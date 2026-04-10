import { supabase } from './supabaseClient';

/** Upload image to Supabase Storage **/
export const uploadImage = async (file, userId) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
        .from('coin-images')
        .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
        .from('coin-images')
        .getPublicUrl(fileName);

    return data.publicUrl;
};

/** Delete image from Supabase Storage **/
export const deleteImage = async (imageUrl) => {
  try {
    const fileName = imageUrl.split('/').pop();

    const { error } = await supabase.storage
      .from('coin-images')
      .remove([fileName]);

    if (error) throw error;

  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};