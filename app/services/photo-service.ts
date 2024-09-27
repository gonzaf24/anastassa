// photoService.ts

export const uploadPhoto = async (file: File, folderName: string = 'prendas'): Promise<string> => {
  try {
    const response = await fetch(`/api/photos?fileName=${file.name}&folderName=${folderName}`, {
      method: 'POST',
      body: file,
    });

    if (!response.ok) {
      throw new Error('Error uploading the photo');
    }

    const result = await response.json();

    if (result.blob && result.blob.url) {
      return result.blob.url; // Return the uploaded photo URL
    } else {
      throw new Error('Invalid response from the server');
    }
  } catch (error) {
    console.error('Error in uploadPhoto:', error);
    throw error;
  }
};

export const deletePhoto = async (fileUrl: string): Promise<void> => {
  try {
    const response = await fetch(`/api/photos?fileUrl=${fileUrl}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting the photo');
    }
  } catch (error) {
    console.error('Error in deletePhoto:', error);
    throw error;
  }
};
