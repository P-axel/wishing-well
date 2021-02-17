<?php

namespace App\Controller\Api\V1;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use App\Service\FileUploader;
use App\Service\InitialsImageCreator;
use App\Service\Slugger;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/v1/users", name="api_v1_user_")settin
 */
class UserController extends AbstractController
{
    /**
     * @Route("", name="browse", methods={"GET"})
     */
    public function browse(UserRepository $userRepository, SerializerInterface $serializer): Response
    {
        
        $users = $userRepository->findAll();

        $json = $serializer->serialize(
            $users,
            'json',
            ['groups' => 'user_browse']
        );

        $response = JsonResponse::fromJsonString($json);
        return $response;
    }

    /**
     * @Route("/current", name="read", methods={"GET"})
     */
    public function read(
        UserService $userService,
        SerializerInterface $serializer
        ): Response {
        $user = $userService->getCurrentUser();

        if (is_null($user)) {
            return $this->json([
                'error' => 'L\'utilisateur n\'existe pas',
            ], 404);
        }

        $this->denyAccessUnlessGranted('READ', $user);
        
        $json = $serializer->serialize(
            $user,
            'json',
            ['groups' => 'user_read']
        );
        
        $response = JsonResponse::fromJsonString($json);
        return $response;
    }

    /**
     * @Route("", name="edit", methods={"PUT", "PATCH"})
     */
    public function edit(
        FileUploader $fileUploader,
        InitialsImageCreator $initialsImageCreator,
        Request $request,
        SerializerInterface $serializer,
        Slugger $slugger,
        UserService $userService
    ): Response {
        $method = $request->getMethod();

        // Creation of the form with a blank user instance inside
        $user = $userService->getCurrentUser();

        if (is_null($user)) {
            return $this->json([
                'error' => 'L\'utilisateur n\'existe pas',
            ], 404);
        }

        $this->denyAccessUnlessGranted('EDIT', $user);

        $form = $this->createForm(UserType::class, $user, ['csrf_protection' => false,  'method' => $method]);

        // Collecting the datas in the request
        $userJson = $request->getContent();
        $userArray = json_decode($userJson, true);
        
        if ($method == "PUT" && (count($form->all()) !== count($userArray))) {
            return $this->json([
                'error' => 'Données erronnées',
            ], 400);
        }

        // Upload image if there's one
        if (array_key_exists('avatar', $userArray)) {

            if ($userArray['avatar'] !== null) {

                $userArray['avatar'] = $fileUploader->uploadAvatarPicture($userArray['avatar']);
                
                if (is_null($userArray['avatar'])){
                    return $this->json([
                        'error' => 'Mauvais format d\'image',
                ], 400);
                }

            }
        }
        
        $oldFilename = $user->getAvatar();
        $oldInitials = $initialsImageCreator->getInitials($user);
        
        // Sumbitting the form with the collected datas.
        $form->submit($userArray);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $newInitials = $initialsImageCreator->getInitials($user);

            if ($user->getAvatar() == null || (preg_match('/^(Generated)/', $user->getAvatar()) && $oldInitials != $newInitials)) {
                //s'il y a déja un avatar, on le supprime
                if ($oldFilename !== null){
                    $initialsImageCreator->deleteImage($oldFilename);
                }

                $user->setAvatar($initialsImageCreator->createDefaultImage($user));
            }

            // Saving into DB
            $em->flush();
            // Adding the slug to the datas
            $slugger->slugifyUser($user);

            // Sending a json response with the datas of the new wihlist
            $json = $serializer->serialize(
                $user,
                'json',
                ['groups' => 'user_read']
            );
            $response = JsonResponse::fromJsonString($json);
            return $response;
        } else {

            if (array_key_exists('avatar', $userArray)) {    
                $initialsImageCreator->deleteImage($userArray['avatar']);
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
        Slugger $slugger,
        SerializerInterface $serializer,
        Request $request,
        UserPasswordEncoderInterface $encoder
    ): Response {
        // Creation of the form with a blank user instance inside
        $user = new User();
        $form = $this->createForm(UserType::class, $user, ['csrf_protection' => false]);
        
        // Collecting the datas in the request
        $userJson = $request->getContent();
        $userArray = json_decode($userJson, true);

        if ((array_key_exists('avatar', $userArray) && $userArray['avatar'] == null) || !array_key_exists('avatar', $userArray)) {
            // Get ready to generate default image from user's initials
            $prepareToCreateImage = true;
        } else {
            $userArray['avatar'] = $fileUploader->uploadAvatarPicture($userArray['avatar']);
            if (is_null($userArray['avatar'])){
                return $this->json([
                    'error' => 'Mauvais format d\'image',
            ], 400);
            }
        }

        // Sumbitting the form with the collected datas.
        $form->submit($userArray);

        $password = $form->get('password')->getData();
        
        if ($form->isValid() && !is_null($password)) {
            $user->setPassword($encoder->encodePassword($user, $password));

            // If there was no avatar, we generate on from user's initials
            if (isset($prepareToCreateImage) && $prepareToCreateImage){
                $filename = $initialsImageCreator->createDefaultImage($user);
                $user->setAvatar($filename);
            }

            $em = $this->getDoctrine()->getManager();
            // Saving into DB
            $em->persist($user);
            $em->flush();
            
            // Adding the slug to the datas
            $slugger->slugifyUser($user);

            // Sending a json response with the datas of the new user
            $json = $serializer->serialize(
                $user,
                'json',
                ['groups' => 'user_read']
            );
            $response = JsonResponse::fromJsonString($json, 201);
            return $response;
        } else {

            if (array_key_exists('avatar', $userArray)) {    
                $initialsImageCreator->deleteImage($userArray['avatar']);
            }

            return $this->json([
                'errors' => (string) $form->getErrors(true, false),
            ], 400);
        }
    }
      
    /**
     * @Route("", name="delete" , methods={"DELETE"})
     */
    public function delete(UserService $userService)
    {
        $user = $userService->getCurrentUser();
        if (is_null($user)) {
            return $this->json([
                'error' => 'L\'Utilisateur n\'existe pas',
            ], 404);
        }
        $this->denyAccessUnlessGranted('DEL', $user);

        $em = $this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        return $this->json([
            'success' => 'L\'Utilisateur a bien été supprimé',
        ], 200);
    }
}
