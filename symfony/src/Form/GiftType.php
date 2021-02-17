<?php

namespace App\Form;

use App\Entity\Gift;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type as Type;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Valid;

class GiftType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('type', null, [
                'constraints' => [
                    new Valid\NotBlank(),
                    new Valid\Range([
                        'min' => 1,
                        'max' => 2,
                    ])
                ],
            ])
            ->add('name', null, [
                'constraints' => [
                    new Valid\NotBlank(),
                ],
            ])
            // ->add('slug')
            ->add('status', null, [
                'constraints' => [
                    new Valid\NotBlank(),
                    new Valid\Range([
                        'min' => 0,
                        'max' => 1,
                    ])
                ],
            ])
            ->add('details')
            ->add('link', Type\UrlType::class, [
                'constraints' => [
                    new Valid\Url(),
                ],
            ])
            ->add('picture') # A voir comment on gère ça en fonction de ce que nous envoient le front
            ->add('isHighlighted', Type\IntegerType::class, [
                'constraints' => [
                    new Valid\NotBlank(),
                    new Valid\Range([
                        'min' => 0,
                        'max' => 1,
                    ])
                ],
                'mapped' => false,
            ])
            // ->add('isArchived')
            // ->add('createdAt')
            // ->add('updatedAt')
            // ->add('creator', null, [
            //     'constraints' => [
            //         new Valid\NotBlank(),
            //     ],
            // ])
            // ->add('buyer')
            ->add('wishlist', null, [
                'constraints' => [
                    new Valid\NotBlank(),
                ],
            ])
            ->addEventListener(FormEvents::PRE_SUBMIT, function (FormEvent $event) {
                $giftArray = $event->getData(); // on récupère les datas
                
                $form = $event->getForm(); // on récupère le form
                
                $fields = $form->all();

                if ($form->getConfig()->getMethod() == 'PATCH') {
                    foreach ($fields as $fieldName => $fieldConfig) {
                        if (!array_key_exists($fieldName, $giftArray)) {
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
            'data_class' => Gift::class,
        ]);
    }
}
