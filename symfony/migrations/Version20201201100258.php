<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201201100258 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gift DROP FOREIGN KEY FK_A47C990D61220EA6');
        $this->addSql('ALTER TABLE gift ADD CONSTRAINT FK_A47C990D61220EA6 FOREIGN KEY (creator_id) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gift DROP FOREIGN KEY FK_A47C990D61220EA6');
        $this->addSql('ALTER TABLE gift ADD CONSTRAINT FK_A47C990D61220EA6 FOREIGN KEY (creator_id) REFERENCES user (id)');
    }
}
