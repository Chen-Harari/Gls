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

function run(){
    addScripts();
}

function __5szm2kaj(responseObj) {
    if(responseObj.error === 1){
        console.log("coouldn't load guide");
    }else if(responseObj.success === 1){
        console.log(responseObj.data);
        const steps = responseObj.data.structure.steps;
        createSteps(steps);
    }
}

function createSteps(steps){

    for(const stepIndex in steps){
        const step = steps[stepIndex];
        if(step.action.type ==="tip"){
            createStep(step);
        }

    }

}

function createStep(step){

    const popOverDiv = createTiplateWrapper();
    const contents = step.action.contents;
    const tipContent = contents["#content"];
    const tipContentElement = $(tipContent);

    popOverDiv.append(tipContentElement);

    $("body").append("<br>");
    $("body").append("<br>");
    $("body").append("<br>");
    $("body").append("<br>");
    $("body").append("<br>");
    $("body").append("<br>");
    $("body").append("<br>");

}

function createTiplateWrapper(){
    const sttipDiv = $("<div></div>");
    const tooltipInDiv = $("<div></div>");
    const tooltipArrowDiv = $("<div></div>");
    const secArrowDiv = $("<div></div>");
    const popOverDiv = $("<div></div>");

    $("body").append(sttipDiv);
    sttipDiv.addClass("sttip");
    tooltipInDiv.addClass("tooltip in");
    tooltipArrowDiv.addClass("tooltip-arrow");
    secArrowDiv.addClass("tooltip-arrow second-arrow");
    popOverDiv.addClass("popover-inner");

    sttipDiv.append(tooltipInDiv);
    tooltipInDiv.append(tooltipArrowDiv);
    tooltipArrowDiv.append(secArrowDiv);
    secArrowDiv.append(popOverDiv);

    return popOverDiv;

}

run();