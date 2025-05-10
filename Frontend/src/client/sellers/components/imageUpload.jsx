import React from 'react';
import ImageUploading from 'react-images-uploading';
import PropTypes from 'prop-types';

export function UploadImage({ onImagesChange }) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 5;

    const onChange = (imageList) => {
        setImages(imageList);
        // Extract only the file objects and pass to parent
        const files = imageList.map(image => image.file);
        if (onImagesChange) {
            onImagesChange(files);
        }
    };

    return (
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={['jpg', 'jpeg', 'png', 'webp']}
        >
            {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
            }) => (
                <div className="upload__image-wrapper">
                    {imageList.length === 0 ? (
                        <div
                            className={`p-4 border-2 border-dashed rounded-md text-center cursor-pointer ${
                                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                            }`}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            {isDragging ? (
                                <p className="text-blue-500">Drop images here</p>
                            ) : (
                                <p>Click or drag images here (max {maxNumber})</p>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {imageList.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={image.data_url}
                                        alt={`upload-${index}`}
                                        className="w-20 h-20 object-cover rounded border"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center gap-1 transition-opacity duration-200 rounded">
                                        <button
                                            type="button"
                                            onClick={() => onImageUpdate(index)}
                                            className="text-white opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded-full"
                                            title="Update"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onImageRemove(index)}
                                            className="text-white opacity-0 group-hover:opacity-100 p-1 hover:bg-red-600 rounded-full"
                                            title="Remove"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {imageList.length < maxNumber && (
                        <button
                            type="button"
                            className={`mt-2 p-2 border rounded-md flex items-center justify-center ${
                                isDragging ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            + Add Images ({imageList.length}/{maxNumber})
                        </button>
                    )}
                </div>
            )}
        </ImageUploading>
    );
}

UploadImage.propTypes = {
    onImagesChange: PropTypes.func.isRequired
};