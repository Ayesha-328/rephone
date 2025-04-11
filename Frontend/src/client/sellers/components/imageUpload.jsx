import React from 'react';
import ImageUploading from 'react-images-uploading';

export function UploadImage() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 5;

  const onChange = (imageList) => {
    setImages(imageList);
  };

  return (
    <div className="flex flex-row items-center space-x-4">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          <div className="flex items-center space-x-4">
            {/* Image List */}
            <div className="flex flex-wrap gap-3 lg:gap-4 ml-2 lg:ml-2 lg:gap-4">
              {imageList.map((image, index) => (
                <div key={index} className="relative w-10 h-10 lg:w-20 lg:h-20">
                  <img
                    src={image['data_url']}
                    alt=""
                    className="w-full h-full rounded-md object-cover cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={() => onImageUpdate(index)}
                  />
                  <span
                    className="absolute -top-2 -right-2 cursor-pointer"
                    onClick={() => onImageRemove(index)}
                  >
                    <img src="/close.png" className="w-3 h-3 cursor-pointer lg:w-5 lg:h-5" alt="remove" />
                  </span>
                </div>
              ))}
            </div>

            {/* Transparent Add Button */}
            {images.length < maxNumber && (
              <button
                className="flex items-center justify-center w-16 h-16 border border-[#FF9F1C] rounded-full lg:w-16 lg:h-16"
                onClick={onImageUpload}
                {...dragProps}
              >
                <img src="/plus.png" alt="add" className="w-3 h-3 lg:w-8 lg:h-8" />
              </button>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
