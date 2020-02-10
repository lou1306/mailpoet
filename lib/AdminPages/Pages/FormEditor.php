<?php

namespace MailPoet\AdminPages\Pages;

use MailPoet\AdminPages\PageRenderer;
use MailPoet\API\JSON\ResponseBuilders\CustomFieldsResponseBuilder;
use MailPoet\CustomFields\CustomFieldsRepository;
use MailPoet\Form\Block;
use MailPoet\Form\FormFactory;
use MailPoet\Form\Renderer as FormRenderer;
use MailPoet\Form\Util\Export;
use MailPoet\Models\Form;
use MailPoet\Models\Segment;
use MailPoet\Settings\Pages;
use MailPoet\WP\Functions as WPFunctions;

class FormEditor {
  /** @var PageRenderer */
  private $pageRenderer;

  /** @var CustomFieldsRepository */
  private $customFieldsRepository;

  /** @var CustomFieldsResponseBuilder */
  private $customFieldsResponseBuilder;

  /** @var WPFunctions */
  private $wp;

  /**
   * @var FormFactory
   */
  private $formsFactory;

  public function __construct(
    PageRenderer $pageRenderer,
    CustomFieldsRepository $customFieldsRepository,
    WPFunctions $wp,
    FormFactory $formsFactory,
    CustomFieldsResponseBuilder $customFieldsResponseBuilder
  ) {
    $this->pageRenderer = $pageRenderer;
    $this->customFieldsRepository = $customFieldsRepository;
    $this->customFieldsResponseBuilder = $customFieldsResponseBuilder;
    $this->wp = $wp;
    $this->formsFactory = $formsFactory;
  }

  public function render() {
    $id = (isset($_GET['id']) ? (int)$_GET['id'] : 0);
    if (isset($_GET['action']) && $_GET['action'] === 'create') {
      $form = $this->formsFactory->createEmptyForm();

      $this->wp->wpSafeRedirect(
        $this->wp->getSiteUrl(null,
          '/wp-admin/admin.php?page=mailpoet-form-editor&id=' . $form->id()
        )
      );
      exit;
    }
    $form = Form::findOne($id);
    if ($form instanceof Form) {
      $form = $form->asArray();
    }
    $form['styles'] = FormRenderer::getStyles($form);
    $customFields = $this->customFieldsRepository->findAll();
    $dateTypes = Block\Date::getDateTypes();
    $data = [
      'form' => $form,
      'form_exports' => [
          'php'       => Export::get('php', $form),
          'iframe'    => Export::get('iframe', $form),
          'shortcode' => Export::get('shortcode', $form),
      ],
      'pages' => Pages::getAll(),
      'segments' => Segment::getSegmentsWithSubscriberCount(),
      'styles' => FormRenderer::getStyles($form),
      'date_types' => array_map(function ($label, $value) {
        return [
          'label' => $label,
          'value' => $value,
        ];
      }, $dateTypes, array_keys($dateTypes)),
      'date_formats' => Block\Date::getDateFormats(),
      'month_names' => Block\Date::getMonthNames(),
      'sub_menu' => 'mailpoet-forms',
      'custom_fields' => $this->customFieldsResponseBuilder->buildBatch($customFields),
    ];

    $this->pageRenderer->displayPage('form/editor.html', $data);
  }
}
