const guideUrl = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";
const cssUrl = "https://guidedlearning.oracle.com/player/latest/static/css/stTip.css";
const jqueryUrl= "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";

function addScripts(){
    addJqueryScript();
}

function addJqueryScript(){
    let jqueryScript = document.createElement('script');
    jqueryScript.onload = addGuideUrlScriptAndCssLink;
    document.getElementsByTagName('head')[0].appendChild( jqueryScript);
    jqueryScript.src = jqueryUrl;

}

function addGuideUrlScriptAndCssLink(){
    let guideUrlScript =$(`<script src=${guideUrl}></script>`);
    $("head").append(guideUrlScript);
    $("head").append(`<link rel="stylesheet" href=${cssUrl}>`);
}

function __5szm2kaj(responseObj) {
    console.log(responseObj);
}

addScripts();