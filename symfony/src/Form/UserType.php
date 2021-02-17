<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type as Type;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Valid;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstname', null, [
                'constraints' => [
                    new Valid\NotBlank(),
                ],
            ])
            ->add('lastname', null, [
                'constraints' => [
                    new Valid\NotBlank(),
                ],
            ])
            ->add('email', Type\EmailType::class, [
                'constraints' => [
                    new Valid\Email(),
                ],
            ])
            // ->add('slug')
            ->add('password', Type\PasswordType::class, [
                'mapped' => false,
            ])
            ->add('avatar')
            ->add('birthday', null, [
                'widget' => 'single_text',
                'format' => 'yyyy-mm-dd',
                'html5' => false,
                'constraints' => [
                    new Valid\NotBlank(),
                ],
            ])
            // ->add('lastConnection')
            // ->add('createdAt')
            // ->add('updatedAt')
            // ->add('followedWishlists')
            ->addEventListener(FormEvents::PRE_SUBMIT, function (FormEvent $event) {
                $userArray = $event->getData(); // on récupère les datas
                $form = $event->getForm(); // on récupère le form
                
                $fields = $form->all();
                if ($form->getConfig()->getMethod() == 'PATCH') {
                    foreach ($fields as $fieldName => $fieldConfig) {
                        if (!array_key_exists($fieldName, $userArray)) {
                            $form->remove($fieldName);
                        }
                    }
                }
            })
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
