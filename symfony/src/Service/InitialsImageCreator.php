<?php

namespace App\Service;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class InitialsImageCreator
{
    private $pathToAvatarPictures;

    private $pathToFonts;

    private $fileUploader;

    public function __construct(ParameterBagInterface $params, FileUploader $fileUploader)
    {
        $this->pathToAvatarPictures = $params->get('app.path.avatar_pictures');
        $this->pathToFonts = $params->get('app.path.fonts');
        $this->fileUploader = $fileUploader;
    }

    // Get initials of specified user
    public function getInitials($user)
    {
        $oldFirstnameInitial =  substr($user->getFirstName(), 0, 1);
        $oldLastnameInitial = substr($user->getLastName(), 0, 1);
        return $oldFirstnameInitial . $oldLastnameInitial;
    }

    // Delete an image, so there's not unused generated image
    public function deleteImage($image) {
        return unlink($this->pathToAvatarPictures . $image);
    }
    
    // Generate an image using initials of specified user
    public function createDefaultImage($user)
    {
        // Get user's initials
        $firstnameInitial =  substr($user->getFirstName(), 0, 1);
        $lastnameInitial = substr($user->getLastName(), 0, 1);
        
        // Create image
        $image = imagecreate(100,100);
        $background = imagecolorallocate($image, mt_rand(130,255), mt_rand(130,255), mt_rand(130,255));
        $letters = imagecolorallocate($image, mt_rand(0,100), mt_rand(0,100), mt_rand(0,100));
        $grey = imagecolorallocate($image, 128, 128, 128);
        
        // User's initals are used to write in the image
        imagefttext($image, 25, 15, 30, 55, $letters, $this->pathToFonts.'Poppins-ExtraBold.ttf', $firstnameInitial);
        imagefttext($image, 25, -15, 45, 70, $letters, $this->pathToFonts.'Poppins-ExtraBold.ttf', $lastnameInitial);

        // Preview
        // header ("Content-type: image/png");
        // imagepng($image);
        // imagedestroy($image); 
        // die;

        // Upload file
        return $this->fileUploader->uploadGeneratedImage($image);
    }
}