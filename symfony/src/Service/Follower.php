<?php

namespace App\Service;

use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;

class Follower
{
    private $em;
    private $userService;

    public function __construct(EntityManagerInterface $em, UserService $userService)
    {
        $this->em = $em;
        $this->userService = $userService;
    }

    public function changeFollowerFromWishlist($wishlist, $action)
    {
        $user = $this->userService->getCurrentUser();
        if ($action === "add") {
            $wishlist->addFollower($user);
        } elseif ($action === "remove") {
            $wishlist->removeFollower($user);
        } else {
            return false;
        }
        $this->em->flush();
        return true;
    }
}
