<?php

namespace App\EventListener;

use App\Entity\Gift;
use App\Service\UserService;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class GiftChangeBuyerUpdate
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    // Trigger each time right before a gift is updated
    public function preUpdate(Gift $gift, LifecycleEventArgs $event)
    {
        // Check if status has been modified, current user then becomes buyer, or not anymore
        $changedFields = $event->getEntityChangeSet();
        foreach ($changedFields as $fieldName => $values) {
            if ($fieldName === "status") {
                if ($values[1] === 0) {
                    $gift->setBuyer(null);
                }
                if ($values[1] === 1) {
                    $currentUser = $this->userService->getCurrentUser();
                    $gift->setBuyer($currentUser);
                }
            }
        }
    }
}
