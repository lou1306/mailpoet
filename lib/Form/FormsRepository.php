<?php

namespace MailPoet\Form;

use MailPoet\Doctrine\Repository;
use MailPoet\Entities\FormEntity;

/**
 * @method FormEntity[] findBy(array $criteria, array $orderBy = null, int $limit = null, int $offset = null)
 * @method FormEntity[] findAll()
 * @method FormEntity|null findOneBy(array $criteria, array $orderBy = null)
 * @method FormEntity|null findOneById(mixed $id)
 * @method void persist(FormEntity $entity)
 * @method void remove(FormEntity $entity)
 */
class FormsRepository extends Repository {
  protected function getEntityClassName() {
    return FormEntity::class;
  }

}
