<?php

namespace App\Form;

use App\Entity\Wishlist;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Component\Validator\Constraints\NotBlank;

class WishlistType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', null, [
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            // ->add('slug')
            ->add('eventDate', null, [
                'widget' => 'single_text',
                'format' => 'yyyy-MM-dd',
                'html5' => false,
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            // ->add('active')
            ->add('description')
            // ->add('createdAt')
            // ->add('updatedAt')
            // ->add('creator', null, [
            //     'constraints' => [
            //         new NotBlank(),
            //     ],
            // ])
            // ->add('followers')
            ->addEventListener(FormEvents::PRE_SUBMIT, function (FormEvent $event) {
                $wishlistArray = $event->getData(); // on récupère les datas

                $form = $event->getForm(); // on récupère le form
                $fields = $form->all();

                if ($form->getConfig()->getMethod() == 'PATCH') {
                    foreach ($fields as $fieldName => $fieldConfig) {
                        if (!array_key_exists($fieldName, $wishlistArray)) {
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
            'data_class' => Wishlist::class,
        ]);
    }
}
