import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreatingListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [uploading, setUploading] = useState(false);

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
        setUploading(true)
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      try {
        const urls = await Promise.all(promises);
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    } else {
      alert("You can only add up to 6 images.");
    }
    setUploading(false)
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        CreatingListing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="Description"
            required
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" />
              <span>Parking sport</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                className="p-2 border-gray-300 "
                type="number"
                id="bedrooms"
                min="1"
                max="12"
                required
              />
              <p>Beds</p>
            </div>

            <div className="flex items-center gap-5">
              <input
                className="p-2 border-gray-300 "
                type="number"
                id="baths"
                min="1"
                max="12"
                required
              />
              <p>Baths</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                className="p-2 border-gray-300 "
                type="number"
                id="Regularprice"
                min="1"
                max="1"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ /Months)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                className="p-2 border-gray-300 rounded"
                type="number"
                id="discountprice"
                min="1"
                max="12"
                required
              />
              <div className="flex flex-col items-center">
                <p>Descounted price</p>
                <span className="text-xs">($ /Months)</span>
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-4">
              <p className="font-semibold">
                Images:
                <span className="font-normal text-gray-500">
                  The first image will be the cover(max 6)
                </span>
              </p>
              <div className="n">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="p-3 "
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleImageSubmit}
                  className="p-2 text-green-500 border rounded uppercase hover:shadow-lg disabled:opacity-80"
                >
                  {uploading? "Uploading...": "Upload"}
                </button>
              </div>
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <div className="flex justify-between p-3 border items-center">
                    <img
                      key={index}
                      src={url}
                      alt={`listing ${index}`}
                      className="w-40 h-25 object-cover  rounded-lg "
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="p-3 text-red-700 rounded-lg uppercase hover:opacity-95"
                    >
                      Delete
                    </button>
                  </div>
                ))}

              <button className="p-3 bg-slate-600 text-white rounded-lg uppercase hover:opacity-75">
                Create listing
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
