<?php

namespace App\EventSubscriber;

use App\Service\UserService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class ResponseSubscriber implements EventSubscriberInterface
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

    public function onKernelResponse(ResponseEvent $event)
    {
        $requestedRoute = $event->getRequest()->attributes->get('_route');
        if ($requestedRoute === "api_login_check") {
            
            // Avant de renvoyer la réponse, on récup le user et collecte les données voulues
            $user = $this->userService->getCurrentUser();

            // S'il existe on change notre réponse
            if($user) {

                $firstname = $user->getFirstName();
                $lastname = $user->getLastname();
                $slug = $user->getSlug();
                $email = $user->getEmail();
                $birthday = $user->getBirthday();
                $lastConnection = $user->getLastConnection();
                $avatar = $user->getAvatar();
                
                // On intercepte le contenu de la réponse
                $content = $event->getResponse()->getContent();
                
                // On le convertit en AssosiactiveArray
                $contentDecoded = json_decode($content, true);
                // On Rajoute les infos du user
                $newContent["firstname"] = $firstname;
                $newContent["lastname"] = $lastname;
                $newContent["slug"] = $slug;
                $newContent["email"] = $email;
                $newContent["birthday"] = $birthday;
                $newContent["lastConnection"] = $lastConnection;
                $newContent["avatar"] = $avatar;
                $newContent["token"] = $contentDecoded["token"]; //
                
                // On reconvertit en Json
                $newContentJson = json_encode($newContent);
                
                // On modifie la réponse
                $event->getResponse()->setContent($newContentJson);
            }
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            'kernel.response' => 'onKernelResponse',
        ];
    }
}
