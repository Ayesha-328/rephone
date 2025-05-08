import React from 'react';
import ImageUploading from 'react-images-uploading';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// Accept onImagesChange prop
export function UploadImage({ onImagesChange }) {
  const [images, setImages] = React.useState([]); // Internal state for display
  const maxNumber = 5; // Or get from props if needed

  const onChange = (imageList, addUpdateIndex) => {
    // Update the internal state for display
    setImages(imageList);
    // Call the callback prop passed from the parent (SellerForm)
    // Pass only the actual file objects
    onImagesChange(imageList.map(image => image.file));
  };

  return (
    // Removed outer flex container, let parent control layout if needed
    <ImageUploading
      multiple
      value={images} // Uses internal state for the component's display logic
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
      acceptType={['jpg', 'png', 'jpeg', 'webp']} // Specify accepted types
    >
      {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
        <div className="flex flex-col sm:flex-row items-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Image List */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 lg:gap-4 ml-0 lg:ml-2 flex-grow"> {/* Adjusted alignment and growth */}
            {imageList.length === 0 && !isDragging && (
                 <div
                    className="w-full text-center text-gray-500 py-4 px-2 border-2 border-dashed border-gray-300 rounded-md"
                     {...dragProps} // Allow dragging onto the text area too
                 >
                     Click the button or drag images here (max {maxNumber}).
                 </div>
            )}
             {isDragging && (
                 <div className="w-full text-center text-blue-500 font-semibold py-4 px-2 border-2 border-dashed border-blue-400 rounded-md bg-blue-50">
                     Drop images here...
                 </div>
            )}
            {imageList.map((image, index) => (
              <div key={index} className="relative w-16 h-16 lg:w-20 lg:h-20 group"> {/* Added group for hover effect */}
                <img
                  src={image['data_url']}
                  alt={`upload-${index}`}
                  className="w-full h-full rounded-md object-cover border border-gray-200"
                />
                 {/* Overlay for update/remove shown on hover */}
                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-200 rounded-md">
                    <button
                        type="button" // Prevent form submission
                        onClick={() => onImageUpdate(index)}
                        className="text-white opacity-0 group-hover:opacity-100 p-1 mx-1 hover:bg-gray-700 rounded-full"
                        title="Update"
                     >
                         ✏️ {/* Example using emoji */}
                    </button>
                    <button
                        type="button" // Prevent form submission
                        onClick={() => onImageRemove(index)}
                         className="text-white opacity-0 group-hover:opacity-100 p-1 mx-1 hover:bg-red-600 rounded-full"
                         title="Remove"
                    >
                        🗑️ {/* Example using emoji */}
                    </button>
                 </div>
              </div>
            ))}
          </div>

          {/* Add Button - Conditionally render */}
          {images.length < maxNumber && (
            <button
              type="button" // IMPORTANT: Prevent this button from submitting the form
              className={`flex items-center justify-center w-16 h-16 border border-[#FF9F1C] rounded-full flex-shrink-0 ${isDragging ? 'border-blue-500' : ''} hover:bg-orange-50`}
              style={isDragging ? { border: '2px dashed blue' } : undefined}
              onClick={onImageUpload} // Handles click to open file dialog
              {...dragProps} // Spread drag props onto the button
              title={`Add image (${images.length}/${maxNumber})`}
            >
              <img src="/plus.png" alt="add" className="w-5 h-5 lg:w-8 lg:h-8" />
            </button>
          )}
        </div>
      )}
    </ImageUploading>
  );
}

// Add PropTypes for better component usage understanding and error checking
UploadImage.propTypes = {
    onImagesChange: PropTypes.func.isRequired,
};