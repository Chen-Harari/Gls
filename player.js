const guideUrl = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867";
const cssUrl = "https://guidedlearning.oracle.com/player/latest/static/css/stTip.css";
const jqueryUrl= "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
const createdStepsArray = [];

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
        createSteps(steps, responseObj.data.tiplates);
        drawStep(steps[0].id,steps[0].id);

    }
}

function createSteps(steps, tiplates){
    for(const stepIndex in steps){
        const step = steps[stepIndex];
        const stepsLength = steps.length;
        if(step.action.type ==="tip"){
            createStep(stepsLength, stepIndex,step, tiplates.tip);
        }else if(step.action.type==="hoverTip"){
            createStep(stepIndex, tiplates.hoverTip);
        }else if(step.action.type==="closeScenario"){
            createdStepsArray.push({id:step.id,sttipDiv:null});
        }
    }


}

function createStep(stepsLength, stepIndex, step, tiplate){

    const [popOverDiv,sttipDiv] = createTiplateWrapper(step);
    const contents = step.action.contents;
    const tipContent = contents["#content"];
    const tipContentElement = $(tipContent);
    const tiplateElement = $(tiplate).attr("id",`${step.id}`);

    popOverDiv.append(tiplateElement);

    const buttons = $(`#${step.id}>.popover-title`).find(`button`);
    const closeButton = buttons[1];
    $(closeButton).click((e)=>closeStep(`${step.id}`,e));

    const spans = $(`#${step.id}>.stFooter`).find(`span`).css("color","white");
    //next two spans are responsible for "Steps stepIndex/stepsLength"
    $(spans[1]).text(+(stepIndex)+1);
    $(spans[2]).text(stepsLength-1);
    //"powered by" span
    $(spans[3]).text( $(spans[3]).text()+" Oracle");

    const nextLink = $(`#${step.id}>div>div[data-iridize-role="nextBtPane"]>.next-btn`)
    $(nextLink).attr("onClick",`drawStep("${step.id}","${step.followers[0].next}")`);
    $(nextLink).css("color","white");

    $(`#${step.id}>.popover-content>div`).append(tipContentElement);

    createdStepsArray.push({id:step.id,sttipDiv:sttipDiv});


}

function createTiplateWrapper(step){
    const sttipDiv = $("<div></div>");
    const tooltipInDiv = $("<div></div>");
    const tooltipArrowDiv = $("<div></div>");
    const secArrowDiv = $("<div></div>");
    const popOverDiv = $("<div></div>");
    const targetSelectorName = step.action.selector;
    const targetOnDom = $( targetSelectorName).length>0 ?
                        $( targetSelectorName) : $(defaultTargetOnDom(targetSelectorName)) ;
    console.log("T", targetOnDom);



    sttipDiv.addClass("sttip");
    tooltipInDiv.addClass("tooltip in");
    tooltipArrowDiv.addClass("tooltip-arrow");
    secArrowDiv.addClass("tooltip-arrow second-arrow");
    popOverDiv.addClass("popover-inner");

    sttipDiv.css("display","none");
    sttipDiv.css("position","relative");
    sttipDiv.css("top","15px");
    sttipDiv.css("right","200px")
    targetOnDom.after(sttipDiv);//.css("position", "absolute")
    sttipDiv.append(tooltipInDiv);
    tooltipInDiv.append(tooltipArrowDiv);
    tooltipArrowDiv.append(secArrowDiv);
    secArrowDiv.append(popOverDiv);

    return [popOverDiv,sttipDiv];

}

function drawStep(prevStepId,stepId){
    const prevStepObj =  createdStepsArray.find(stepObj => stepObj.id === prevStepId);
    prevStepObj.sttipDiv.css("display","none");
    const stepObj =  createdStepsArray.find(stepObj => stepObj.id === stepId);
    if(stepObj.sttipDiv!==null){
        stepObj.sttipDiv.css("display","inline-block");
    }
}

function closeStep(stepId,e){
    const stepObj =  createdStepsArray.find(stepObj => stepObj.id === stepId);
    stepObj.sttipDiv.css("display","none");
    if(e!==null){
        e.preventDefault();
    }

}

function defaultTargetOnDom(selectorName){
    if(selectorName==="#hplogo"){
        return ".lnXdpd";
    }
}

run();