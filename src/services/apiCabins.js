import { v4 } from "uuid";
import supabase, { supabaseUrl } from "./supabase";
const uuid = v4();
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Failed to fetch cabins");
  return data;
}

export async function deleteCabin(id) {
  // Fetch the cabin record to get the file path
  const { data: cabin, error: fetchError } = await supabase
    .from("cabins")
    .select("image")
    .eq("id", id)
    .single();
  if (fetchError) throw new Error("Failed to fetch cabin data");

  if (cabin && cabin.image) {
    // Extract the file path from the image URL
    const filepath = cabin.image.split(
      `${supabaseUrl}/storage/v1/object/public/cabin-images/`
    )[1];

    // Delete the file from storage
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .remove([filepath]);

    if (storageError) throw new Error("Failed to delete storage file");
  }

  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Failed to delete cabin");
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${uuid}-${
    newCabin.image ? newCabin.image.name : ""
  }`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. Create/edit a cabin
  let query = supabase.from("cabins");

  //   A. Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //   B. Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    // console.log(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload the image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image

  if (storageError) {
    // console.log(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}
