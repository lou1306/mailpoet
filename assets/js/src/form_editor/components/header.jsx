import React from 'react';
import { Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import MailPoet from 'mailpoet';

export default () => {
  const sidebarOpened = useSelect(
    (select) => select('mailpoet-form-editor').getSidebarOpened(),
    []
  );
  const isFormSaving = useSelect(
    (select) => select('mailpoet-form-editor').getIsFormSaving(),
    []
  );
  const isPreview = useSelect(
    (select) => select('mailpoet-form-editor').getIsPreviewShown(),
    []
  );
  const { toggleSidebar, saveForm, showPreview } = useDispatch('mailpoet-form-editor');

  return (
    <div className="edit-post-header">
      <div className="edit-post-header-toolbar" />
      <div className="edit-post-header__settings">
        <Button
          isSecondary
          isLarge
          onClick={showPreview}
          isPressed={isPreview}
        >
          {__('Preview')}
        </Button>
        <Button
          isPrimary
          isLarge
          className="editor-post-publish-button"
          data-automation-id="form_save_button"
          isBusy={isFormSaving}
          onClick={saveForm}
        >
          {isFormSaving ? `${__('Saving')}` : __('Save')}
        </Button>
        <Button
          icon="admin-generic"
          label={MailPoet.I18n.t('formSettings')}
          tooltipPosition="down"
          onClick={() => toggleSidebar(!sidebarOpened)}
          isPressed={sidebarOpened}
        />
      </div>
    </div>
  );
};
