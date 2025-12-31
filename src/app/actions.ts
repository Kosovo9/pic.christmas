"use server";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import crypto from "node:crypto";

const SIZES = [640, 1280, 1920];
const FORMATS = ["webp", "avif"];

export async function uploadPhoto(state: any, formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file");
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = crypto.randomUUID();

  for (const size of SIZES) {
    for (const format of FORMATS) {
      // @ts-expect-error Sharp dynamic format method access
      const out = await sharp(buffer)
        .resize(size, size, { fit: "inside" })
        [format]({ quality: 80 })
        .toBuffer();
      await writeFile(
        join(process.cwd(), "public", `${name}-${size}.${format}`),
        out,
      );
    }
  }

  revalidatePath("/");
  return { name, sizes: SIZES, formats: FORMATS, success: true };
}
