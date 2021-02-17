<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity(fields="email", message="Email is already taken.")
 * @ORM\HasLifecycleCallbacks()
 */
class User implements UserInterface
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
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, unique=true, nullable=true)
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $slug;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $avatar;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $birthday;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $lastConnection;

    /**
     * @ORM\Column(type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"wishlist_browse", "wishlist_read", "user_browse", "user_read", "gift_browse", "gift_read"})
     */
    private $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity=Wishlist::class, mappedBy="creator", orphanRemoval=true)
     */
    private $createdWishlists;

    /**
     * @ORM\ManyToMany(targetEntity=Wishlist::class, inversedBy="followers")
     */
    private $followedWishlists;

    /**
     * @ORM\OneToMany(targetEntity=Gift::class, mappedBy="creator")
     */
    private $createdGifts;

    /**
     * @ORM\OneToMany(targetEntity=Gift::class, mappedBy="buyer")
     */
    private $boughtGifts;

    public function __construct()
    {
        $this->createdWishlists = new ArrayCollection();
        $this->followedWishlists = new ArrayCollection();
        $this->createdGifts = new ArrayCollection();
        $this->boughtGifts = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->lastConnection = new \DateTime();
        // $this->avatar = 'default-user.png';
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = ucfirst($firstname);

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = ucfirst($lastname);

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

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

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        if (is_null($roles)) {
            $roles = [];
        }
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER'
        ;

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(\DateTimeInterface $birthday): self
    {
        $this->birthday = $birthday;

        return $this;
    }

    public function getLastConnection(): ?\DateTimeInterface
    {
        return $this->lastConnection;
    }

    public function setLastConnection(\DateTimeInterface $lastConnection): self
    {
        $this->lastConnection = $lastConnection;

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

    /**
     * @return Collection|Wishlist[]
     */
    public function getCreatedWishlists(): Collection
    {
        return $this->createdWishlists;
    }

    public function addCreatedWishlist(Wishlist $createdWishlist): self
    {
        if (!$this->createdWishlists->contains($createdWishlist)) {
            $this->createdWishlists[] = $createdWishlist;
            $createdWishlist->setCreator($this);
        }

        return $this;
    }

    public function removeCreatedWishlist(Wishlist $createdWishlist): self
    {
        if ($this->createdWishlists->removeElement($createdWishlist)) {
            // set the owning side to null (unless already changed)
            if ($createdWishlist->getCreator() === $this) {
                $createdWishlist->setCreator(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Wishlist[]
     */
    public function getFollowedWishlists(): Collection
    {
        return $this->followedWishlists;
    }

    public function addFollowedWishlist(Wishlist $followedWishlist): self
    {
        if (!$this->followedWishlists->contains($followedWishlist)) {
            $this->followedWishlists[] = $followedWishlist;
        }

        return $this;
    }

    public function removeFollowedWishlist(Wishlist $followedWishlist): self
    {
        $this->followedWishlists->removeElement($followedWishlist);

        return $this;
    }

    /**
     * @return Collection|Gift[]
     */
    public function getCreatedGifts(): Collection
    {
        return $this->createdGifts;
    }

    public function addCreatedGift(Gift $createdGift): self
    {
        if (!$this->createdGifts->contains($createdGift)) {
            $this->createdGifts[] = $createdGift;
            $createdGift->setCreator($this);
        }

        return $this;
    }

    public function removeCreatedGift(Gift $createdGift): self
    {
        if ($this->createdGifts->removeElement($createdGift)) {
            // set the owning side to null (unless already changed)
            if ($createdGift->getCreator() === $this) {
                $createdGift->setCreator(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Gift[]
     */
    public function getBoughtGifts(): Collection
    {
        return $this->boughtGifts;
    }

    public function addBoughtGift(Gift $boughtGift): self
    {
        if (!$this->boughtGifts->contains($boughtGift)) {
            $this->boughtGifts[] = $boughtGift;
            $boughtGift->setBuyer($this);
        }

        return $this;
    }

    public function removeBoughtGift(Gift $boughtGift): self
    {
        if ($this->boughtGifts->removeElement($boughtGift)) {
            // set the owning side to null (unless already changed)
            if ($boughtGift->getBuyer() === $this) {
                $boughtGift->setBuyer(null);
            }
        }

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @ORM\PreUpdate
     */
    public function onPreUpdate()
    {
        $this->setUpdatedAt(new \DateTime());
    }
}
