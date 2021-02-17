<?php

namespace App\Entity;

use App\Repository\GiftRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=GiftRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Gift
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"gift_browse", "gift_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"gift_browse", "gift_read"})
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"gift_browse", "gift_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, unique=true, nullable=true)
     * @Groups({"gift_browse", "gift_read"})
     */
    private $slug;

    /**
     * @ORM\Column(type="smallint", options={"default": 0})
     * @Groups({"gift_browse", "gift_read"})
     */
    private $status;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"gift_browse", "gift_read"})
     */
    private $details;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"gift_browse", "gift_read"})
     */
    private $link;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"gift_browse", "gift_read"})
     */
    private $picture;

    /**
     * @ORM\Column(type="boolean", options={"default": false})
     * @Groups({"gift_browse", "gift_read"})
     */
    private $isHighlighted;

    /**
     * @ORM\Column(type="boolean", options={"default": false})
     * @Groups({"gift_browse", "gift_read"})
     */
    private $isArchived;

    /**
     * @ORM\Column(type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     * @Groups({"gift_browse", "gift_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"gift_browse", "gift_read"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="createdGifts")
     * @ORM\JoinColumn(nullable=true, onDelete="SET NULL")
     * @Groups({"gift_browse", "gift_read"})
     */
    private $creator;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="boughtGifts")
     * @ORM\JoinColumn(nullable=true, onDelete="SET NULL")
     * @Groups({"gift_browse", "gift_read"})
     */
    private $buyer;

    /**
     * @ORM\ManyToOne(targetEntity=Wishlist::class, inversedBy="gifts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"gift_browse", "gift_read"})
     */
    private $wishlist;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->status = 0;
        $this->isHighlighted = false;
        $this->isArchived = false;
        $this->picture = 'default-gift.jpeg';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?int
    {
        return $this->type;
    }

    public function setType(int $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getDetails(): ?string
    {
        return $this->details;
    }

    public function setDetails(?string $details): self
    {
        $this->details = $details;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): self
    {
        $this->link = $link;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getIsHighlighted(): ?bool
    {
        return $this->isHighlighted;
    }

    public function setIsHighlighted(bool $isHighlighted): self
    {
        $this->isHighlighted = $isHighlighted;

        return $this;
    }

    public function getIsArchived(): ?bool
    {
        return $this->isArchived;
    }

    public function setIsArchived(bool $isArchived): self
    {
        $this->isArchived = $isArchived;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    public function getBuyer(): ?User
    {
        return $this->buyer;
    }

    public function setBuyer(?User $buyer): self
    {
        $this->buyer = $buyer;

        return $this;
    }

    public function getWishlist(): ?Wishlist
    {
        return $this->wishlist;
    }

    public function setWishlist(?Wishlist $wishlist): self
    {
        $this->wishlist = $wishlist;

        return $this;
    }

    /**
     * @ORM\PreUpdate
     */
    public function onPreUpdate()
    {
        $this->setUpdatedAt(new \DateTime());
    }
}
