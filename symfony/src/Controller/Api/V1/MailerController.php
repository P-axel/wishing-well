<?php

// src/Controller/MailerController.php
namespace App\Controller\Api\V1;

use App\Repository\WishlistRepository; 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/v1/email/", name="mail_" , methods={"POST"})
 */
class MailerController extends AbstractController
{
    private $pathToFront;

    public function __construct(ParameterBagInterface $params)
    {
        $this->pathToFront = $params->get('app.path.front');
    }

    // //TODO A ENLEVER AVANT COMMIT JE SUIS SUR QUE JE VAIS OUBLIER...
    // /**
    //  * @Route("test", name="test" , methods={"POST"})
    //  */
    // public function test(MailerInterface $mailer, Request $request, WishlistRepository $wishlistRepository)
    // {
    //     // Collecting the datas in the request
    //     $json = $request->getContent();
    //     $decodedArray = json_decode($json, true);

    //     if (array_key_exists('wishlistSlug', $decodedArray)) {
    //         $wishlist = $wishlistRepository->findOneBy(['slug' => $decodedArray['wishlistSlug']]);
    //         if (is_null($wishlist)) {
    //             return $this->json([
    //                 'error' => 'La Wishlist n\'existe pas',
    //             ], 404);
    //         }

    //         $creator = $wishlist->getCreator();
    //         $creatorName = $creator->getFirstname() . " " . $creator->getLastname();
    //         $linkToShare = $this->pathToFront . "/listes/" . $wishlist->getSlug();

    //         // Render view
    //         return $this->render('email/share.html.twig', array(
    //             'link' => $linkToShare,
    //             'user' => $creator,
    //             'wishlist' => $wishlist,
    //         ));
    //     } else {
    //         $message = 'Votre liste n\'a pas pu être partagée.';
    //         return $this->json([
    //             'partial-content' => $message,
    //         ], 418);
    //     }
    // }
    // //TODO A ENLEVER AVANT COMMIT JE SUIS SUR QUE JE VAIS OUBLIER...

    /**
     * @Route("share", name="share" , methods={"POST"})
     */
    public function shareWishlist(MailerInterface $mailer, Request $request, WishlistRepository $wishlistRepository)
    {
        // Collecting the datas in the request
        $json = $request->getContent();
        $decodedArray = json_decode($json, true);

        if (array_key_exists('wishlistSlug', $decodedArray)) {
            $wishlist = $wishlistRepository->findOneBy(['slug' => $decodedArray['wishlistSlug']]);
            if (is_null($wishlist)) {
                return $this->json([
                    'error' => 'La Wishlist n\'existe pas',
                ], 404);
            }

            // Get who is sending message
            $creator = $wishlist->getCreator();
            $creatorName = $creator->getFirstname() . " " . $creator->getLastname();
            $linkToShare = $this->pathToFront . "/listes/" . $wishlist->getSlug();

            if (array_key_exists('emails', $decodedArray)) {
                $wrongEmails = [];
                foreach ($decodedArray['emails'] as $email) {
                    $validatedEmail = filter_var($email, FILTER_VALIDATE_EMAIL);
                    if ($validatedEmail) {
                        $emailToSend = (new TemplatedEmail())
                        ->from('wishing.well.bot@gmail.com')
                        ->to($validatedEmail)
                        ->subject($creatorName . ' veut vous partager sa liste!')
                        ->htmlTemplate('email/share.html.twig')
                        ->context([
                            'link' => $linkToShare,
                            'user' => $creator,
                            'wishlist' => $wishlist,
                        ]);
            
                        $mailer->send($emailToSend);
                    } else {
                        $wrongEmails[] = $email;
                    }
                }

                if (count($wrongEmails) === 0) {
                    return $this->json([
                        'success' => 'Votre liste a bien été partagée!',
                    ], 200);
                } else {
                    $message = 'Votre liste n\'a pas pu être partagée à : ';
                    foreach ($wrongEmails as $email) {
                        $message .= $email . ', ';
                    }
                    $message = substr($message, 0, -2) . '.';
                    return $this->json([
                        'partial-content' => $message,
                    ], 206);
                }
            }
        }
    }

}