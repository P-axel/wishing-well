<?php

namespace App\EventSubscriber;

use App\Service\UserService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class RequestSubscriber implements EventSubscriberInterface
{

    /** @var  TokenStorageInterface */
    private $userService;

    /**
     * @param TokenStorageInterface  $storage
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function onKernelRequest(RequestEvent $event)
    {
        $tokenHeader = $event->getRequest()->headers->get('Authorization');

        if ($tokenHeader) {
            $user = $this->userService->getCurrentUser();
                if ($user) {
                    $user->setLastConnection(new \DateTime());
                }
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            'kernel.request' => 'onKernelRequest',
        ];
    }
}
