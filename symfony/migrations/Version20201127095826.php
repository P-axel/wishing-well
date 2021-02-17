<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201127095826 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_wishlist (user_id INT NOT NULL, wishlist_id INT NOT NULL, INDEX IDX_7C6CCE31A76ED395 (user_id), INDEX IDX_7C6CCE31FB8E54CD (wishlist_id), PRIMARY KEY(user_id, wishlist_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_wishlist ADD CONSTRAINT FK_7C6CCE31A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_wishlist ADD CONSTRAINT FK_7C6CCE31FB8E54CD FOREIGN KEY (wishlist_id) REFERENCES wishlist (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE gift ADD creator_id INT NOT NULL, ADD buyer_id INT DEFAULT NULL, ADD wishlist_id INT NOT NULL');
        $this->addSql('ALTER TABLE gift ADD CONSTRAINT FK_A47C990D61220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE gift ADD CONSTRAINT FK_A47C990D6C755722 FOREIGN KEY (buyer_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE gift ADD CONSTRAINT FK_A47C990DFB8E54CD FOREIGN KEY (wishlist_id) REFERENCES wishlist (id)');
        $this->addSql('CREATE INDEX IDX_A47C990D61220EA6 ON gift (creator_id)');
        $this->addSql('CREATE INDEX IDX_A47C990D6C755722 ON gift (buyer_id)');
        $this->addSql('CREATE INDEX IDX_A47C990DFB8E54CD ON gift (wishlist_id)');
        $this->addSql('ALTER TABLE wishlist ADD creator_id INT NOT NULL');
        $this->addSql('ALTER TABLE wishlist ADD CONSTRAINT FK_9CE12A3161220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_9CE12A3161220EA6 ON wishlist (creator_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user_wishlist');
        $this->addSql('ALTER TABLE gift DROP FOREIGN KEY FK_A47C990D61220EA6');
        $this->addSql('ALTER TABLE gift DROP FOREIGN KEY FK_A47C990D6C755722');
        $this->addSql('ALTER TABLE gift DROP FOREIGN KEY FK_A47C990DFB8E54CD');
        $this->addSql('DROP INDEX IDX_A47C990D61220EA6 ON gift');
        $this->addSql('DROP INDEX IDX_A47C990D6C755722 ON gift');
        $this->addSql('DROP INDEX IDX_A47C990DFB8E54CD ON gift');
        $this->addSql('ALTER TABLE gift DROP creator_id, DROP buyer_id, DROP wishlist_id');
        $this->addSql('ALTER TABLE wishlist DROP FOREIGN KEY FK_9CE12A3161220EA6');
        $this->addSql('DROP INDEX IDX_9CE12A3161220EA6 ON wishlist');
        $this->addSql('ALTER TABLE wishlist DROP creator_id');
    }
}
