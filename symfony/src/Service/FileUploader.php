<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class FileUploader
{
    private $pathToGiftPictures;

    private $pathToAvatarPictures;

    public function __construct(ParameterBagInterface $params)
    {
        $this->pathToGiftPictures = $params->get('app.path.gift_pictures');
        $this->pathToAvatarPictures = $params->get('app.path.avatar_pictures');
    }

    // Upload an image(generated from InitailsImageCreator) into avatars folder
    public function uploadGeneratedImage($image)
    {
        // Generating unique file name
        $fileName = "Generated" . uniqid() . ".png";
        $path = $this->pathToAvatarPictures;
      
        // Saving image
        imagepng($image, $path . $fileName);

        return $fileName;
    }

    // Both following functions determine the folder in wich image will be put
    public function uploadAvatarPicture(string $file)
    {
        return $this->uploadFile($file, $this->pathToAvatarPictures);
    }

    public function uploadGiftPicture(string $file)
    {
        return $this->uploadFile($file, $this->pathToGiftPictures);
    }

    // Upload an image from base 64 string
    public function uploadFile(string $file, string $path)
    {
        
        // Using next function to get extension type
        $pos  = strpos($file, ';');
        $type = explode(':', substr($file, 0, $pos))[1];
        if (!$type) {
            return false;
        }
        $extension = $this->mime2ext($type);

        // Decoded image data
        $imageData = base64_decode(explode(',', $file)[1]);
        
        // Generating unique file name
        $fileName = uniqid() . "." . $extension;

        //Saving image
        file_put_contents($path . $fileName, $imageData);

        return $fileName;
    }

    // Get extension from mime type according to the array below
    private function mime2ext($mime)
    {
        $mime_map = [
            'image/bmp'                                                                 => 'bmp',
            'image/x-bmp'                                                               => 'bmp',
            'image/x-bitmap'                                                            => 'bmp',
            'image/x-xbitmap'                                                           => 'bmp',
            'image/x-win-bitmap'                                                        => 'bmp',
            'image/x-windows-bmp'                                                       => 'bmp',
            'image/ms-bmp'                                                              => 'bmp',
            'image/x-ms-bmp'                                                            => 'bmp',
            'image/cdr'                                                                 => 'cdr',
            'image/x-cdr'                                                               => 'cdr',
            'image/gif'                                                                 => 'gif',
            'image/x-icon'                                                              => 'ico',
            'image/x-ico'                                                               => 'ico',
            'image/vnd.microsoft.icon'                                                  => 'ico',
            'image/jp2'                                                                 => 'jp2',
            'image/jpx'                                                                 => 'jp2',
            'image/jpm'                                                                 => 'jp2',
            'image/jpeg'                                                                => 'jpeg',
            'image/pjpeg'                                                               => 'jpeg',
            'image/png'                                                                 => 'png',
            'image/x-png'                                                               => 'png',
            'image/vnd.adobe.photoshop'                                                 => 'psd',
            'image/svg+xml'                                                             => 'svg',
            'image/tiff'                                                                => 'tiff',
            'image/webp'                                                                => 'webp',
        ];
    
        return isset($mime_map[$mime]) ? $mime_map[$mime] : false;
    }
}
