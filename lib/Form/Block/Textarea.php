<?php

namespace MailPoet\Form\Block;

class Textarea extends Base {
  public static function render($block) {
    $html = '';

    $html .= '<p class="mailpoet_paragraph">';

    $html .= static::renderLabel($block);

    $lines = (isset($block['params']['lines']) ? (int)$block['params']['lines'] : 1);

    $html .= '<textarea class="mailpoet_textarea" rows="' . $lines . '" ';

    $html .= 'name="data[' . static::getFieldName($block) . ']"';

    $html .= static::renderInputPlaceholder($block);

    $html .= static::getInputValidation($block);

    $html .= static::getInputModifiers($block);

    $html .= '>' . static::getFieldValue($block) . '</textarea>';

    $html .= '</p>';

    return $html;
  }
}
