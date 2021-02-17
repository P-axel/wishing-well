<?php

namespace App\Service;

use App\Entity\Gift;
use App\Entity\User;
use App\Entity\Wishlist;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\String\Slugger\SluggerInterface;

class Slugger
{
    private $em;
    private $slugger;

    public function __construct(EntityManagerInterface $em, SluggerInterface $slugger)
    {
        $this->em = $em;
        $this->slugger = $slugger;
    }

    /**
     * @param string $string The string to slugify
     * @return string The new slug
     */
    public function slugify($string)
    {
        return strtolower($this->slugger->slug($string));
    }

    /**
     * @param Wishlist $wishlist
     * @return Wishlist
     */
    public function slugifyWishlist(Wishlist $wishlist)
    {
        $slugWithId = $this->slugify($wishlist->getName()) . '-' . $wishlist->getId();
        $wishlist->setSlug($slugWithId);

        $this->em->flush();
        return $wishlist;
    }

    /**
     * @param Gift $gift
     * @return Gift
     */
    public function slugifyGift(Gift $gift)
    {
        $slugWithId = $this->slugify($gift->getName()) . '-' . $gift->getId();
        $gift->setSlug($slugWithId);

        $this->em->flush();
        return $gift;
    }

    /**
     * @param User $user
     * @return User
     */
    public function slugifyUser(User $user)
    {
        $slugWithId =
            $this->slugify($user->getFirstname()) .
            '-' .
            $this->slugify($user->getLastname()) .
            '-' .
            $user->getId();
        $user->setSlug($slugWithId);

        $this->em->flush();
        return $user;
    }
}
