import React from 'react';
import {
  Panel,
  PanelBody, SelectControl,
  TextControl,
  ToggleControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import PropTypes from 'prop-types';
import MailPoet from 'mailpoet';
import { useDispatch, useSelect } from '@wordpress/data';

import CustomFieldSettings from '../custom_text/custom_field_settings.jsx';
import formatLabel from '../label_formatter.jsx';
import mapCustomFieldFormData from '../map_custom_field_form_data.jsx';

const CustomTextAreaEdit = ({ attributes, setAttributes, clientId }) => {
  const isSaving = useSelect(
    (sel) => sel('mailpoet-form-editor').getIsCustomFieldSaving(),
    []
  );
  const isDeleting = useSelect(
    (sel) => sel('mailpoet-form-editor').getIsCustomFieldDeleting(),
    []
  );
  const {
    saveCustomField,
    deleteCustomField,
    customFieldEdited,
  } = useDispatch('mailpoet-form-editor');
  const inspectorControls = (
    <InspectorControls>
      <Panel>
        <PanelBody title={MailPoet.I18n.t('customFieldSettings')} initialOpen>
          <CustomFieldSettings
            mandatory={attributes.mandatory}
            validate={attributes.validate}
            isSaving={isSaving}
            onSave={(params) => saveCustomField({
              customFieldId: attributes.customFieldId,
              data: {
                params: mapCustomFieldFormData('textarea', params),
              },
              onFinish: () => setAttributes({
                mandatory: params.mandatory,
                validate: params.validate,
                lines: params.lines,
              }),
            })}
            onCustomFieldDelete={() => deleteCustomField(
              attributes.customFieldId,
              clientId
            )}
            isDeleting={isDeleting}
            onChange={(data, hasUnsavedChanges) => hasUnsavedChanges && customFieldEdited()}
          />
        </PanelBody>
      </Panel>
      <Panel>
        <PanelBody title={MailPoet.I18n.t('formSettings')} initialOpen>
          <TextControl
            label={MailPoet.I18n.t('label')}
            value={attributes.label}
            data-automation-id="settings_custom_text_label_input"
            onChange={(label) => (setAttributes({ label }))}
          />
          <ToggleControl
            label={MailPoet.I18n.t('displayLabelWithinInput')}
            checked={attributes.labelWithinInput}
            onChange={(labelWithinInput) => (setAttributes({ labelWithinInput }))}
          />
          <SelectControl
            label={`${MailPoet.I18n.t('customFieldNumberOfLines')}:`}
            value={attributes.lines}
            options={[
              {
                label: MailPoet.I18n.t('customField1Line'),
                value: '1',
              },
              {
                label: MailPoet.I18n.t('customField2Lines'),
                value: '2',
              },
              {
                label: MailPoet.I18n.t('customField3Lines'),
                value: '3',
              },
              {
                label: MailPoet.I18n.t('customField4Lines'),
                value: '4',
              },
              {
                label: MailPoet.I18n.t('customField5Lines'),
                value: '5',
              },
            ]}
            onChange={(lines) => (setAttributes({ lines }))}
          />
        </PanelBody>
      </Panel>
    </InspectorControls>
  );

  const getTextArea = (placeholder) => (
    <textarea
      id="custom_text"
      className="mailpoet_text"
      name="custom_text"
      disabled
      data-automation-id="editor_custom_text_input"
      value={placeholder}
      rows={attributes.lines}
    />
  );

  return (
    <>
      {inspectorControls}
      {attributes.labelWithinInput ? (getTextArea(formatLabel(attributes))
      ) : (
        <>
          <label className="mailpoet_textarea_label" data-automation-id="editor_custom_text_label" htmlFor="custom_text">
            {formatLabel(attributes)}
          </label>
          {getTextArea('')}
        </>
      )}
    </>
  );
};

CustomTextAreaEdit.propTypes = {
  attributes: PropTypes.shape({
    label: PropTypes.string.isRequired,
    customFieldId: PropTypes.number.isRequired,
    validate: PropTypes.string,
    labelWithinInput: PropTypes.bool.isRequired,
    mandatory: PropTypes.bool.isRequired,
    lines: PropTypes.string,
  }).isRequired,
  setAttributes: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
};

export default CustomTextAreaEdit;
