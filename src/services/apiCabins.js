import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins data could not be loaded.");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // Check if the image path already starts with the Supabase URL.
  // This is to determine if we are editing an existing cabin with an image already uploaded.
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // If we do not change the image file during edit, we will simply pass the existing image URL.
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit Cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); // This is in an array because Supabase expects an array of objects for insertions.

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be create.");
  }

  // Early return if we don't want to modify the image to prevent uploading it again.
  // This is useful when editing a cabin or duplicating a cabin and not changing the image.
  if (hasImagePath) return data;

  // 2. Upload Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted.");
  }

  return data;
}
