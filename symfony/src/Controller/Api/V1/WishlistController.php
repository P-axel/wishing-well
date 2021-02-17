<?php

namespace App\Controller\Api\V1;

use App\Entity\Wishlist;
use App\Form\WishlistType;
use App\Repository\UserRepository;
use App\Repository\WishlistRepository;
use App\Service\Follower;
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
 * @Route("/api/v1/wishlists", name="api_v1_wishlist_")
 */
class WishlistController extends AbstractController
{
    /**
     * @Route("", name="browse" , methods={"GET"})
     */
    public function browse(
        Request $request,
        SerializerInterface $serializer,
        UserService $userService,
        WishlistRepository $wishlistRepository
    ): Response {
        // Recovery of the currentUser
        $user = $userService->getCurrentUser();

        // Recovery of wishlists created and followed by the current user
        $createdWishlists = $wishlistRepository->findAllByCreator($user->getId());
        $followedWishlists = $wishlistRepository->findAllFollowedBy($user->getId());

        // Serializing to string the wishlists from the request above and sending a response
        $wishlists = [
            "created" => $createdWishlists,
            "followed" => $followedWishlists,
        ];

        $stringDatas = $serializer->serialize(
            $wishlists,
            'json',
            ['groups' => 'wishlist_browse']
        );

        return JsonResponse::fromJsonString($stringDatas);
    }

    /**
     * @Route("/{slug}", name="read" , methods={"GET"})
     */
    public function read(
        SerializerInterface $serializer,
        string $slug,
        UserRepository $userRepository,
        UserService $userService,
        WishlistRepository $wishlistRepository
    ): Response {
        // Wishlist recovery
        $wishlist = $wishlistRepository->findOneBy(['slug' => $slug]);
        if (is_null($wishlist)) {
            return $this->json([
                'error' => 'La Wishlist demandée n\'existe pas',
            ], 404);
        }
        // Serializing to string the wishlist and sending a response
        $stringDatas = $serializer->serialize(
            $wishlist,
            'json',
            ['groups' => 'wishlist_read']
        );
        return JsonResponse::fromJsonString($stringDatas);
    }

    /**
     * @Route("/{slug}", name="edit", methods={"PUT", "PATCH"})
     */
    public function edit(
        Follower $follow,
        Request $request,
        SerializerInterface $serializer,
        Slugger $slugger,
        string $slug,
        WishlistRepository $wishlistRepository
    ): Response {
        // Recovery of the wishlist asked for edition
        $wishlist = $wishlistRepository->findOneBy(['slug' => $slug]);
        if (is_null($wishlist)) {
            return $this->json([
                'error' => 'La Wishlist n\'existe pas',
            ], 404);
        }
        
        // Collecting and decoding to array the datas in the request
        $wishlistJson = $request->getContent();
        $wishlistArray = json_decode($wishlistJson, true);
        
        // Recovery of the requested method (PUT or PATCH here)
        $method = $request->getMethod();

        // Creation of the form indicating the requested method
        $form = $this->createForm(WishlistType::class, $wishlist, ['csrf_protection' => false, 'method' => $method]);

        // In case of a PUT method, checking if all the fields from the form are filled
        if ($method == "PUT" && (count($form->all()) !== count($wishlistArray))) {
            return $this->json([
                'error' => 'Données incorrectes',
            ], 400);
        }
        
        // Adding or removing the current user from the following list of the wishlist
        if (array_key_exists('follower', $wishlistArray) && count($wishlistArray) === 1) {
            $action = $wishlistArray['follower'];
            $changed = $follow->changeFollowerFromWishlist($wishlist, $action);
            if ($changed) {
                return $this->json([
                    'success' => 'La liste des followers a été mise à jour.',
                ], 200);
            } else {
                return $this->json([
                    'error' => 'L\'action demandée n\'existe pas',
                ], 400);
            }
        }

        // Checking the authorization for editing the wishlist (the current user need to be the creator of the wishlist)
        $this->denyAccessUnlessGranted('EDIT', $wishlist);
        
        // Sumbitting the form with the collected datas.
        $form->submit($wishlistArray);
        
        // Checking the validity of the given datas in the form
        if ($form->isValid()) {
            // Saving into DB
            $em = $this->getDoctrine()->getManager();
            $em->flush();

            // Adding the slug to the datas (flush included in the service)
            $slugger->slugifyWishlist($wishlist);

            // Sending a json response with the datas of the new wihlist
            $stringDatas = $serializer->serialize(
                $wishlist,
                'json',
                ['groups' => 'wishlist_read']
            );
            return JsonResponse::fromJsonString($stringDatas);
        } else {
            // If the datas are not valid, sending error messages in json format
            return $this->json([
                'errors' => (string) $form->getErrors(true, false),
            ], 400);
        }
    }

     /**
     * @Route("", name="add", methods={"POST"})
     */
    public function add(
        Request $request,
        SerializerInterface $serializer,
        Slugger $slugger,
        UserService $userService
    ): Response {
        // Creation of the form with a blank wishlist instance inside
        $wishlist = new Wishlist();
        $form = $this->createForm(WishlistType::class, $wishlist, ['csrf_protection' => false]);
        
        // Collecting the datas in the request
        $wishlistJson = $request->getContent();
        $wishlistArray = json_decode($wishlistJson, true);
        
        // Sumbitting the form with the collected datas.
        $form->submit($wishlistArray);
        
        // Checking the validity of the datas
        if ($form->isValid()) {
            // Setting the currentUser as the creator of the new wishlist
            $user = $userService->getCurrentUser();
            $wishlist->setCreator($user);

            // Saving into DB
            $em = $this->getDoctrine()->getManager();
            $em->persist($wishlist);
            $em->flush();

            // Adding the slug to the datas
            $slugger->slugifyWishlist($wishlist);

            // Sending a json response with the datas of the new wishlist
            $stringDatas = $serializer->serialize(
                $wishlist,
                'json',
                ['groups' => 'wishlist_read']
            );
            return JsonResponse::fromJsonString($stringDatas, 201);
        } else {
            // If the datas are not valid, sending error messages in json format
            return $this->json([
                'errors' => (string) $form->getErrors(true, false),
            ], 400);
        }
    }

    /**
     * @Route("/{slug}", name="delete" , methods={"DELETE"})
     */
    public function delete(WishlistRepository $wishlistRepository, string $slug)
    {
        // Recovery of the wishlist to delete
        $wishlist = $wishlistRepository->findOneBy(['slug' => $slug]);
        if (is_null($wishlist)) {
            return $this->json([
                'error' => 'La Wishlist n\'existe pas',
            ], 404);
        }

        // Checking if the currentUser is the creator of the wishlist to delete
        $this->denyAccessUnlessGranted('DEL', $wishlist);

        // Deleting the wishlist from the DB
        $em = $this->getDoctrine()->getManager();
        $em->remove($wishlist);
        $em->flush();

        // Sending a succes message
        return $this->json([
            'success' => 'La Wishlist a bien été supprimée',
        ], 200);
    }
}
