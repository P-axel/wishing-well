<?php

namespace App\Controller\Api\V1;

use App\Entity\Gift;
use App\Form\GiftType;
use App\Repository\GiftRepository;
use App\Repository\WishlistRepository;
use App\Service\FileUploader;
use App\Service\InitialsImageCreator;
use App\Service\Slugger;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/v1/gifts", name="api_v1_gift_")
 */
class GiftController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(
        GiftRepository $giftRepository,
        Request $request,
        SerializerInterface $serializer,
        UserService $userService,
        WishlistRepository $wishlistRepository
        ): Response
    {
        if ($request->query->get('wishlist')) {
            // Check if current user is specified wishlist's creator, so we can send surprises or not
            $wishlistSlug = $request->query->get('wishlist');
            $currentUser = $userService->getCurrentUser();
            $creator = $wishlistRepository->findOneBy(['slug' => $wishlistSlug])->getCreator();
            $isCreator = $currentUser === $creator;
            $gifts = $giftRepository->findAllByParams($isCreator, $wishlistSlug);
        } else {
            $gifts = $giftRepository->findAllByParams(false);
        }

        if (!$gifts) {
            return $this->json([
                'error' => 'Aucun Gift n\'a été trouvé',
            ], 204);
        }

        $json = $serializer->serialize(
            $gifts,
            'json',
            ['groups' => 'gift_browse']
        );

        $response = JsonResponse::fromJsonString($json);
        return $response;

        // https://symfony.com/blog/new-in-symfony-5-1-serializer-improvements
        // https://symfony.com/doc/current/serializer.html#using-serialization-groups-annotations
        // https://symfony.com/doc/current/components/http_foundation.html#request
    }

    /**
     * @Route("/{slug}", name="read" , methods={"GET"})
     */
    public function read(GiftRepository $giftRepository, SerializerInterface $serializer, string $slug): Response
    {
        $gift = $giftRepository->findOneBy(['slug' => $slug]);

        if (is_null($gift)) {
            return $this->json([
                'error' => 'Le Gift demandé n\'existe pas',
            ], 404);
        }

        $json = $serializer->serialize(
            $gift,
            'json',
            ['groups' => 'gift_read']
        );

        $response = JsonResponse::fromJsonString($json);
        return $response;
    }

    /**
     * @Route("/{slug}", name="edit", methods={"PUT", "PATCH"})
     */
    public function edit(
        GiftRepository $giftRepository,
        Slugger $slugger,
        InitialsImageCreator $initialsImageCreator,
        FileUploader $fileUploader,
        Request $request,
        SerializerInterface $serializer,
        string $slug
    ): Response
    {
        $method = $request->getMethod();
        $gift = $giftRepository->findOneBy(['slug' => $slug]);

        if (is_null($gift)) {
            return $this->json([
                'error' => 'Le Gift n\'existe pas',
            ], 404);
        }

        $form = $this->createForm(GiftType::class, $gift, ['csrf_protection' => false, 'method' => $method]);
        
        // Collecting the datas in the request
        $giftJson = $request->getContent();
        $giftArray = json_decode($giftJson, true);

        if (array_key_exists('picture', $giftArray) && $giftArray['picture'] == $gift->getPicture() || !array_key_exists('picture', $giftArray)) {
            // If there was no picture changing in request, keep the same by removing form's field
            unset($giftArray['picture']);
        } else if (array_key_exists('picture', $giftArray) && $giftArray['picture'] !== null) { //If there's a picture, upload it
            $giftArray['picture'] = $fileUploader->uploadGiftPicture($giftArray['picture']);
            if (is_null($giftArray['picture'])) {
                return $this->json([
                    'error' => 'Mauvais format d\'image',
                ], 400);
            }
        }
        
        // Check if all fields are listed during PUT method
        if ($method == "PUT" && (count($form->all()) !== count($giftArray))) {
            return $this->json([
                'error' => 'Données incorrectes',
            ], 400);
        }

        // Check if only status is being edited
        if (array_key_exists('status', $giftArray) && count($giftArray) === 1) {
            $gift->setStatus($giftArray['status']);
            $em = $this->getDoctrine()->getManager();
            if ($giftArray['status'] === 0 && $gift->getIsArchived() === true) {
                $em->remove($gift);
            }
            $em->flush();
            return $this->json([
                'success' => 'Le Gift a été modifié',
            ], 200);
        }

        $this->denyAccessUnlessGranted('EDIT', $gift);

        // Sumbitting the form with the collected datas.
        $form->submit($giftArray);
        
        if ($form->isValid()) {
            $formFields = $form->all();
            if (array_key_exists('isHighlighted', $formFields)) {
                $isHighlighted = $form->get('isHighlighted')->getData();
                $gift->setIsHighlighted(boolval($isHighlighted));
            }

            if ($gift->getPicture() === null) {
                $gift->setPicture('default-gift.jpeg');
            }
            
            $em = $this->getDoctrine()->getManager();
            $em->flush();

            // Adding the slug to the datas
            $slugger->slugifyGift($gift);

            // Sending a json response with the datas of the new wihlist
            $json = $serializer->serialize(
                $gift,
                'json',
                ['groups' => 'gift_read']
            );
            $response = JsonResponse::fromJsonString($json);
            return $response;
        } else {

            if (array_key_exists('picture', $giftArray) && $giftArray['picture'] !== null) {    
                $initialsImageCreator->deleteImage($giftArray['picture']);
            }

            return $this->json([
                'errors' => (string) $form->getErrors(true, false),
            ], 400);
        }
    }

    /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(
        FileUploader $fileUploader,
        InitialsImageCreator $initialsImageCreator,
        Request $request,
        SerializerInterface $serializer,
        Slugger $slugger,
        UserService $userService
    ): Response
    {
        $user = $userService->getCurrentUser();
        
        // Creation of the form with a blank gift instance inside
        $gift = new Gift();
        $form = $this->createForm(GiftType::class, $gift, ['csrf_protection' => false]);

        // Collecting the datas in the request
        $giftJson = $request->getContent();
        $giftArray = json_decode($giftJson, true);

        // Uploading image if there's one
        if (array_key_exists('picture', $giftArray) && $giftArray['picture'] !== null) {
            $giftArray['picture'] = $fileUploader->uploadGiftPicture($giftArray['picture']);
            if (is_null($giftArray['picture'])) {
                return $this->json([
                    'error' => 'Mauvais format d\'image',
                ], 400);
            } 
        } else if (array_key_exists('picture', $giftArray) && $giftArray['picture'] === null || !array_key_exists('picture', $giftArray)) {
            // If there was no picture in request, put the default one
            $giftArray['picture'] = "default-gift.jpeg";

        }
        
        // Sumbitting the form with the collected datas.
        $form->submit($giftArray);
        
        if ($form->isValid()) {
            $isHighlighted = $form->get('isHighlighted')->getData();
            $gift->setIsHighlighted(boolval($isHighlighted));
            
            // Adding the creator
            $gift->setCreator($user);

            // Adding the buyer when needed
            if ($gift->getStatus() === 1) {
                $gift->setBuyer($user);
            }
            
            // Saving into DB
            $em = $this->getDoctrine()->getManager();
            $em->persist($gift);
            $em->flush();
            
            // Adding the slug to the datas
            $slugger->slugifyGift($gift);

            // Sending a json response with the datas of the new wihlist
            $json = $serializer->serialize(
                $gift,
                'json',
                ['groups' => 'gift_read']
            );
            $response = JsonResponse::fromJsonString($json, 201);
            return $response;
        } else {

            if (array_key_exists('picture', $giftArray) && $giftArray['picture'] !== null) {    
                $initialsImageCreator->deleteImage($giftArray['picture']);
            }

            return $this->json([
                'errors' => (string) $form->getErrors(true, false),
            ], 400);
        }
    }

    /**
     * @Route("/{slug}", name="delete" , methods={"DELETE"})
     */
    public function delete(GiftRepository $giftRepository, string $slug)
    {
        $gift = $giftRepository->findOneBy(['slug' => $slug]);
        if (is_null($gift)) {
            return $this->json([
                'error' => 'Le Gift n\'existe pas',
            ], 404);
        }
        $this->denyAccessUnlessGranted('DEL', $gift);
        
        $em = $this->getDoctrine()->getManager();
        
        // We don't delete already bought gifts, we simply archive them
        if (!is_null($gift->getBuyer())) {
            $gift->setIsArchived(true);
        } else {
            $em->remove($gift);
        }
        
        $em->flush();

        return $this->json([
            'success' => 'Le Gift a bien été supprimé',
        ], 200);
    }
}
