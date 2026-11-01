/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuImageUp, LuLink, LuX } from "react-icons/lu";
import { API_BASE } from "@/lib/api";
import { imageUrl } from "@/lib/imageUrl";

const MAX_SIDE = 1600;
const MAX_UPLOAD = 3 * 1024 * 1024;

// Shrink big photos in the browser before uploading (keeps uploads fast and small)
async function compressImage(file) {
  if (file.type === "image/gif") return file;
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (scale === 1 && file.size < 900 * 1024) return file;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
  return blob || file;
}

/**
 * Image field with two ways in: upload from the computer, or paste a link.
 * Either way the value is a URL string, so validation and saving stay the same.
 */
export default function ImageInput({ id, value, onChange, error, placeholder = "https://...", shape = "wide" }) {
  const [mode, setMode] = useState("upload");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("That file isn't an image. Choose a JPG, PNG, WebP or GIF.");
      return;
    }
    setUploading(true);
    try {
      const body = await compressImage(file);
      if (body.size > MAX_UPLOAD) {
        toast.error("That image is larger than 3 MB even after resizing. Choose a smaller one.");
        return;
      }
      const res = await fetch(`${API_BASE}/images`, {
        method: "POST",
        headers: { "Content-Type": body.type || "application/octet-stream" },
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Upload failed. Try again.");
      onChange(`${window.location.origin}${API_BASE}/images/${data.id}`);
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err.message === "Failed to fetch" ? "Upload failed. Check that the server is running." : err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const previewClass = shape === "round" ? "h-20 w-20 rounded-full" : "h-20 w-32 rounded-field";

  return (
    <div className="space-y-2">
      <div role="tablist" className="tabs tabs-box tabs-sm w-fit">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "upload"}
          className={`tab gap-1 ${mode === "upload" ? "tab-active" : ""}`}
          onClick={() => setMode("upload")}
        >
          <LuImageUp className="h-4 w-4" /> Upload
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "link"}
          className={`tab gap-1 ${mode === "link" ? "tab-active" : ""}`}
          onClick={() => setMode("link")}
        >
          <LuLink className="h-4 w-4" /> Paste a link
        </button>
      </div>

      {mode === "upload" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex items-center gap-4 rounded-field border-2 border-dashed p-3 transition-colors ${
            dragging ? "border-primary bg-primary/5" : error ? "border-error" : "border-base-300"
          }`}
        >
          {value ? (
            <img src={imageUrl(value)} alt="" className={`${previewClass} shrink-0 object-cover`} />
          ) : (
            <div className={`${previewClass} flex shrink-0 items-center justify-center bg-base-200`}>
              <LuImageUp className="h-6 w-6 text-base-content/40" />
            </div>
          )}
          <div className="min-w-0 flex-1 text-sm">
            <p className="font-medium">{uploading ? "Uploading…" : value ? "Image ready" : "Drop an image here"}</p>
            <p className="text-base-content/60">JPG, PNG, WebP or GIF. Large photos are resized for you.</p>
          </div>
          <div className="flex shrink-0 gap-1">
            <input
              ref={fileRef}
              id={id}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <button
              type="button"
              className="btn btn-outline btn-primary btn-sm rounded-full"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
            >
              {uploading && <span className="loading loading-spinner loading-xs" />}
              {value ? "Change" : "Choose file"}
            </button>
            {value && !uploading && (
              <button type="button" className="btn btn-ghost btn-sm btn-circle" aria-label="Remove image" onClick={() => onChange("")}>
                <LuX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <input
          id={id}
          type="url"
          className={`input w-full ${error ? "input-error" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={!!error}
        />
      )}
    </div>
  );
}
