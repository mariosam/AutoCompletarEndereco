<?php
class MarioSAM_AutoCompletar_AjaxController extends Mage_Core_Controller_Front_Action {
    public function enderecoAction() {
        echo @file_get_contents('http://cep.republicavirtual.com.br/web_cep.php?cep='.urlencode($this->getRequest()->getParam('cep', false)).'&formato=json');
    }
}
