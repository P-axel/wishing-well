<?php

namespace App\Entity;

use App\Repository\WishlistRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=WishlistRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Wishlist
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, unique=true, nullable=true)
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $slug;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $eventDate;

    /**
     * @ORM\Column(type="boolean", options={"default": true})
     * @Groups({"wishlist_browse", "wishlist_read", "gift_browse", "gift_read"})
     */
    private $active;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"wishlist_browse", "wishlist_read", "gift_browse", "gift_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     * @Groups({"wishlist_browse", "wishlist_read", "gift_browse", "gift_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"wishlist_browse", "wishlist_read", "gift_browse", "gift_read"})
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="createdWishlists")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"wishlist_browse", "wishlist_read", "gift_read"})
     */
    private $creator;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="followedWishlists")
     * @Groups({"wishlist_browse", "wishlist_read"})
     */
    private $followers;

    /**
     * @ORM\OneToMany(targetEntity=Gift::class, mappedBy="wishlist", orphanRemoval=true)
     */
    private $gifts;

    public function __construct()
    {
        $this->followers = new ArrayCollection();
        $this->gifts = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->active = true;
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getEventDate(): ?\DateTimeInterface
    {
        return $this->eventDate;
    }

    public function setEventDate(\DateTimeInterface $eventDate): self
    {
        $this->eventDate = $eventDate;

        return $this;
    }

    public function getActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

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

    /**
     * @return Collection|User[]
     */
    public function getFollowers(): Collection
    {
        return $this->followers;
    }

    public function addFollower(User $follower): self
    {
        if (!$this->followers->contains($follower)) {
            $this->followers[] = $follower;
            $follower->addFollowedWishlist($this);
        }

        return $this;
    }

    public function removeFollower(User $follower): self
    {
        if ($this->followers->removeElement($follower)) {
            $follower->removeFollowedWishlist($this);
        }

        return $this;
    }

    /**
     * @return Collection|Gift[]
     */
    public function getGifts(): Collection
    {
        return $this->gifts;
    }

    public function addGift(Gift $gift): self
    {
        if (!$this->gifts->contains($gift)) {
            $this->gifts[] = $gift;
            $gift->setWishlist($this);
        }

        return $this;
    }

    public function removeGift(Gift $gift): self
    {
        if ($this->gifts->removeElement($gift)) {
            // set the owning side to null (unless already changed)
            if ($gift->getWishlist() === $this) {
                $gift->setWishlist(null);
            }
        }

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
